'use client';

import {useEffect,useId,useRef,type CSSProperties} from 'react';

import {ArrowUpRight,LockKeyhole,ArrowRight} from 'lucide-react';

import styles from './PhaseOne.module.css';

function MintSchematic({active}:{active:number}){

 const uid=useId().replace(/:/g,'');

 return <svg viewBox="0 0 720 475" className={styles.schematic} fill="none" aria-hidden="true" data-view={active}>

  <defs><pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="#a29c7b" strokeOpacity=".075"/></pattern><linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#333b30"/><stop offset="1" stopColor="#141c16"/></linearGradient></defs>

  <rect width="720" height="475" fill={`url(#${uid}-grid)`}/>

  <g className={styles.building}>

   <path d="M90 213 332 75 626 236 383 384z" stroke="#6e715c" strokeDasharray="4 6"/><path d="M90 213v26l293 169 243-146v-26M383 384v24" stroke="#64694f"/>

   <path d="M117 209 333 86 602 235 384 365z" fill="#172019" stroke="#838471"/>

   <path d="M117 209v-53L333 33v53z" fill={`url(#${uid}-wall)`} stroke="#69715b"/><path d="M333 33 602 182v53L333 86z" fill="#252e24" stroke="#69715b"/>

   <path d="M126 157 333 40 593 183" stroke="#b6a67d" strokeOpacity=".55"/>

   <path d="M156 206 347 99M194 228 385 122M235 251 425 145M277 274 466 168M319 297 508 191M361 321 550 214" stroke="#71745c" strokeOpacity=".22"/>

   <path d="M144 194 409 342M182 171 448 320M222 149 487 296M260 127 527 274M300 104 566 251" stroke="#71745c" strokeOpacity=".22"/>

   {[0,1,2,3,4].map(row=>[0,1,2,3,4,5,6,7,8].map(col=>{const x=177+col*24+row*42,y=191-col*13.5+row*24;const selected=row===2||active===2&&col<2;return <g className={styles.workstation} key={`${row}-${col}`} style={{'--station-delay':`${(row*9+col)*.012}s`} as CSSProperties} data-highlight={active===2?col<2:selected}>

    <path d={`M${x} ${y}l17-10 21 12-17 10z`} fill={active===2&&col<2?'#a54432':'#333d2f'} stroke="#85836a" strokeWidth=".65"/>

    <path d={`M${x} ${y}v12l21 12v-12M${x+21} ${y+24}l17-10v-12`} fill="#1c251c" stroke="#5b6751" strokeWidth=".65"/>

    <path d={`M${x+9} ${y-2}l9-5 10 6-9 5z`} fill={active===2&&col<2?'#e3694b':'#aaa385'} fillOpacity={active===1?.2:.65}/>

   </g>;}))}

   <path className={styles.route} pathLength="1" d="M132 243 185 274 263 230 387 300 462 256 563 313" stroke="#ee503c" strokeWidth="2"/>

   <circle cx="132" cy="243" r="5" fill="#e9543b"/><circle cx="563" cy="313" r="5" fill="#e9543b"/>

   <path d="M104 252 104 292 200 348M563 313l51 31h60" stroke="#a0946f" strokeWidth="1"/>

   <g fill="#aaa68d" fontFamily="monospace" fontSize="8" letterSpacing="1"><text x="113" y="314">ENTRY / 45 CREWS</text><text x="554" y="362">EXIT / TOP 10</text></g>

  </g>

  {active===1&&<g className={styles.seal}><path d="M260 178h200v104H260z" fill="#111a14" stroke="#a44937"/><path d="M346 216v-12a14 14 0 0 1 28 0v12m-32 0h36v28h-36z" stroke="#d1b895" strokeWidth="2"/><text x="360" y="264" textAnchor="middle" fill="#d2b993" fontFamily="monospace" fontSize="10" letterSpacing="2">ASSIGNMENT SEALED</text></g>}

  <g fill="#7e8975" fontFamily="monospace" fontSize="8" letterSpacing="1"><text x="34" y="34">ROYAL MINT / OPERATIONS FLOOR</text><text x="34" y="445">CONCEPT SCHEMATIC · NOT THE ACTUAL VENUE LAYOUT</text><text x="642" y="34">CV—01</text></g>

 </svg>;

}



export default function PhaseOne(){

 const root=useRef<HTMLElement>(null);

 useEffect(()=>{const el=root.current!;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.dataset.visible='true';observer.disconnect();}},{threshold:.18});observer.observe(el);return()=>observer.disconnect();},[]);

 return <section ref={root} id="plan" className={styles.section} aria-labelledby="mint-title">

  <div className={styles.container}>

   <div className={styles.index}><span><i/>03 / THE PLAN</span><span>PHASE 01 · 10:00—13:30 IST</span></div>

   <div className={styles.layout}>

    <div className={styles.copy}>

     <span className={styles.kicker}>THE DOOR IS OPEN. THE CLOCK IS RUNNING.</span>

     <h2 id="mint-title">Inside<br/>the Mint<span>.</span></h2>

     <div className={styles.phaseTime}><span>PHASE 01 / EVENT TIME</span><strong><time>10:00</time><b>—</b><time>13:30</time><small>IST</small></strong></div>
     <p className={styles.lead}>This is where the plan<br/>becomes your problem.</p>

     <p className={styles.description}>You’re in. Work through the challenges, build with your crew, and make every minute count. Only the top 10 crews earn their way into The Escape.</p>

     <div className={styles.sealed}><LockKeyhole size={20}/><div><strong>THE ASSIGNMENT STAYS SEALED.</strong><p>Tasks and evaluation details drop at the event briefing.</p></div><span>CV / 01</span></div>

     <a className={styles.rules} href="#rules">KNOW THE GROUND RULES <ArrowUpRight size={17}/></a>

    </div>

    <div className={styles.visual} onPointerMove={e=>{if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--tilt',`${(e.clientX-r.left-r.width/2)/110}deg`);e.currentTarget.style.setProperty('--lift',`${-(e.clientY-r.top-r.height/2)/130}deg`);}} onPointerLeave={e=>{e.currentTarget.style.setProperty('--tilt','0deg');e.currentTarget.style.setProperty('--lift','0deg');}}>

     <div className={styles.visualTop}><span>THE ROYAL MINT</span><span>ISOMETRIC / 01</span></div>

     <div className={styles.model}><MintSchematic active={2}/></div>

     <div className={styles.coordinate} aria-hidden="true"><i/><span>19.0760° N<br/>72.8777° E</span></div>

     <div className={styles.visualBottom}><span><i/>45 POSITIONS. TEN WAYS FORWARD.</span><span>BUILD. SOLVE. QUALIFY.</span></div>

    </div>

   </div>

   <div className={styles.footer}>

    <div className={styles.stat}><strong>45</strong><span>CREWS<br/>ENTER</span></div>

    <div className={styles.stat}><strong>210</strong><span>MINUTES<br/>INSIDE</span></div>

    <div className={styles.stat}><strong>10</strong><span>CREWS<br/>ADVANCE</span></div>

    <a href="#escape"><span>MAKE THE CUT.<br/><strong>THEN MAKE YOUR ESCAPE.</strong></span><ArrowRight size={23}/></a>

   </div>

  </div>

 </section>;

}
