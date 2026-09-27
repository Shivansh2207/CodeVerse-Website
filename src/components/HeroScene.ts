import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';

type Frame = {x:number;y:number;progress:number;breach:number;time:number;reduced:boolean};

export function createHeroScene(host: HTMLElement) {
  let renderer: THREE.WebGLRenderer;
  try {renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});} catch {return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  renderer.setClearColor(0,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
  host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(35,1,.1,60);camera.position.z=14;
  const pmrem=new THREE.PMREMGenerator(renderer), room=new RoomEnvironment();
  const env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();
  const chrome=new THREE.MeshStandardMaterial({color:0x8c8c83,metalness:.95,roughness:.26});
  const graphite=new THREE.MeshStandardMaterial({color:0x272724,metalness:.83,roughness:.42});
  const black=new THREE.MeshStandardMaterial({color:0x0c0d0d,metalness:.65,roughness:.3});
  const red=new THREE.MeshStandardMaterial({color:0xd32c13,metalness:.7,roughness:.26,emissive:0xb31b08,emissiveIntensity:.4});
  const light=new THREE.MeshBasicMaterial({color:0xff5932});
  const pale=new THREE.MeshBasicMaterial({color:0xc2bdaa});
  const rig=new THREE.Group();scene.add(rig);
  const rings=new THREE.Group();rig.add(rings);
  const torus=(r:number,tube:number,material:THREE.Material,z=0,arc=Math.PI*2) => {
    const mesh=new THREE.Mesh(new THREE.TorusGeometry(r,tube,8,128,arc),material);mesh.position.z=z;rings.add(mesh);return mesh;
  };
  const outer=torus(3.22,.035,chrome);
  const sectors:THREE.Group[]=[];
  for(let i=0;i<6;i++){
    const sector=new THREE.Group();sector.rotation.z=i*Math.PI/3;sectors.push(sector);rings.add(sector);
    for(const [radius,thickness,material,z] of [[3.12,.1,graphite,-.1],[2.96,.03,light,.03],[2.73,.045,chrome,.02]] as const){
      const arc=new THREE.Mesh(new THREE.TorusGeometry(radius,thickness,8,32,Math.PI/3-.065),material);arc.position.z=z;sector.add(arc);
    }
  }
  const orbitA=torus(3.48,.012,red,-.2,Math.PI*1.22);orbitA.rotation.z=.45;
  const orbitB=torus(3.61,.018,chrome,-.25,Math.PI*.6);orbitB.rotation.z=2.4;
  const orbitC=torus(2.56,.014,pale,.1,Math.PI*.7);orbitC.rotation.z=-1.6;
  const ticks=new THREE.Group();rings.add(ticks);
  const tickGeo=new THREE.BoxGeometry(.018,.095,.018);
  const minorTicks=new THREE.InstancedMesh(tickGeo,chrome,108);
  const majorTicks=new THREE.InstancedMesh(tickGeo,light,12);
  const tickTransform=new THREE.Object3D();let minorIndex=0,majorIndex=0;
  for(let i=0;i<120;i++){
    const a=i/120*Math.PI*2;
    tickTransform.position.set(Math.cos(a)*3.34,Math.sin(a)*3.34,0);tickTransform.rotation.z=a-Math.PI/2;
    tickTransform.scale.set(1,i%10===0?2:1,1);tickTransform.updateMatrix();
    if(i%10===0)majorTicks.setMatrixAt(majorIndex++,tickTransform.matrix);else minorTicks.setMatrixAt(minorIndex++,tickTransform.matrix);
  }
  ticks.add(minorTicks,majorTicks);
  const locks:THREE.Group[]=[];
  for(let i=0;i<8;i++){
    const a=i/8*Math.PI*2;const group=new THREE.Group();group.rotation.z=a;locks.push(group);rings.add(group);
    const housing=new THREE.Mesh(new THREE.BoxGeometry(.48,.25,.22),graphite);housing.position.set(2.93,0,.06);group.add(housing);
    const bolt=new THREE.Mesh(new THREE.BoxGeometry(.4,.13,.12),chrome);bolt.position.set(2.69,0,.18);group.add(bolt);
    const strip=new THREE.Mesh(new THREE.BoxGeometry(.11,.18,.025),red);strip.position.set(3.12,0,.2);group.add(strip);
    const screw=new THREE.Mesh(new THREE.CylinderGeometry(.042,.042,.035,8),black);screw.rotation.x=Math.PI/2;screw.position.set(2.94,0,.195);group.add(screw);
  }
  const shards=new THREE.Group();scene.add(shards);
  const fragments: {mesh:THREE.Mesh;angle:number;radius:number;z:number;speed:number}[]=[];
  for(let i=0;i<13;i++){
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(.06+(i%3)*.09,.13+(i%4)*.12,.035),i%3===0?red:chrome);
    const angle=i*2.39996, radius=3.6+(i%3)*.55,z=(i%5)*.3;
    shards.add(mesh);fragments.push({mesh,angle,radius,z,speed:.06+(i%4)*.025});
  }
  const particles=new THREE.BufferGeometry();const coordinates=new Float32Array(130*3);
  let seed=47;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
  for(let i=0;i<coordinates.length;i+=3){coordinates[i]=(rand()-.5)*20;coordinates[i+1]=(rand()-.5)*11;coordinates[i+2]=rand()*3-2;}
  particles.setAttribute('position',new THREE.BufferAttribute(coordinates,3));
  const particleMaterial=new THREE.PointsMaterial({color:0xa27e57,size:.015,transparent:true,opacity:.65,depthWrite:false});
  const dust=new THREE.Points(particles,particleMaterial);scene.add(dust);
  scene.add(new THREE.AmbientLight(0xddd7bd,.9));
  const key=new THREE.DirectionalLight(0xf8ebd1,3);key.position.set(-4,5,6);scene.add(key);
  const rim=new THREE.PointLight(0xff2d0b,60,18);rim.position.set(4,-1,3);scene.add(rim);
  const fill=new THREE.DirectionalLight(0x768793,1.5);fill.position.set(-3,-4,2);scene.add(fill);
  let width=0,height=0,mobile=false;
  const resize=()=>{width=host.clientWidth;height=host.clientHeight;mobile=window.innerWidth<768;renderer.setSize(width,height,false);camera.aspect=width/Math.max(1,height);camera.updateProjectionMatrix();};
  resize();
  function render({x,y,progress,breach,time,reduced}:Frame){
    const worldWidth=2*Math.tan(THREE.MathUtils.degToRad(35)/2)*14*camera.aspect;
    rig.position.set(worldWidth*(mobile?.027:.164)-progress*.5,mobile?-.15:.2,0);
    const scale=mobile?.59:Math.min(1,height/900+.14,width/1150);rig.scale.setScalar(scale*(1+progress*.1));
    rig.rotation.set(.12+y*.14,-.25+x*.18,-.16+progress*.18);
    rings.rotation.z=time*.023+breach*.42;
    outer.scale.setScalar(1+breach*.1);
    sectors.forEach((sector,i)=>{const a=(i+.5)*Math.PI/3;sector.position.set(Math.cos(a)*breach*.9,Math.sin(a)*breach*.9,breach*.2);sector.rotation.z=i*Math.PI/3+breach*.12;sector.rotation.y=breach*.12*Math.cos(a);});
    orbitA.rotation.z=.45+time*.09+breach*1.8;orbitB.rotation.z=2.4-time*.065-breach*1.6;orbitC.rotation.z=-1.6+time*.12;
    locks.forEach((lock,i)=>{const a=i/8*Math.PI*2;lock.position.set(Math.cos(a)*breach*.6,Math.sin(a)*breach*.6,breach*.16);});
    shards.position.copy(rig.position);shards.rotation.copy(rig.rotation);shards.scale.copy(rig.scale);
    fragments.forEach(({mesh,angle,radius,z,speed},i)=>{
      const a=angle+time*speed*.35,r=radius+breach*(1+(i%3)*.3);
      mesh.position.set(Math.cos(a)*r,Math.sin(a)*r,z+Math.sin(time*.4+i)*.25);
      mesh.rotation.set(time*speed+i,i*.4+time*speed*.6,a+time*.03+breach*.5);
    });
    dust.rotation.z=time*.003;dust.position.set(x*-.06,y*.04,progress*.2);particleMaterial.opacity=breach*.25+.5;
    rim.intensity=60+breach*45;key.position.x=-4+x*4;red.emissiveIntensity=.4+breach*.9;
    renderer.render(scene,camera);
    // A compact diagnostic makes the actual input-driven state testable.
    host.dataset.sceneState=`${x.toFixed(2)},${y.toFixed(2)},${progress.toFixed(2)},${breach.toFixed(2)}`;
    host.dataset.motion=reduced?'reduced':'active';
  }
  const onLost=(e:Event)=>{e.preventDefault();delete host.parentElement!.dataset.webgl;};
  renderer.domElement.addEventListener('webglcontextlost',onLost);
  return {render,resize,dispose(){
    renderer.domElement.removeEventListener('webglcontextlost',onLost);
    const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>();
    scene.traverse(obj=>{if(obj instanceof THREE.Mesh||obj instanceof THREE.Points){geometries.add(obj.geometry);(Array.isArray(obj.material)?obj.material:[obj.material]).forEach((m:THREE.Material)=>materials.add(m));}});
    minorTicks.dispose();majorTicks.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());env.dispose();renderer.dispose();renderer.domElement.remove();
  }};
}
