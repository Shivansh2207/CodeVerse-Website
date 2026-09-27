'use client';
import {useRef,useState,type CSSProperties} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,LockKeyhole,ScanLine} from 'lucide-react';
import styles from './Briefing.module.css';

const chapters=[
 {name:'THE PROFESSOR',label:'The invitation',heading:'Every great heist starts with a conversation.',body:'Five months ago, a stranger found you. No names. No pasts. Just an invitation from a man who called himself The Professor.',extra:'He had the blueprint. He needed the people. Now, you’re one of them.',note:'The plan is only as good as the crew executing it.',metric:'05',unit:'MONTHS IN THE MAKING',status:'PERSONNEL IDENTIFIED',target:'RECRUITMENT'},
 {name:'THE TRAINING',label:'The preparation',heading:'Different minds. One way of thinking.',body:'No phones. No families. No room for error. Five months in the farmhouse, learning to think, build, and move as one crew.',extra:'Today, the training ends. What happens next depends on the people beside you.',note:'You are not just a team. You are the crew.',metric:'2–3',unit:'OPERATIVES PER CREW',status:'CREW SYNCHRONISED',target:'PREPARATION'},
 {name:'THE MINT',label:'The operation',heading:'Get in. Take control. Print your future.',body:'Forty-five crews enter the Mint. Inside: a series of challenges that put your code, strategy, and teamwork under pressure.',extra:'Only the top ten crews advance. The mission details stay classified until event day.',note:'A good plan means nothing until you execute it.',metric:'45',unit:'CREWS. ONE TARGET.',status:'TARGET ACQUIRED',target:'THE MINT'},
 {name:'THE ESCAPE',label:'The extraction',heading:'Getting in was only half the job.',body:'You’re out of the Mint, but not out of trouble. Ten crews. A trail of hints. Every decision brings you closer to freedom—or to getting caught.',extra:'Follow the trail, collect every hint, and be the first crew to complete the escape.',note:'The job was never just about getting in.',metric:'10',unit:'CREWS MAKE THE ESCAPE',status:'EXTRACTION ROUTE OPEN',target:'THE ESCAPE'},
];

