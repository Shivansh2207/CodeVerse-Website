'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowUpRight,Fingerprint,LockKeyhole,MoveRight} from 'lucide-react';
import styles from './Briefing.module.css';

const chapters=[
 {label:'The approach',code:'RECRUITMENT',heading:<>No names.<br/>No pasts.</>,paragraphs:['It’s been five months since he found you. Just a knock on the door, and a man who called himself The Professor.','He trained you. No phones. No families. No room for error.'],quote:'The plan is only as good as the crew executing it.',note:'45 CREWS · THREE MINDS IN EACH',evidence:'THE PROFESSOR',caption:'The architect of the operation.'},
 {label:'The target',code:'THE ROYAL MINT',heading:<>Control the Mint.<br/>Change the rules.</>,paragraphs:['The Royal Mint holds the one machine that prints currency that has never officially existed. Control it, and you decide what money even means.','Forty-five crews go in. Only the top ten earn their way into The Escape.'],quote:'Today, the training ends. Today, you go in.',note:'PHASE 01 · INSIDE THE MINT',evidence:'THE FLOOR PLAN',caption:'Every entrance. Every blind spot.'},
 {label:'The way out',code:'EXTRACTION',heading:<>Getting in was<br/>the easy part.</>,paragraphs:['Get in. Take control of the mint. Print what you came for. Get out before the walls close in.','In The Escape, every decision matters. The first crew to collect every hint wins.'],quote:'You are not hackathon teams. You are the crew.',note:'PHASE 02 · THE ESCAPE',evidence:'THE EXIT ROUTE',caption:'A perfect plan always has a way out.'},
];
export default function Briefing(){
 const root=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),tabs=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const section=root.current!,surface=stage.current!,reduced=matchMedia('(prefers-reduced-motion: reduce)'),compact=matchMedia('(max-width: 900px)');
  let frame=0,pointerFrame=0,lastChapter=0;
  const update=()=>{frame=0;const r=section.getBoundingClientRect();const p=reduced.matches||compact.matches?0:Math.max(0,Math.min(1,-r.top/Math.max(1,section.offsetHeight-surface.offsetHeight)));surface.style.setProperty('--progress',p.toFixed(4));const next=Math.min(2,Math.floor(p*3));if(next!==lastChapter){lastChapter=next;if(!tabs.current?.contains(document.activeElement))setActive(next);}};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const pointer=(e:PointerEvent)=>{if(reduced.matches||e.pointerType!=='mouse')return;cancelAnimationFrame(pointerFrame);pointerFrame=requestAnimationFrame(()=>{const r=surface.getBoundingClientRect();surface.style.setProperty('--px',((e.clientX-r.left)/r.width-.5).toFixed(3));surface.style.setProperty('--py',((e.clientY-r.top)/r.height-.5).toFixed(3));});};
  const leave=()=>{cancelAnimationFrame(pointerFrame);surface.style.setProperty('--px','0');surface.style.setProperty('--py','0');};
  const resize=new ResizeObserver(scroll);resize.observe(section);surface.addEventListener('pointermove',pointer);surface.addEventListener('pointerleave',leave);window.addEventListener('scroll',scroll,{passive:true});reduced.addEventListener('change',scroll);compact.addEventListener('change',scroll);scroll();
  return()=>{cancelAnimationFrame(frame);cancelAnimationFrame(pointerFrame);resize.disconnect();surface.removeEventListener('pointermove',pointer);surface.removeEventListener('pointerleave',leave);window.removeEventListener('scroll',scroll);reduced.removeEventListener('change',scroll);compact.removeEventListener('change',scroll);};
 },[]);
 function select(index:number,focus=false){setActive(index);if(focus)(tabs.current?.querySelectorAll('button')[index] as HTMLButtonElement)?.focus();}
 return <section id="briefing" ref={root} className={styles.briefing} aria-labelledby="briefing-title">
  <div ref={stage} className={styles.stage} data-chapter={active}>
   <div className={styles.environment} aria-hidden="true"><img src="/media/briefing-room-v2.webp" alt="" width="1659" height="948" loading="lazy"/></div><div className={styles.shade} aria-hidden="true"/>
   <header className={styles.topline}><span><i/>01 / THE BRIEFING</span><span><LockKeyhole size={12}/> EYES ONLY · OPERATION CODEVERSE</span><span>CV—02 / INTELLIGENCE DIVISION</span></header>
   <div className={styles.sceneTitle}><p>FARMHOUSE · FIVE MONTHS EARLIER</p><h2 id="briefing-title">Every great heist<br/>begins with <em>a plan.</em></h2><span className={styles.titleRule}/></div>
   <div className={styles.evidence}><span className={styles.evidenceCross} aria-hidden="true">+</span><div key={active}><small>EXHIBIT 0{active+1}</small><strong>{chapters[active].evidence}</strong><p>{chapters[active].caption}</p></div></div>
   <div className={styles.dossier}>
    <div className={styles.folderTab}>THE PROFESSOR’S FILE <span>CV / 02</span></div>
    <div className={styles.paper}>
     <div className={styles.paperTop}><Fingerprint size={28} strokeWidth={1.2}/><span>CONFIDENTIAL TRANSCRIPT<br/><b>RECIPIENT: YOUR CREW</b></span><span className={styles.fileNumber}>0{active+1}<small>/ 03</small></span></div>
     {chapters.map((chapter,i)=><article key={chapter.code} id={'briefing-panel-'+i} role="tabpanel" aria-labelledby={'briefing-tab-'+i} tabIndex={0} hidden={active!==i} className={styles.transcript}>
      <div className={styles.subject}>SUBJECT / {chapter.code}</div><h3>{chapter.heading}</h3>
      <div className={styles.body}>{chapter.paragraphs.map(p=><p key={p}>{p}</p>)}</div>
      <blockquote>“{chapter.quote}”<cite>— THE PROFESSOR</cite></blockquote>
      <div className={styles.paperFoot}><span>{chapter.note}</span><span className={styles.stamp}>CLASSIFIED</span></div>
     </article>)}
     <div className={styles.paperFold} aria-hidden="true"/>
    </div>
    <div className={styles.dossierHint}><span/><span>TASK DETAILS REMAIN SEALED UNTIL EVENT DAY.</span></div>
   </div>
   <footer className={styles.bottom}>
    <div className={styles.readCue}><ArrowDown size={14}/><span>SCROLL TO UNFOLD<br/><b>OR SELECT A CHAPTER</b></span></div>
    <div ref={tabs} role="tablist" aria-label="Briefing chapters" className={styles.tabs} onKeyDown={e=>{let index=active;if(e.key==='ArrowRight')index=(active+1)%3;else if(e.key==='ArrowLeft')index=(active+2)%3;else if(e.key==='Home')index=0;else if(e.key==='End')index=2;else return;e.preventDefault();select(index,true);}}>
     {chapters.map((chapter,i)=><button key={chapter.code} id={'briefing-tab-'+i} role="tab" aria-selected={active===i} aria-controls={'briefing-panel-'+i} tabIndex={active===i?0:-1} onClick={()=>select(i)}><span>0{i+1}</span><strong>{chapter.label}</strong><MoveRight size={16}/></button>)}
    </div>
    <a href="#crew" className={styles.next}>ASSEMBLE YOUR CREW <ArrowUpRight size={19}/></a>
   </footer>
  </div>
 </section>;
}
