'use client';
import {useEffect,useRef,type CSSProperties} from 'react';
import {ArrowUpRight,Fingerprint,LockKeyhole} from 'lucide-react';
import styles from './Payoff.module.css';
const prizes=[{rank:'01',place:'FIRST CREW OUT',amount:'12,000',status:'PRIORITY RELEASE'},{rank:'02',place:'SECOND CREW OUT',amount:'8,000',status:'ALLOCATION / 02'},{rank:'03',place:'THIRD CREW OUT',amount:'5,000',status:'ALLOCATION / 03'}];
export default function Payoff(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{const el=root.current!;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.dataset.visible='true';observer.disconnect();}},{threshold:.15});observer.observe(el);return()=>observer.disconnect();},[]);
 return <section ref={root} id="loot" className={styles.section} aria-labelledby="payoff-title"><div className={styles.container}>
  <div className={styles.index}><span><i/>THE PAYOFF / EVIDENCE ROOM</span><span>CASE NO. CV—0910 / CONTENTS VERIFIED</span><LockKeyhole size={14}/></div>
  <div className={styles.layout}>
   <div className={styles.scene}>
    <div className={styles.sceneHeader}><span>PROPERTY OF THE MINT</span><span>UNTIL NOW.</span></div>
    <div className={styles.cash} aria-hidden="true">{[0,1,2,3,4,5].map(i=><div className={styles.bundle} key={i} style={{'--i':i} as CSSProperties}><div className={styles.note}><span className={styles.noteTop}>CODEVERSE RESERVE / THE HEIST</span><div className={styles.noteCenter}><strong>CV</strong><Fingerprint size={43}/><strong>CV</strong></div><span className={styles.noteBottom}>OPERATION 0910 · MUMBAI</span><div className={styles.band}><span>SEALED</span><b>DJS CODEAI</b><span>CV—02 / 2026</span></div></div></div>)}</div>
    <div className={styles.evidence}><span className={styles.redSeal}>EVIDENCE<br/><b>RELEASED</b></span><div className={styles.tag}><span>EXHIBIT A / TOTAL PRIZE POOL</span><strong><small>₹</small>25,000</strong><div><span>COUNTED. SEALED. WAITING.</span><Fingerprint size={18}/></div></div></div>
    <div className={styles.sceneFooter}><span className={styles.barcode}/><span>NO LOOSE ENDS.<br/>JUST YOUR SHARE.</span></div>
   </div>
   <div className={styles.content}>
    <span className={styles.kicker}>YOU DIDN’T COME THIS FAR FOR NOTHING.</span><h2 id="payoff-title">Take your<br/><em>cut.</em></h2><p className={styles.intro}>The risk was shared.<br/>The reward is yours to take.</p>
    <div className={styles.ledger}>{prizes.map(({rank,place,amount,status})=><article className={styles.allocation} key={rank}><span className={styles.rank}>{rank}</span><div className={styles.prizeDetails}><span>{place}</span><strong><small>₹</small>{amount}</strong><span className={styles.status}>{status}</span></div><span className={styles.trophy}>+ TROPHY<ArrowUpRight size={17}/></span></article>)}</div>
    <div className={styles.certificate}><Fingerprint size={21}/><p>Every operative leaves a mark.<br/><strong>E-certificate for every participant.</strong></p></div>
   </div>
  </div>
  <footer className={styles.footer}><span>THE PROFESSOR HAS ACCOUNTED FOR EVERYTHING.</span><a href="#crew">CLAIM YOUR PLACE IN THE CREW <ArrowUpRight size={18}/></a></footer>
 </div></section>;
}