function Blueprint({active}:{active:number}){
 const labels=['BIOMETRIC AUTHENTICATION','MECHANISM / EXPLODED VIEW','SECURITY OVERRIDE','EXTRACTION / ROUTE ACTIVE'];
 return <svg className={styles.blueprint} data-chapter={active} viewBox="0 0 640 560" fill="none" aria-hidden="true">
  <defs>
   <pattern id="brief-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" stroke="#bbb4a7" strokeOpacity=".09"/></pattern>
   <radialGradient id="brief-glow"><stop stopColor="#da3429" stopOpacity=".2"/><stop offset="1" stopColor="#da3429" stopOpacity="0"/></radialGradient>
   <linearGradient id="brief-door" x1="140" y1="120" x2="510" y2="430" gradientUnits="userSpaceOnUse"><stop stopColor="#30332b"/><stop offset=".5" stopColor="#171c18"/><stop offset="1" stopColor="#282620"/></linearGradient>
   <clipPath id="brief-aperture"><circle cx="320" cy="274" r="148"/></clipPath>
  </defs>
  <rect width="640" height="560" fill="url(#brief-grid)"/><circle cx="320" cy="274" r="250" fill="url(#brief-glow)"/>
  <g stroke="#77766f" strokeWidth="1"><path d="M83 90h474v368H83zM99 106h442v336H99z"/><path d="M63 274h514M320 65v418" strokeDasharray="3 9"/><path d="M83 72v-16h474v16M65 90H49v368h16M83 482v16h474v-16"/></g>
  <g className={styles.ticks} stroke="#a29e90">{Array.from({length:72},(_,i)=><path key={i} d={`M320 69v${i%6===0?12:4}`} strokeOpacity={i%6===0?.7:.3} transform={`rotate(${i*5} 320 274)`}/>)}</g>
  <circle cx="320" cy="274" r="180" stroke="#aaa69b" strokeWidth="2"/><circle cx="320" cy="274" r="170" stroke="#77766f"/>
  <g clipPath="url(#brief-aperture)"><circle cx="320" cy="274" r="148" fill="#0b100d"/>
   <g className={styles.escapeMap} key={`map-${active}`}>
    <g stroke="#656f5d" strokeWidth="1"><path d="M180 154h280v240H180zM203 175h234v195H203zM230 198h180v145H230zM256 222h128v97H256zM180 154l76 68m204-68-76 68M180 394l76-75m204 75-76-75"/><path d="M205 274h232M320 175v195" strokeDasharray="2 8"/></g>
    <path className={styles.escapePath} pathLength="1" d="M246 364v-49h51v-61h62v-53h52" stroke="#ed493d" strokeWidth="3"/>
    {[ [246,364],[297,315],[359,254],[411,201] ].map(([x,y],i)=><g key={i} className={styles.waypoint} style={{'--delay':`${.8+i*.35}s`} as CSSProperties}><circle cx={x} cy={y} r="7" fill="#151a14" stroke="#ed493d"/><circle cx={x} cy={y} r="2" fill="#ed493d"/></g>)}
    <text x="285" y="395" fill="#d7c9aa" fontSize="9" fontFamily="monospace" letterSpacing="2">WAY OUT →</text>
   </g>
  </g>
  <g className={styles.door}>
   <circle cx="320" cy="274" r="158" fill="url(#brief-door)" stroke="#aaa69b"/>
   <g className={styles.outerAssembly}><circle cx="320" cy="274" r="148" stroke="#aaa69b" strokeDasharray="2 7"/><circle cx="320" cy="274" r="133" stroke="#aaa69b"/>
    {Array.from({length:12},(_,i)=><g key={i} transform={`rotate(${i*30} 320 274)`}><g className={styles.bolt} style={{'--delay':`${i*.045}s`} as CSSProperties}><rect x="313" y="103" width="14" height="40" rx="2" fill="#202720" stroke="#aaa69b"/><path d="M317 110v25m6-25v25" stroke="#62695f"/></g></g>)}
   </g>
   <g className={styles.innerAssembly} stroke="#9c9d8d"><circle cx="320" cy="274" r="107"/><circle cx="320" cy="274" r="99" strokeDasharray="40 12 3 12"/><path d="M244 198l152 152m-152 0 152-152M213 274h214M320 167v214" strokeOpacity=".3"/>
    {Array.from({length:8},(_,i)=><circle key={i} cx="320" cy="155" r="3" fill="#171e18" transform={`rotate(${i*45} 320 274)`}/>)}
   </g>
   <g className={styles.wheel} stroke="#bdb7a6"><circle cx="320" cy="274" r="50" strokeWidth="2"/><circle cx="320" cy="274" r="38"/>{[0,60,120].map(a=><g key={a} transform={`rotate(${a} 320 274)`}><path d="M252 274h136" stroke="#101612" strokeWidth="11"/><path d="M252 274h136" strokeWidth="6"/></g>)}<circle cx="320" cy="274" r="15" fill="#171c17"/><circle cx="320" cy="274" r="5" stroke="#ed493d"/></g>
   {active===0&&<g key="biometrics" className={styles.biometric}><rect x="265" y="203" width="110" height="142" rx="30" fill="#151c17"/><g stroke="#c1b8a2" strokeWidth="1.5" strokeLinecap="round">{[0,1,2,3,4].map(i=><path key={i} className={styles.fingerprint} style={{'--delay':`${i*.12}s`} as CSSProperties} pathLength="1" d={`M${277+i*8} ${287+i*7} V256 C${277+i*8} ${205+i*9} ${363-i*8} ${205+i*9} ${363-i*8} 256 V${280-i*3} Q${363-i*8} 320 ${341-i*4} ${327-i*3}`}/>)}<path d="M308 272v23q0 22-13 32M322 270v28q0 24-13 36"/></g><path d="M255 218v-15h15m100 0h15v15m0 112v15h-15m-100 0h-15v-15" stroke="#ed493d"/><g className={styles.bioScan}><path d="M264 230h112" stroke="#ed493d" strokeWidth="2"/><path d="M264 230h112" stroke="#ed493d" strokeOpacity=".15" strokeWidth="14"/></g></g>}
  </g>
  <g key={active} className={styles.annotations}>
   {active===1&&<g stroke="#b4a68c" strokeDasharray="3 5"><path className={styles.drawLine} pathLength="1" d="M188 172h-35v180h35M452 172h37v180h-37M250 157v-28h140v28"/><g fill="#cbb797" stroke="none" fontFamily="monospace" fontSize="8"><text x="115" y="269" transform="rotate(-90 115 269)">LAYER 01 / ARMOUR</text><text x="500" y="252" transform="rotate(90 500 252)">LAYER 03 / CORE</text></g></g>}
   {active===2&&<g>{[0,1,2].map(i=><g key={i} className={styles.unlockMark} style={{'--delay':`${.7+i*.3}s`} as CSSProperties} transform={`translate(${273+i*37} 395)`}><rect width="27" height="18" stroke="#ed493d" fill="#171a15"/><path d="m7 9 4 4 9-9" stroke="#e6c4a3"/></g>)}</g>}
   <g stroke="#ef493d" strokeWidth="1.3"><path className={styles.drawLine} pathLength="1" d="M390 198l66-57h122M233 341l-65 48H40"/><circle cx="390" cy="198" r="5" fill="#ed3e32"/><circle className={styles.beacon} cx="390" cy="198" r="12"/><circle cx="233" cy="341" r="5"/></g>
  </g>
  <g fill="#a9a69b" fontFamily="monospace" fontSize="8" letterSpacing="1"><text x="320" y="48" textAnchor="middle">{labels[active]}</text><text x="469" y="130">{['ID / VERIFIED','GEAR ASSEMBLY','BOLTS RELEASED','DOOR / OPEN'][active]}</text><text x="40" y="408">ACCESS POINT 01</text><text x="320" y="518" textAnchor="middle">{['IDENTITY CONFIRMED · CLEARANCE 01','THREE LAYERS · ONE MECHANISM','OVERRIDE COMPLETE · ACCESS GRANTED','ALL CHECKPOINTS CONNECTED'][active]}</text></g>
 </svg>;
}

