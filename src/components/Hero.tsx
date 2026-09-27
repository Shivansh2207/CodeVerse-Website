'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowRight,ArrowUpRight,UsersRound,Trophy,Landmark} from 'lucide-react';
import '@fontsource/anton/400.css';
import styles from './Hero.module.css';
const chapters=[
 {id:'briefing',name:'The brief',detail:'Understand the mission.'},
 {id:'crew',name:'Assemble',detail:'Build your crew.'},
 {id:'plan',name:'The Mint',detail:'Solve. Create. Innovate.'},
 {id:'escape',name:'The Escape',detail:'Claim what’s yours.'},
];
export default function Hero(){
 const root=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),canvas=useRef<HTMLDivElement>(null);
 const [chapter,setChapter]=useState(0);
 useEffect(()=>{
  const section=root.current!,surface=stage.current!,host=canvas.current!,reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let disposed=false,visible=true,frame=0,last=0,time=0,x=0,y=0,tx=0,ty=0,progress=0,focus=0;
  let scene:Awaited<ReturnType<typeof import('./HeroScene')['createHeroScene']>>|undefined;
  function tick(now:number){
   frame=0;if(disposed||!visible||document.hidden)return;
   const dt=Math.min((now-last)/1000||.016,.1);last=now;if(!reduced.matches)time+=dt;
   const easing=reduced.matches?1:1-Math.exp(-dt*3.5);
   x+=(tx-x)*easing;y+=(ty-y)*easing;focus=0;
   surface.style.setProperty('--mx',x.toFixed(4));surface.style.setProperty('--my',y.toFixed(4));
   surface.style.setProperty('--progress',progress.toFixed(4));surface.style.setProperty('--focus',focus.toFixed(4));
   scene?.render({x,y,progress,focus,time:reduced.matches?5:time,reduced:reduced.matches});
   if(!reduced.matches)frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
  function measure(){const r=section.getBoundingClientRect();progress=reduced.matches?0:Math.max(0,Math.min(1,-r.top/Math.max(1,section.offsetHeight-surface.offsetHeight)));wake();}
  function resize(){scene?.resize();measure();}
  function pointer(e:PointerEvent){if(e.pointerType==='touch'||reduced.matches)return;const r=surface.getBoundingClientRect();tx=(e.clientX-r.left)/r.width*2-1;ty=(e.clientY-r.top)/r.height*2-1;wake();}
  function leave(){tx=ty=0;wake();}
  function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{last=performance.now();wake();}}
  const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(!visible){cancelAnimationFrame(frame);frame=0;}else{last=performance.now();wake();}});intersection.observe(section);
  const observer=new ResizeObserver(resize);observer.observe(surface);
  surface.addEventListener('pointermove',pointer);surface.addEventListener('pointerleave',leave);surface.addEventListener('click',wake);
  window.addEventListener('scroll',measure,{passive:true});document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',resize);
  import('./HeroScene').then(async({createHeroScene})=>{if(disposed)return;const created=await createHeroScene(host);if(disposed){created?.dispose();return;}scene=created;if(scene)surface.dataset.webgl='ready';resize();}).catch(()=>{});
  resize();
  return()=>{disposed=true;cancelAnimationFrame(frame);scene?.dispose();intersection.disconnect();observer.disconnect();surface.removeEventListener('pointermove',pointer);surface.removeEventListener('pointerleave',leave);surface.removeEventListener('click',wake);window.removeEventListener('scroll',measure);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',resize);};
 },[]);
 return <section id="home" ref={root} className={styles.hero} aria-label="CodeVerse recruitment"><div ref={stage} className={styles.stage} data-chapter={chapter}>
  <div className={styles.photograph} aria-hidden="true"><img src="/media/hero-reference-v4.webp" alt="" width="1672" height="941" fetchPriority="high" draggable="false"/></div>
  <div className={styles.canvas} ref={canvas} aria-hidden="true"/><div className={styles.scrim} aria-hidden="true"/>
  <div className={styles.sceneLabel}><span/>MUMBAI, INDIA<i/>09 OCTOBER 2026</div>
  <div className={styles.coordinates}><i/>19.0760° N &nbsp; 72.8777° E</div>
  <div className={styles.content}>
   <div className={styles.eyebrow}><span/>DJS CODEAI PRESENTS</div>
   <h1><span className={styles.eventName}>CODEVERSE <span>2.0</span></span><span className={styles.brush}><img src="/media/the-heist-brush.webp" alt="The Heist" width="2137" height="433" draggable="false"/></span></h1>
   <div className={styles.motto}>LEARN · CREATE · INNOVATE</div>
   <p className={styles.copy}>A high-stakes, hands-on developer experience<br className={styles.desktopBreak}/> where strategy meets code. Assemble your crew,<br className={styles.desktopBreak}/> solve real challenges, and break into The Mint.</p>
   <div className={styles.actions}><a href="#join" className={styles.join}>Assemble your crew <ArrowRight/></a><a href="#briefing" className={styles.discover}>Discover the operation <ArrowUpRight/></a></div>
   <nav className={styles.chapters} aria-label="Mission chapters" onMouseLeave={()=>setChapter(0)}>{chapters.map((item,i)=><a key={item.id} href={'#'+item.id} data-active={chapter===i} onMouseEnter={()=>setChapter(i)} onFocus={()=>setChapter(i)} onBlur={()=>setChapter(0)}><i/><span className={styles.chapterNumber}>0{i+1}</span><span><strong>{item.name}</strong><small>{item.detail}</small></span></a>)}</nav>
  </div>
  <nav className={styles.checkpoints} aria-label="Operation checkpoints">{[{name:'Recruitment',id:'crew',number:1},{name:'The Mint',id:'plan',number:2},{name:'The Escape',id:'escape',number:3}].map(item=><a key={item.id} className={styles['checkpoint'+item.number]} href={'#'+item.id}><span>CHECKPOINT 0{item.number}</span><strong><i/>{item.name}</strong></a>)}</nav>
  <div className={styles.bottom}>
   <div className={styles.operation}><i/><span><small>OPERATION</small><b>CODEVERSE_2.0</b></span></div>
   <div className={styles.fact}><UsersRound/><b>45</b><span>CREWS</span></div>
   <div className={styles.fact}><Trophy/><b>₹25K</b><span>AT STAKE</span></div>
   <div className={styles.fact}><Landmark/><b>01</b><span>MINT</span></div>
   <nav className={styles.timeline} aria-label="Operation timeline"><span>OPERATION TIMELINE</span><div>{chapters.map((item,i)=><a key={item.id} href={'#'+item.id} aria-label={item.name} data-active={chapter===i}/>)}</div></nav>
   <a href="#briefing" className={styles.scroll}>THE STORY STARTS BELOW <ArrowDown/></a>
  </div>
  <div className={styles.scrollProgress} aria-hidden="true"/>
 </div></section>;
}
