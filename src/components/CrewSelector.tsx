'use client';
import {useState,useRef,type CSSProperties} from 'react';
import {ArrowUpRight,Check,Plus,Fingerprint,Crosshair,Code2,Network,ShieldCheck} from 'lucide-react';
import {JoinButton} from './Experience';
import styles from './CrewSelector.module.css';
const operatives=[
 {name:'THE ARCHITECT',tag:'READ THE ROOM.',skill:'STRATEGY / SYSTEMS',icon:Network,description:'See the pattern before anyone else. Connect the clues, challenge the assumptions, and keep the crew moving with a plan.',traits:['Connect the dots','Think ahead','Find the angle']},
 {name:'THE ENGINEER',tag:'MAKE IT HAPPEN.',skill:'CODE / EXECUTION',icon:Code2,description:'Turn the plan into something that works. Build, test, adapt. When the pressure rises, you’re the one who makes the next move possible.',traits:['Build with intent','Test the limits','Solve together']},
 {name:'THE WILDCARD',tag:'EXPECT THE UNEXPECTED.',skill:'INSTINCT / ADAPTATION',icon:Crosshair,description:'A fresh perspective changes everything. Spot what the others missed, take on the unexpected, and help the crew find another way through.',traits:['Question everything','Change the approach','Back your crew']},
];
export default function CrewSelector(){
 const [count,setCount]=useState<2|3>(3),[active,setActive]=useState(0);const selected=operatives[active];const dossier=useRef<HTMLDivElement>(null);
 function configure(n:2|3){setCount(n);if(n===2&&active===2)setActive(0);}
 return <section id="crew" className={styles.section} aria-labelledby="crew-title">
  <div className={styles.container}>
   <div className={styles.index}><span><i/>02 / PERSONNEL SELECTION</span><span>TRUST IS YOUR MOST VALUABLE ASSET.</span><Fingerprint size={18}/></div>
   <header className={styles.heading}><div><p>THE PROFESSOR CAN’T DO THIS ALONE.</p><h2 id="crew-title">Good plan.<br/><em>Better people.</em></h2></div><div className={styles.setup}><span className={styles.label}>SELECT YOUR CREW CONFIGURATION</span><div className={styles.switch} role="group" aria-label="Choose crew size">{([2,3] as const).map(n=><button key={n} aria-pressed={count===n} onClick={()=>configure(n)}><span>0{n}</span><span>{n===2?'THE DUO':'THE TRIO'}<small>{n} OPERATIVES</small></span>{count===n?<Check size={17}/>:<Plus size={17}/>}</button>)}</div><p>Minimum 2. Maximum 3.<br/><strong>Both configurations are cleared for entry.</strong></p></div></header>
   <div className={styles.console} data-size={count}>
    <div className={styles.consoleHeader}><span><i/>CREW MANIFEST / CV—026</span><span>SELECT AN OPERATIVE TO OPEN THEIR DOSSIER <ArrowUpRight size={12}/></span></div>
    <div className={styles.roster}>
     {operatives.map(({name,tag,skill,icon:Icon},i)=>{
      const present=i<count;return <div key={name} className={styles.slot} data-present={present} data-active={active===i&&present} style={{'--slot':i} as CSSProperties}>
       <button className={styles.person} aria-label={present?`Inspect ${name}`:'Add optional third operative'} aria-pressed={present&&active===i} aria-controls="operative-dossier" onClick={()=>{if(!present)configure(3);setActive(i);if(matchMedia('(max-width:760px)').matches)requestAnimationFrame(()=>dossier.current?.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}));}} onPointerMove={e=>{if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--look',`${(e.clientX-r.left-r.width/2)/30}px`);}} onPointerLeave={e=>e.currentTarget.style.setProperty('--look','0px')}>
        <span className={styles.cardTop}><span>OPERATIVE / 0{i+1}</span><span>{i===2?'OPTIONAL':'CORE CREW'}</span></span>
        <span className={styles.number} aria-hidden="true">0{i+1}</span>
        <span className={styles.ruler} aria-hidden="true"/>
        <img src="/media/operative.webp" alt="" width="900" height="1350" loading="lazy" className={styles.portrait}/>
        <span className={styles.reticle} aria-hidden="true"><span/><Fingerprint size={35}/></span>
        <span key={`${count}-${active}`} className={styles.scan} aria-hidden="true"/>
        {!present&&<span className={styles.vacancy}><span><Plus size={30}/></span><strong>ONE MORE MIND.</strong><small>ADD AN OPTIONAL THIRD OPERATIVE</small></span>}
        <span className={styles.cardBottom}><span className={styles.codename}><Icon size={17}/>{skill}</span><strong>{name}</strong><span className={styles.tag}>{tag}<ArrowUpRight size={19}/></span></span>
       </button>
       <div className={styles.cardStatus}><span><i/>{present?'POSITION FILLED':'OPTIONAL POSITION'}</span><span>{present?'VERIFIED':'NOT REQUIRED'}</span></div>
      </div>;
     })}
    </div>
    <div ref={dossier} className={styles.dossier} id="operative-dossier" role="region" aria-label="Operative dossier">
     <div className={styles.profile} key={active}><span className={styles.profileIndex}>0{active+1}<Fingerprint size={24}/></span><div><span className={styles.label}>INSIDE THE MIND / {selected.name}</span><p>{selected.description}</p><ul>{selected.traits.map(t=><li key={t}><Plus size={11}/>{t}</li>)}</ul></div></div>
     <div className={styles.clearance} role="status"><ShieldCheck size={25}/><div><strong>{count===2?'DUO':'TRIO'} CLEARED.</strong><span>0{count} / 03 POSITIONS FILLED</span></div><div className={styles.meter} aria-hidden="true">{[1,2,3].map(n=><i key={n} data-filled={n<=count}/>)}</div></div>
    </div>
   </div>
   <footer className={styles.footer}><div><span>DIFFERENT STRENGTHS. ONE CREW.</span><p>Any college. Any branch. Any level.</p><small>These are crew archetypes. Share the roles however you work best.</small></div><JoinButton label={`Register your ${count===2?'duo':'trio'}`} className={styles.join}/></footer>
  </div>
 </section>;
}
