'use client';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {ArrowDown,ArrowUpRight,ScanLine,ShieldCheck} from 'lucide-react';
import styles from './Elimination.module.css';
const crews=Array.from({length:45},(_,i)=>({id:i+1,rank:(i*17)%45}));
export function Elimination(){
 const ref=useRef<HTMLElement>(null);const [count,setCount]=useState(45);
 useEffect(()=>{const el=ref.current!;const reduced=matchMedia('(prefers-reduced-motion: reduce)');const read=()=>{const p=Number(el.style.getPropertyValue('--sc-p')||0);const progress=Math.max(0,Math.min(1,(p-.06)/.83));setCount(reduced.matches?10:Math.round(45-35*progress));};const observer=new MutationObserver(read);observer.observe(el,{attributes:true,attributeFilter:['style']});read();reduced.addEventListener('change',read);return()=>{observer.disconnect();reduced.removeEventListener('change',read);};},[]);
 const complete=count===10;
 return <section ref={ref} id="qualification" className={`elimination ${styles.section}`} data-sc-act="pin" data-sc-span="1.7" aria-labelledby="qualification-title" data-complete={complete}>
  <div data-sc-stage className={styles.stage}>
   <div className={styles.topline}><span><i/>THE CUT / QUALIFICATION</span><span>PHASE 01 → PHASE 02</span><span>ILLUSTRATED SELECTION · NOT LIVE RESULTS</span></div>
   <div className={styles.layout}>
    <div className={styles.copy}>
     <span className={styles.eyebrow}>THE ODDS ARE PART OF THE PLAN.</span>
     <h2 id="qualification-title"><span className={styles.count}>{count.toString().padStart(2,'0')}</span><span className={styles.remaining}>CREWS<br/><em>{complete?'ADVANCE.':'REMAIN.'}</em></span></h2>
     <div className={styles.counterTrack} aria-hidden="true">{Array.from({length:45},(_,i)=><i key={i} data-active={i<count}/>)}</div>
     <p className={styles.statement}>45 crews enter.<br/><strong>Only 10 move forward.</strong></p>
     <p className={styles.description}>The Mint tests everyone.<br/>The Escape belongs to the top ten.</p>
     <div className={styles.ticket}><span className={styles.ticketIcon}>{complete?<ShieldCheck size={24}/>:<ScanLine size={24}/>}</span><div><span>QUALIFICATION / TOP TEN</span><strong>{complete?'THE NEXT CHAPTER IS YOURS.':'EARN YOUR WAY OUT.'}</strong></div><span className={styles.ticketNumber}>10</span></div>
     <span className={styles.cue}><ArrowDown size={13}/>{complete?'THE ESCAPE AWAITS BELOW':'SCROLL TO MAKE THE CUT'}</span>
    </div>
    <div className={styles.board}>
     <div className={styles.boardTop}><span><ScanLine size={14}/> CREW MANIFEST</span><span><b>{String(count).padStart(2,'0')}</b> / 45 ACTIVE</span></div>
     <div className={styles.roster} aria-hidden="true">{crews.map(({id,rank})=>{const present=rank<count;return <div key={id} className={styles.card} data-active={present} data-qualified={complete&&present} style={{'--fall':`${id%2?3:-3}deg`} as CSSProperties}>
      <span className={styles.cardId}>CV<span>{String(id).padStart(2,'0')}</span></span><span className={styles.portrait}/><span className={styles.cross}/><span className={styles.cardFoot}><i/>{complete&&present?'QF':present?'IN':'OUT'}</span>
     </div>;})}</div>
     <div className={styles.boardBottom}><span><i/>{complete?'TOP TEN / CLEARED FOR THE ESCAPE':'SELECTION IN PROGRESS'}</span><span>{45-count} ELIMINATED</span></div>
    </div>
   </div>
   <div className={styles.bottom}><p>THE PLAN GETS YOU IN. <strong>YOUR CREW GETS YOU THROUGH.</strong></p><a href="#escape">NEXT / THE ESCAPE <ArrowUpRight size={17}/></a></div>
   <p className={styles.srOnly}>45 crews enter Phase 01. The top 10 qualify for Phase 02, The Escape. The crew cards illustrate this format and are not actual competition results.</p>
  </div>
 </section>;
}
