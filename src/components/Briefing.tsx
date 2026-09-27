'use client';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,Fingerprint,KeyRound,Landmark,Route} from 'lucide-react';
import '@fontsource/quantico/700-italic.css';
import '@fontsource/story-script/400.css';
import '@fontsource/inter/400.css';
import styles from './Briefing.module.css';

const stops=[
 {name:'THE PROFESSOR',tag:'THE FIRST KNOCK',short:'A stranger. An invitation.',title:['NO NAMES. NO PASTS.','JUST THE BEGINNING.'],text:'It’s been five months since he found you. No names. No pasts. Just a knock on the door, and a man who called himself The Professor.',extra:'He had a plan. But a plan needs people. This is where your story with the crew begins.',note:'The plan is only as good as the crew executing it.',details:['The Professor','The invitation','Your crew'],color:'#f04a3e',icon:Fingerprint},
 {name:'THE TRAINING',tag:'FIVE MONTHS IN THE MAKING',short:'The farmhouse. The preparation.',title:['NO ROOM FOR ERROR.','NO SECOND CHANCES.'],text:'He trained you. No phones. No families. No room for error. Five months in the farmhouse, learning to think as one crew.',extra:'Today, the training ends. Today, you go in. What happens next depends on the people beside you.',note:'You are not hackathon teams. You are the crew.',details:['Five months','One plan','Three per crew'],color:'#f04a3e',icon:KeyRound},
 {name:'THE MINT',tag:'THE OPERATION BEGINS',short:'Forty-five crews. One target.',title:['GET IN. TAKE CONTROL.','PRINT YOUR FUTURE.'],text:'The Royal Mint holds the one machine that prints currency that has never officially existed. Control it, and you decide what money even means.',extra:'Forty-five crews enter. Complete the challenges inside the Mint. Only the top ten crews earn their way into The Escape.',note:'Task details stay classified until event day.',details:['45 crews','Phase 01','Top 10 advance'],color:'#f04a3e',icon:Landmark},
 {name:'THE ESCAPE',tag:'THE FINAL CHAPTER',short:'Every decision matters.',title:['GETTING IN WAS EASY.','NOW FIND YOUR WAY OUT.'],text:'You’re out of the Mint, but not out of trouble. Every decision matters. You either escape, or you get caught.',extra:'Follow the trail. Collect every hint. The first crew to complete the escape wins. Get out before the walls close in.',note:'The job was never just about getting in.',details:['10 crews','Phase 02','One winning crew'],color:'#f04a3e',icon:Route},
];
const route='M85 76 H470 Q590 76 590 167 Q590 210 470 210 H195 Q85 210 85 305 Q85 370 205 370 H495 Q590 370 590 452 H650';
export default function Briefing(){
 const [active,setActive]=useState(0);
 const root=useRef<HTMLElement>(null),story=useRef<HTMLDivElement>(null),buttons=useRef<HTMLDivElement>(null);
 useEffect(()=>{const node=root.current!;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){node.dataset.visible='true';observer.disconnect();}},{threshold:.15});observer.observe(node);return()=>observer.disconnect();},[]);
 function select(index:number,keyboard=false){setActive(index);if(keyboard)(buttons.current?.querySelectorAll('button')[index] as HTMLButtonElement)?.focus();else if(matchMedia('(max-width:900px)').matches){story.current?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});}}
 const selected=stops[active];
 return <section ref={root} className={styles.briefing} id="briefing" aria-labelledby="briefing-title" style={{'--stop-color':selected.color} as CSSProperties}>
  <svg className={styles.frame} viewBox="0 0 1920 800" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M115 0 22 95v157L7 267v298l84 84v151M150 0 48 104v143l-19 22v283l104 104v144M0 15h52L0 69M1804 0l93 96v150l16 21v298l-85 84v151M1770 0l103 104v143l19 22v283l-104 104v144"/><path d="M0 715a170 170 0 0 1 171 85M1920 626a180 180 0 0 0-180 174" strokeDasharray="5 8"/><circle cx="48" cy="247" r="5"/><circle cx="1873" cy="247" r="5"/></g><g fill="#782b22"><path d="M0 0h64L0 64zM1920 800h-64l64-64z"/></g></svg>
  <div className={styles.container}>
   <div className={styles.eyebrow}><span>01 / THE BRIEFING</span><span>THE PROFESSOR HAS A PLAN.</span></div>
   <header className={styles.heading}><h2 id="briefing-title">NO NAMES. NO PASTS.<br/><span>JUST THE PLAN.</span></h2><p>From the first knock<br/>to the final escape.<span className={styles.sticker}>Every move matters.</span></p></header>
   <div className={styles.explorer}>
    <div className={styles.map}>
     <p className={styles.hint}>PICK A STOP. FOLLOW THE STORY. <ArrowRight size={16}/></p>
     <svg className={styles.line} viewBox="0 0 700 540" preserveAspectRatio="none" aria-hidden="true"><path className={styles.ghost} d={route}/><path className={styles.trace} d={route} pathLength="1"/></svg>
     <div ref={buttons} className={styles.stops} role="group" aria-label="Explore briefing chapters" onKeyDown={e=>{const index=Array.from(buttons.current!.querySelectorAll('button')).indexOf(document.activeElement as HTMLButtonElement);let next=index;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(index+1)%4;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(index+3)%4;else if(e.key==='Home')next=0;else if(e.key==='End')next=3;else return;e.preventDefault();select(next,true);}}>
      {stops.map(({name,short,color,icon:Icon},i)=><button key={name} type="button" className={`${styles.stop} ${styles['stop'+(i+1)]}`} style={{'--node-color':color} as CSSProperties} aria-pressed={active===i} aria-controls="briefing-story-panel" onClick={()=>select(i)}><span className={styles.pin}><Icon size={24} aria-hidden="true"/><small>0{i+1}</small></span><span className={styles.stopText}><strong>{name}</strong><span>{short}</span>{i===3&&<em>THE WAY OUT ↗</em>}</span></button>)}
     </div>
     <span className={styles.scribble} aria-hidden="true">Every move counts.<br/>Trust your crew.</span>
    </div>
    <div ref={story} className={styles.story} id="briefing-story-panel" role="region" aria-label="Selected briefing chapter">
     <div className={styles.storyTop}><span>CHAPTER 0{active+1} / 04</span><span>{selected.tag}</span></div>
     <div aria-live="polite" aria-atomic="true"><article key={active} className={styles.storyBody}><span className={styles.number} aria-hidden="true">0{active+1}</span><h3>{selected.title[0]}<br/><span>{selected.title[1]}</span></h3><p>{selected.text}</p><p>{selected.extra}</p><ul className={styles.details} aria-label="Chapter details">{selected.details.map(detail=><li key={detail}>{detail}</li>)}</ul><p className={styles.note}><span>THE PROFESSOR’S NOTE /</span>{selected.note}</p></article></div>
     <div className={styles.controls}><span>EVERY CHAPTER BRINGS YOU CLOSER.</span><button type="button" aria-label="Previous briefing chapter" disabled={active===0} onClick={()=>setActive(v=>Math.max(0,v-1))}><ArrowLeft size={20}/></button><button type="button" aria-label="Next briefing chapter" disabled={active===3} onClick={()=>setActive(v=>Math.min(3,v+1))}><ArrowRight size={20}/></button></div>
    </div>
   </div>
   <footer className={styles.footer}><p><span>YOUR OBJECTIVE</span>Get in. Take control. Print your future. <strong>Get out.</strong></p><a href="#crew">ASSEMBLE YOUR CREW <ArrowUpRight size={22}/></a></footer>
  </div>
 </section>;
}