export default function Briefing(){
 const [active,setActive]=useState(0);const stage=useRef<HTMLDivElement>(null);const current=chapters[active];
 function select(i:number){setActive((i+4)%4);}
 return <section id="briefing" className={styles.briefing} aria-labelledby="briefing-title">
  <div className={styles.container}>
   <div className={styles.topline}><span><i/>01 / THE BRIEFING</span><span>CONFIDENTIAL · FOR YOUR EYES ONLY</span><LockKeyhole size={15}/></div>
   <header className={styles.header}><div><p className={styles.kicker}>A MESSAGE FROM THE PROFESSOR</p><h2 id="briefing-title">Before the chaos.<br/><em>The plan.</em></h2></div><div className={styles.intro}><span className={styles.file}>DOSSIER / CV—02</span><p>This isn’t a job you do alone.<br/>Know the mission. Trust your crew.<br/>Make every move count.</p><span className={styles.instruction}>EXPLORE THE FOUR CHAPTERS <ArrowRight size={15}/></span></div></header>
   <div className={styles.dossier}>
    <div className={styles.visual} onPointerMove={e=>{if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;const r=e.currentTarget.getBoundingClientRect();stage.current?.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/100}deg`);stage.current?.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/100}deg`);}} onPointerLeave={()=>{stage.current?.style.setProperty('--tilt-x','0deg');stage.current?.style.setProperty('--tilt-y','0deg');}}>
     <div className={styles.visualTop}><span><ScanLine size={14}/> OPERATION INTELLIGENCE</span><span>LIVE FEED <i/></span></div>
     <div ref={stage} className={styles.stage}><Blueprint active={active}/><div className={styles.target}><span>OBJECTIVE / 0{active+1}</span><strong>{current.target}</strong></div><span className={styles.stamp}>CLASSIFIED</span></div>
     <div className={styles.visualBottom}><span><i/>{current.status}</span><span>19.0760° N / 72.8777° E</span></div>
    </div>
    <div className={styles.story} id="briefing-story-panel" role="region" aria-label="Selected briefing chapter">
     <div className={styles.storyMeta}><span>TRANSMISSION 0{active+1} / 04</span><span>● DECRYPTED</span></div>
     <div key={active} className={styles.storyBody} aria-live="polite" aria-atomic="true"><p className={styles.chapterLabel}>{current.name}</p><h3>{current.heading}</h3><p className={styles.body}>{current.body}</p><p className={styles.extra}>{current.extra}</p><blockquote><span>“</span>{current.note}<cite>— THE PROFESSOR</cite></blockquote></div>
     <div className={styles.storyFooter}><div className={styles.metric}><strong>{current.metric}</strong><span>{current.unit}</span></div><div className={styles.arrows}><button aria-label="Previous briefing chapter" onClick={()=>select(active-1)}><ArrowLeft size={20}/></button><button aria-label="Next briefing chapter" onClick={()=>select(active+1)}><ArrowRight size={20}/></button></div></div>
    </div>
   </div>
   <div className={styles.chapters} role="group" aria-label="Explore briefing chapters">{chapters.map((chapter,i)=><button key={chapter.name} aria-pressed={active===i} aria-controls="briefing-story-panel" onClick={()=>select(i)}><span className={styles.chapterNumber}>0{i+1}</span><span><small>{chapter.label}</small><strong>{chapter.name}</strong></span><ArrowUpRight size={18}/><span className={styles.progress}/></button>)}</div>
   <footer className={styles.footer}><p>THE BLUEPRINT IS READY. <span>THE NEXT MOVE IS YOURS.</span></p><a href="#crew">ASSEMBLE YOUR CREW <ArrowUpRight size={19}/></a></footer>
  </div>
 </section>;
}
