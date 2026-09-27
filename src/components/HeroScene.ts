import * as THREE from 'three';
type Frame={x:number;y:number;progress:number;focus:number;time:number;reduced:boolean};
// Depth-aware camera and atmospheric light over the photographed environment.
export async function createHeroScene(host:HTMLElement){
 let renderer:THREE.WebGLRenderer;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});}catch{return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0,0);
 let texture:THREE.Texture;try{texture=await new THREE.TextureLoader().loadAsync('/media/hero-reference-v4.webp');}catch{renderer.dispose();return;}
 texture.colorSpace=THREE.NoColorSpace;texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.LinearFilter;
 const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
 const uniforms={image:{value:texture},resolution:{value:new THREE.Vector2()},pointer:{value:new THREE.Vector2()},time:{value:0},progress:{value:0},focus:{value:0},mobile:{value:0},reduced:{value:0}};
 const material=new THREE.ShaderMaterial({uniforms,depthTest:false,depthWrite:false,
 vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
 fragmentShader:`
 precision highp float;varying vec2 vUv;uniform sampler2D image;uniform vec2 resolution,pointer;uniform float time,progress,focus,mobile,reduced;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
 float haze(vec2 p){return noise(p)*.57+noise(p*2.1)*.28+noise(p*4.3)*.035;}
 void main(){
  float aspect=resolution.x/resolution.y,imageAspect=1672./941.;
  vec2 fit=vec2(min(1.,aspect/imageAspect),min(1.,imageAspect/aspect));
  vec2 center=vec2(mix(.5,.63,mobile),.5);
  vec2 uv=(vUv-.5)*fit+.5+(center-.5)*(1.-fit);
  vec2 vanishing=vec2(.666,.46);
  float intro=(1.-smoothstep(0.,4.,time))*(1.-reduced);
  float zoom=1.005+progress*.10;
  uv=vanishing+(uv-vanishing)/zoom;
  float foreground=smoothstep(.45,.98,length((uv-vanishing)*vec2(1.3,1.)));
  uv+=vec2(pointer.x,-pointer.y)*(.002+foreground*.004)*(1.-reduced);
  vec3 color=texture2D(image,clamp(uv,.001,.999)).rgb;
  vec2 lightPosition=vec2(.67+pointer.x*.12,.53-pointer.y*.1);
  float pool=exp(-length((uv-lightPosition)*vec2(1.2,1.))*8.);
  color*=1.+pool*.04;
  float floorBand=exp(-pow((uv.y-.315)*16.,2.));
  float mist=haze(uv*vec2(5.,11.)+vec2(time*.019,-time*.007));
  color+=vec3(.72,.69,.56)*floorBand*max(0.,mist-.35)*.038;
  float lamp=exp(-length((uv-vec2(.941,.878))*vec2(1.,1.6))*52.);
  color+=vec3(.22,.025,.012)*lamp*(.88+.12*sin(time*.65));
  vec2 moteUv=uv*vec2(43.,24.)+vec2(time*.012,time*.021),cell=floor(moteUv),local=fract(moteUv);
  vec2 mote=vec2(hash(cell),hash(cell+vec2(4.,7.)));
  float dust=(1.-smoothstep(.006,.035,length(local-mote)))*step(.86,hash(cell+3.));
  color+=vec3(.68,.63,.45)*dust*.12*pool;
  color*=1.-smoothstep(.3,.9,length((vUv-.5)*vec2(.9,1.)))*.035;
  color=mix(color,color*vec3(.85,.95,.88),focus*.18);
  gl_FragColor=vec4(color,1.);
 }`});
 const geometry=new THREE.PlaneGeometry(2,2);scene.add(new THREE.Mesh(geometry,material));host.appendChild(renderer.domElement);
 let lost=false;
 const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);uniforms.resolution.value.set(w,h);uniforms.mobile.value=innerWidth<768?1:0;};resize();
 const onLost=(e:Event)=>{e.preventDefault();lost=true;delete host.parentElement!.dataset.webgl;};
 const onRestored=()=>{lost=false;host.parentElement!.dataset.webgl='ready';resize();};
 renderer.domElement.addEventListener('webglcontextlost',onLost);renderer.domElement.addEventListener('webglcontextrestored',onRestored);
 return {resize,render({x,y,progress,focus,time,reduced}:Frame){if(lost)return;uniforms.pointer.value.set(x,y);uniforms.progress.value=progress;uniforms.focus.value=focus;uniforms.time.value=time;uniforms.reduced.value=reduced?1:0;renderer.render(scene,camera);host.dataset.sceneState=[x,y,progress,focus].map(n=>n.toFixed(2)).join(',');host.dataset.motion=reduced?'reduced':'active';},dispose(){renderer.domElement.removeEventListener('webglcontextlost',onLost);renderer.domElement.removeEventListener('webglcontextrestored',onRestored);texture.dispose();geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();}};
}

