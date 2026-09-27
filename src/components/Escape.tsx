'use client';
import {useEffect,useId,useRef,useState} from 'react';
import {ArrowDown,ArrowUpRight,Navigation,Radio,Flag,ScanLine} from 'lucide-react';
import styles from './Escape.module.css';
const route='M110 480H260V350H490V195H740V360H880';
const stops=[{x:260,y:350,at:.23,label:'CHECKPOINT 01',title:'Find the thread.',text:'Follow the trail. Every hint brings your crew closer to the way out.'},{x:490,y:195,at:.55,label:'CHECKPOINT 02',title:'Connect the clues.',text:'Think together. The next move depends on what your crew can piece together.'},{x:740,y:360,at:.86,label:'CHECKPOINT 03',title:'Keep your crew moving.',text:'Stay sharp. Keep collecting hints and work your way toward extraction.'},{x:880,y:360,at:.98,label:'FINAL EXTRACTION',title:'Every hint. Then freedom.',text:'The first crew to collect every hint wins. Finish the trail. Finish the heist.'}];
const blocks=Array.from({length:8},(_,col)=>Array.from({length:5},(_,row)=>({x:100+col*105,y:110+row*83,w:55+(col*7+row*3)%22,h:35+(row*7)%20,lift:9+(col*11+row*7)%22}))).flat().filter(({x,y})=>!(y>425&&x<310)&&!(x>215&&x<290)&&!(y>275&&y<375&&x>220&&x<515)&&!(x>445&&x<510)&&!(y<210&&x>470&&x<775)&&!(x>705&&x<775));
export function Escape(){
 const section=useRef<HTMLElement>(null),path=useRef<SVGPathElement>(null),marker=useRef<SVGGElement>(null);const [active,setActive]=useState(0);const uid=useId().replace(/:/g,'');
 useEffect(()=>{const el=section.current!,line=path.current!,dot=marker.current!;const media=matchMedia('(prefers-reduced-motion:reduce)');const length=line.getTotalLength();const update=()=>{const raw=Number(el.style.getPropertyValue('--sc-p')||0);const p=media.matches?1:Math.max(0,Math.min(1,(raw-.035)/.9));const point=line.getPointAtLength(length*p);dot.setAttribute('transform',`translate(${point.x} ${point.y})`);const phase=p>=.98?3:p>=.55?2:p>=.23?1:0;setActive(phase);};const observer=new MutationObserver(update);observer.observe(el,{attributes:true,attributeFilter:['style']});media.addEventListener('change',update);update();return()=>{observer.disconnect();media.removeEventListener('change',update);};},[]);
 const complete=active===3;const current=stops[active];
 return <section ref={section} id="escape" className={`escape ${styles.section}`} data-sc-act="pin" data-sc-span="1.8" data-complete={complete} aria-labelledby="escape-title">
  <div data-sc-stage className={styles.stage}>
   <div className={styles.topline}><span><i/>PHASE 02 / 14:30—16:30 IST</span><span>EXTRACTION PROTOCOL · 10 CREWS</span><Radio size={14}/></div>
   <header className={styles.header}><h2 id="escape-title">The Escape<span>.</span></h2><p>You’re out of the Mint.<br/><strong>You’re not out of trouble.</strong></p><div className={styles.phaseTime}><span>PHASE 02 / EVENT TIME</span><strong><time>14:30</time><b>—</b><time>16:30</time><small>IST</small></strong></div></header>
   <div className={styles.operation}>
    <aside className={styles.intel}>
     <div className={styles.channel}><Radio size={14}/><span>THE PROFESSOR / SECURE CHANNEL</span></div>
     <div className={styles.message} key={active}><span className={styles.messageLabel}>{current.label}</span><h3>{current.title}</h3><p>{current.text}</p></div>
     <div className={styles.checkpoints} aria-label="Escape sequence">{stops.map((s,i)=><div key={s.label} data-active={active===i} data-cleared={active>i||complete}><span>{active>i||complete?'✓':`0${i+1}`}</span><div><strong>{i===3?'EXTRACTION':`CHECKPOINT 0${i+1}`}</strong><small>{active>i||complete?'ROUTE TRACED':active===i?'FOLLOW THE TRAIL':'AHEAD'}</small></div>{i===3?<Flag size={14}/>:<ArrowUpRight size={14}/>}</div>)}</div>
     <p className={styles.rule}><span>THE WINNING CONDITION</span>First crew to collect every hint wins.</p>
    </aside>
    <div className={styles.mapPanel}>
     <div className={styles.mapHeader}><span><ScanLine size={13}/> EXTRACTION OVERVIEW</span><span>ROUTE / CV—02</span></div>
     <div className={styles.viewport}>
      <svg className={styles.city} viewBox="0 0 1000 620" fill="none" aria-hidden="true">
       <defs><pattern id={`${uid}-grid`} width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" stroke="#a8af8b" strokeOpacity=".09"/></pattern><linearGradient id={`${uid}-roof`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#57604b"/><stop offset="1" stopColor="#242f23"/></linearGradient></defs>
       <rect width="1000" height="620" fill="#111b15"/><rect width="1000" height="620" fill={`url(#${uid}-grid)`}/>
       <path d="M0 540C180 495 280 560 475 527S750 470 1000 531V620H0Z" fill="#091710"/>{[0,1,2,3].map(i=><path key={i} d={`M0 ${550+i*15}C180 ${505+i*15} 280 ${570+i*15} 475 ${537+i*15}S750 ${480+i*15} 1000 ${541+i*15}`} stroke="#5d7d6825"/>)}
       <g stroke="#87927b" strokeOpacity=".13" strokeWidth="17"><path d="M55 92H930M55 260H930M55 430H930M180 75v440M390 75v440M610 75v440M820 75v440"/></g>
       <path d={route} stroke="#060e09" strokeWidth="27"/><path d={route} stroke="#74826744" strokeWidth="1" strokeDasharray="3 9"/>
       <g>{blocks.map(({x,y,w,h,lift},i)=><g key={i} className={styles.building}><path d={`M${x} ${y}h${w}v${h}H${x}z`} fill="#060d08" opacity=".6" transform="translate(8 8)"/><path d={`M${x} ${y}v${-lift}h${w}v${h}l-8 ${lift}H${x}z`} fill="#243024" stroke="#69725955"/><path d={`M${x} ${y-lift}h${w}v${h}H${x}z`} fill={`url(#${uid}-roof)`} stroke="#a7a27c55"/><path d={`M${x+6} ${y-lift+6}h${w-12}v${h-12}H${x+6}z`} stroke="#d3bd822b"/><path d={`M${x+w} ${y-lift+h}l-8 ${lift}M${x} ${y+h}v${-lift}`} stroke="#bdba8155"/>{i%3===0&&<rect x={x+12} y={y-lift+11} width={w/3} height={h/3} fill="#c7bb7844"/>}</g>)}</g>
       <g fontFamily="monospace" fontSize="10" letterSpacing="2" fill="#819477"><text x="76" y="63">SECTOR A / THE MINT</text><text x="635" y="63">SECTOR B / OUTER PERIMETER</text><text x="375" y="591">SOUTH WATERWAY</text><text x="74" y="570">N ↑</text></g>
       <path className={styles.routeGlow} d={route} pathLength="1" stroke="#f14f3b" strokeWidth="13" strokeOpacity=".13"/><path ref={path} className={styles.route} d={route} pathLength="1" stroke="#f46147" strokeWidth="3" strokeLinejoin="round"/>
       <g transform="translate(110 480)"><rect x="-22" y="-22" width="44" height="44" fill="#1c261c" stroke="#a39771"/><path d="M-11 11v-20h22v20M-15 11h30M-5 11V-3h10v14" stroke="#c9b48d"/><text x="-26" y="44" fill="#b7b596" fontFamily="monospace" fontSize="10">THE MINT</text></g>
       {stops.map(({x,y,label},i)=><g key={label} className={styles.mapNode} data-active={active>=i} transform={`translate(${x} ${y})`}><circle r="23" fill="#0d1810" stroke="#7c8868"/><circle className={styles.nodeRing} r="32" stroke="#d45a3c" strokeOpacity=".3"/><circle r="6" fill="currentColor"/><path d="M-30 0h-7M30 0h7M0-30v-7M0 30v7" stroke="currentColor"/><g transform={`translate(${i===3?-102:30} ${i===2?47:-51})`}><rect x="-7" y="-15" width={i===3?119:119} height="28" fill="#101a13" stroke="#89937444"/><text fill="currentColor" fontFamily="monospace" fontSize="9" letterSpacing=".7">{i===3?'EXTRACTION':`CHECKPOINT 0${i+1}`}</text></g></g>)}
       <g ref={marker} className={styles.marker} transform="translate(110 480)"><circle r="15" stroke="#f9c59b" strokeOpacity=".5"/><circle r="6" fill="#fff1d1"/><circle r="3" fill="#f25a40"/></g>
      </svg>
      <div className={styles.mapVignette}/>
     </div>
     <div className={styles.mapFooter}><span><Navigation size={12}/>{complete?'EXTRACTION REACHED':'FOLLOW THE RED THREAD'}</span><span>SCROLL TO TRACE THE ESCAPE <ArrowDown size={12}/></span></div>
    </div>
   </div>
   <footer className={styles.footer}><span>ILLUSTRATIVE ROUTE / ACTUAL LOCATIONS AND HINTS REVEALED ON EVENT DAY.</span><a href="#vault">THE NEXT STOP / THE VAULT <ArrowUpRight size={16}/></a></footer>
  </div>
 </section>;
}
