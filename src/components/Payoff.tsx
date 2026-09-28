'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Pause,Play,Fingerprint} from 'lucide-react';
import styles from './Payoff.module.css';
const prizes=[{rank:'01',place:'FIRST CREW OUT',amount:'12,000',status:'THE BIGGEST CUT'},{rank:'02',place:'SECOND CREW OUT',amount:'8,000',status:'SECOND ALLOCATION'},{rank:'03',place:'THIRD CREW OUT',amount:'5,000',status:'THIRD ALLOCATION'}];
function MoneyRain({running}:{running:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null);const active=useRef(running);active.current=running;const control=useRef<()=>void>(()=>{});
 useEffect(()=>{const el=canvas.current!;const ctx=el.getContext('2d');if(!ctx)return;
  const note=document.createElement('canvas');note.width=240;note.height=110;const n=note.getContext('2d')!;
  n.fillStyle='#aaa58b';n.fillRect(0,0,240,110);n.strokeStyle='#4a5443';n.lineWidth=1;n.strokeRect(5,5,230,100);n.strokeRect(9,9,222,92);
  for(let i=0;i<24;i++){n.beginPath();n.ellipse(120,55,20+i*3,13+i*1.55,0,0,Math.PI*2);n.strokeStyle='#64705c66';n.stroke();}
  n.fillStyle='#303f31';n.font='bold 26px Georgia';n.fillText('500',16,40);n.fillText('500',170,89);n.font='7px monospace';n.fillText('CODEVERSE RESERVE',14,19);n.fillText('PROP / THE HEIST',143,99);n.font='bold 29px Georgia';n.fillText('CV',97,65);n.font='6px monospace';n.fillText('CV 091026 002',14,97);
  const crease=n.createLinearGradient(0,0,240,110);crease.addColorStop(0,'#fff0');crease.addColorStop(.46,'#fff0');crease.addColorStop(.5,'#ece7c655');crease.addColorStop(.54,'#0003');crease.addColorStop(1,'#0000');n.fillStyle=crease;n.fillRect(0,0,240,110);
  let w=1,h=1,frame=0,last=0,visible=false;const media=matchMedia('(prefers-reduced-motion: reduce)');
  const notes=Array.from({length:64},(_,i)=>({x:((i*73)%101)/101,y:((i*47)%103)/103,z:.3+((i*31)%71)/100,a:i*1.83,s:i*.71}));
  function resize(){const r=el.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio,2);el.width=w*d;el.height=h*d;ctx!.setTransform(d,0,0,d,0,0);draw(0);}
  function draw(dt:number){ctx!.clearRect(0,0,w,h);const count=w<760?36:64;notes.slice(0,count).forEach((p,i)=>{p.y+=dt*(.035+p.z*.044);p.a+=dt*(.4+p.z);p.s+=dt*.6;if(p.y>1.12){p.y=-.12;p.x=((i*73)%101)/101;}const x=p.x*w+Math.sin(p.s)*45,y=p.y*h;const size=(w<760?34:42)*p.z;ctx!.save();ctx!.translate(x,y);ctx!.rotate(Math.sin(p.a*.6)*1.1);ctx!.transform(Math.cos(p.a),Math.sin(p.a)*.18,.14*Math.sin(p.s),1,0,0);ctx!.globalAlpha=.22+p.z*.46;ctx!.drawImage(note,-size,-size*.23,size*2,size*.92);ctx!.restore();});}
  function tick(now:number){frame=0;if(!visible||!active.current||media.matches)return;const dt=last?Math.min(.04,(now-last)/1000):0;last=now;draw(dt);frame=requestAnimationFrame(tick);}
  function sync(){cancelAnimationFrame(frame);frame=0;last=0;if(visible&&active.current&&!media.matches)frame=requestAnimationFrame(tick);else draw(0);}
  control.current=sync;const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});observer.observe(el);const ro=new ResizeObserver(resize);ro.observe(el);media.addEventListener('change',sync);resize();return()=>{control.current=()=>{};cancelAnimationFrame(frame);observer.disconnect();ro.disconnect();media.removeEventListener('change',sync);};
 },[]);
 useEffect(()=>{control.current();},[running]);
 return <canvas ref={canvas} className={styles.rain} aria-hidden="true"/>;
}
export default function Payoff(){
 const root=useRef<HTMLElement>(null);const [paused,setPaused]=useState(false);
 useEffect(()=>{const el=root.current!;const observer=new IntersectionObserver(([entry])=>{el.dataset.visible=String(entry.isIntersecting);},{threshold:.08});observer.observe(el);return()=>observer.disconnect();},[]);
 return <section ref={root} id="loot" className={styles.section} data-paused={paused} aria-labelledby="payoff-title" onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',String((e.clientX-r.left)/r.width-.5));e.currentTarget.style.setProperty('--my',String((e.clientY-r.top)/r.height-.5));}} onPointerLeave={e=>{e.currentTarget.style.setProperty('--mx','0');e.currentTarget.style.setProperty('--my','0');}}>
  <div className={styles.index}><span><i/>05 / THE PAYOFF</span><span>OPERATION MONEY DROP — MUMBAI</span><button onClick={()=>setPaused(v=>!v)} aria-label={paused?'Resume money drop animation':'Pause money drop animation'} aria-pressed={paused}>{paused?<Play size={12}/>:<Pause size={12}/>}<span>{paused?'RESUME DROP':'PAUSE MOTION'}</span></button></div>
  <div className={styles.scene}>
   <div className={styles.haze}/><div className={styles.moon}/>
   <div className={styles.farShip} aria-hidden="true"><img src="/media/codeai-airship.webp" alt="" width="1500" height="750" loading="lazy"/></div>
   <div className={styles.beam} aria-hidden="true"/><div className={styles.beamTwo} aria-hidden="true"/>
   <div className={styles.airship}><img src="/media/codeai-airship.webp" alt="Charcoal CodeAI airship above the money drop" width="1500" height="750" loading="lazy"/><i className={styles.beacon}/></div>
   <div className={styles.skyline} aria-hidden="true">{Array.from({length:40},(_,i)=><i key={i} style={{height:25+(i*43)%110,width:18+(i*17)%38}}/>)}</div>
   <MoneyRain running={!paused}/>
   <div className={styles.headline}><span>THE CITY LOOKS BETTER<br/>WITH MONEY IN THE AIR.</span><h2 id="payoff-title">MAKE IT<br/><em>RAIN.</em></h2><p>The plan worked.<br/>Now take your cut.</p></div>
   <div className={styles.flightTag}><i/><span>CV—02 / CODEAI AIR DIVISION<small>PAYLOAD RELEASE AUTHORIZED</small></span></div>
   <div className={styles.pool}><span>TOTAL PRIZE POOL / READY FOR RELEASE</span><strong><small>₹</small>25,000</strong><div><i/> THIS IS WHAT WE CAME FOR.</div></div>
   <div className={styles.sceneCaption}><span>19.0760° N &nbsp; 72.8777° E</span><p>Some chase the money.<br/>We change the forecast.</p><span className={styles.rule}/><small>NO LOOSE ENDS. JUST YOUR SHARE.</small></div>
  </div>
  <div className={styles.allocations}>
   <div className={styles.ledgerHeading}><span>THE SPLIT / EVERY CUT EARNED</span><span>03 WINNING CREWS</span></div>
   <div className={styles.splitIntro}><h3>EVERY CREW HAS A ROLE.<br/><em>EVERY WINNER HAS A CUT.</em></h3><p>The risk was shared.<br/>The reward is yours to take.</p></div>
   <div className={styles.distribution}>
    <div className={styles.vaultDial} aria-hidden="true"><svg viewBox="0 0 440 440" fill="none">
     <defs><radialGradient id="payoff-metal"><stop stopColor="#313b32"/><stop offset=".8" stopColor="#101713"/><stop offset="1" stopColor="#202920"/></radialGradient></defs>
     <circle cx="220" cy="220" r="202" stroke="#707b5e33"/><circle cx="220" cy="220" r="189" stroke="#b8b59a55" strokeDasharray="1 9" strokeWidth="6"/>
     {Array.from({length:12},(_,i)=><g key={i} transform={`rotate(${i*30} 220 220)`}><path d="M220 15v18" stroke="#77816c"/><circle cx="220" cy="49" r="3" fill="#758168"/></g>)}
     <circle cx="220" cy="220" r="149" fill="url(#payoff-metal)" stroke="#68755a66"/>
     {[{share:48,start:0},{share:32,start:48},{share:20,start:80}].map(({share,start},i)=><circle key={i} className={styles.dialArc} data-cut={i} cx="220" cy="220" r="164" pathLength="100" strokeWidth="16" strokeDasharray={`${share-1.4} ${101.4-share}`} strokeDashoffset={-start} transform="rotate(-90 220 220)"/>)}
     <circle cx="220" cy="220" r="129" stroke="#81906e33" strokeDasharray="2 5"/>
     <path d="M204 88h32M204 352h32M88 204v32M352 204v32" stroke="#7e886555"/>
     <text x="220" y="166" textAnchor="middle" className={styles.dialLabel}>THE ENTIRE TAKE</text><text x="220" y="231" textAnchor="middle" className={styles.dialTotal}>₹25,000</text><path d="M197 252h46" stroke="#d44b36"/><text x="220" y="282" textAnchor="middle" className={styles.dialLabel}>3 CREWS · 100% EARNED</text>
    </svg><div className={styles.dialCaption}><i/> ALLOCATION LOCKED <span>CV—0910</span></div></div>
    <div className={styles.cutList}>{prizes.map(({rank,place,amount},i)=><article key={rank} className={styles.cutRow} data-cut={i}><span className={styles.cutNumber}>{rank}</span><div className={styles.cutBody}><div className={styles.cutTop}><span>{place}</span><span>{[48,32,20][i]}% OF THE TAKE</span></div><div className={styles.cutAmount}><strong><small>₹</small>{amount}</strong><span>+ TROPHY<ArrowUpRight size={16}/></span></div><div className={styles.cutTrack}><i style={{width:`${[48,32,20][i]}%`}}/></div></div></article>)}</div>
   </div>
   <footer className={styles.rewardFooter}><div className={styles.certificateMark}><Fingerprint size={34}/><span>PROOF<br/>OF THE HEIST</span></div><div className={styles.certificateCopy}><span>EVERY OPERATIVE LEAVES A MARK.</span><p>E-certificate for<br/><strong>every participant.</strong></p></div><a href="#crew"><span>YOUR CUT STARTS WITH YOUR CREW.</span><b>GET YOUR CREW IN <ArrowUpRight size={23}/></b></a></footer>
  </div>
 </section>;
}
