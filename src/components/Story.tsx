'use client';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {ArrowDown,ArrowUpRight,LockKeyhole,ShieldCheck} from 'lucide-react';
import styles from './Breach.module.css';
export function Breach(){
 const root=useRef<HTMLElement>(null);const [phase,setPhase]=useState(0);
 useEffect(()=>{const el=root.current!;const reduced=matchMedia('(prefers-reduced-motion:reduce)');const update=()=>{const p=reduced.matches?1:Number(el.style.getPropertyValue('--sc-p')||0);setPhase(p<.22?0:p<.7?1:2);};const observer=new MutationObserver(update);observer.observe(el,{attributes:true,attributeFilter:['style']});reduced.addEventListener('change',update);update();return()=>{observer.disconnect();reduced.removeEventListener('change',update);};},[]);
 return <section ref={root} id="breach" className={styles.breach} data-sc-act="pin" data-sc-span="1.7" aria-labelledby="breach-title">
  <div data-sc-stage className={styles.stage}>
   <div className={styles.chamber} aria-hidden="true">
    <div className={styles.depth}>{[0,1,2,3,4,5].map(n=><div key={n} className={styles.frame} style={{'--n':n} as CSSProperties}><i/><i/></div>)}</div>
    <div className={styles.floor}/><div className={styles.light}/>
    <svg className={styles.perspectiveLines} viewBox="0 0 1440 900" preserveAspectRatio="none"><g fill="none" stroke="#c6aa6a" strokeOpacity=".22"><path d="M0 0 590 360M1440 0 850 360M0 900 590 560M1440 900 850 560M0 450h590m260 0h590M720 560v340M590 560 290 900M850 560l300 340"/></g></svg>
   </div>
   <div className={styles.arrival} aria-hidden={phase!==2}><span>THE ROYAL MINT / MUMBAI</span><p>You’re <em>in.</em></p><span className={styles.arrivalRule}/><p className={styles.arrivalCopy}>The rehearsal is over.<br/>Every move from here counts.</p><a href="#plan" tabIndex={phase===2?0:-1}>ENTER THE MINT <ArrowUpRight size={18}/></a></div>
   <div className={`${styles.door} ${styles.left}`} aria-hidden="true"><div className={styles.panel}/><span className={styles.doorSerial}>CV—02 / RESTRICTED ACCESS</span><span className={styles.doorNumber}>01</span><div className={styles.hazard}/>{[0,1,2].map(n=><span key={n} className={styles.bolt} style={{'--n':n} as CSSProperties}/>)}<span className={styles.plate}>ROYAL MINT<br/><small>REINFORCED STEEL / 240 MM</small></span></div>
   <div className={`${styles.door} ${styles.right}`} aria-hidden="true"><div className={styles.panel}/><span className={styles.doorSerial}>SECURITY GATE / SECTOR 01</span><span className={styles.doorNumber}>02</span><div className={styles.hazard}/>{[0,1,2].map(n=><span key={n} className={styles.bolt} style={{'--n':n} as CSSProperties}/>)}<span className={styles.plate}>NO WAY BACK<br/><small>OPERATION CODEVERSE / 2026</small></span></div>
   <div className={styles.seam} aria-hidden="true"/>
   <div className={styles.intro}><span className={styles.eyebrow}>FIVE MONTHS OF PREPARATION. ONE MOMENT.</span><h2 id="breach-title">The training<br/>ends <em>here.</em></h2><p>You know the plan.<br/>Now prove you belong inside.</p></div>
   <div className={styles.lock} aria-hidden="true"><svg viewBox="0 0 220 220" fill="none"><circle cx="110" cy="110" r="102" fill="#131815" stroke="#555a4e" strokeWidth="3"/><circle cx="110" cy="110" r="93" stroke="#837d67" strokeDasharray="2 9"/><g className={styles.wheel}><circle cx="110" cy="110" r="63" stroke="#b2a389" strokeWidth="5"/>{[0,60,120].map(n=><g key={n} transform={`rotate(${n} 110 110)`}><path d="M31 110h158" stroke="#090d0b" strokeWidth="16"/><path d="M31 110h158" stroke="#8b8975" strokeWidth="8"/></g>)}<circle cx="110" cy="110" r="22" fill="#1e241e" stroke="#a18d6e"/><circle cx="110" cy="110" r="8" stroke="#ed493d" strokeWidth="2"/></g></svg><span>SCROLL TO BREACH</span></div>
   <div className={styles.topbar}><span><LockKeyhole size={13}/> TRANSITION / BREACH PROTOCOL</span><a href="#plan">SKIP TO THE MISSION <ArrowUpRight size={13}/></a></div>
   <div className={styles.bottom}><div className={styles.status} role="status">{phase===2?<ShieldCheck size={17}/>:<LockKeyhole size={16}/>}<span>{['AWAITING YOUR MOVE','DISENGAGING LOCKDOWN','ACCESS GRANTED'][phase]}</span></div><div className={styles.sequence}>{['AUTHORISE','UNLOCK','ENTER'].map((s,i)=><span key={s} data-active={phase>=i}><b>0{i+1}</b>{s}<i/></span>)}</div><span className={styles.scroll}>KEEP MOVING <ArrowDown size={15}/></span></div>
  </div>
 </section>;
}
