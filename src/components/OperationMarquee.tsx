'use client';
import {useEffect,useRef,useState} from 'react';
import {Pause,Play} from 'lucide-react';
import styles from './OperationMarquee.module.css';
const facts=[['45','CREWS'],['03','PER CREW'],['10','HOURS'],['01','MINT']];
export default function OperationMarquee(){
 const root=useRef<HTMLElement>(null);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{const el=root.current!;const observer=new IntersectionObserver(([entry])=>{el.dataset.visible=String(entry.isIntersecting);});observer.observe(el);return()=>observer.disconnect();},[]);
 return <section ref={root} className={styles.marquee} aria-label="Operation at a glance" data-paused={paused} data-visible="false">
  <div className={styles.meta}><span><i/>OPERATION CODEVERSE / 09.10.2026</span><span>THE PLAN STARTS HERE <span aria-hidden="true">↓</span></span></div>
  <p className={styles.srOnly}>45 crews. Three people per crew. Ten hours. One Mint. No second chances.</p>
  <div className={styles.window} aria-hidden="true"><div className={styles.track}>{[0,1].map(copy=><div className={styles.group} key={copy}>{facts.map(([number,label])=><span className={styles.fact} key={label}><b>{number}</b><span>{label}</span><i/></span>)}<span className={styles.mantra}>NO SECOND CHANCES.</span><span className={styles.separator}>/</span></div>)}</div></div>
  <button className={styles.toggle} onClick={()=>setPaused(v=>!v)} aria-label={paused?'Play operation marquee':'Pause operation marquee'} aria-pressed={paused}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>
 </section>;
}
