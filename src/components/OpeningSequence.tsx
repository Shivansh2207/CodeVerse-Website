'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,Volume2,VolumeX} from 'lucide-react';
import styles from './OpeningSequence.module.css';
type Props={onComplete:()=>void;sound:boolean;onToggleSound:()=>void};
const scenes=['INTERCEPTING SECURITY FEED','THE PROFESSOR / PRIVATE CHANNEL','VAULT SECURITY / OVERRIDE','THE CREW IS IN POSITION','DJS CODEAI PRESENTS','WELCOME TO THE OPERATION'];
export default function OpeningSequence({onComplete,sound,onToggleSound}:Props){
 const dialog=useRef<HTMLDialogElement>(null),video=useRef<HTMLVideoElement>(null),done=useRef(onComplete);done.current=onComplete;
 const [phase,setPhase]=useState(0);const finished=useRef(false);const soundtrack=useRef<AudioContext|null>(null);const soundEnabled=useRef(sound);soundEnabled.current=sound;
 function finish(){if(finished.current)return;finished.current=true;dialog.current?.close();done.current();}
 // Optional, synthesized trailer impacts. Audio starts only from a user gesture.
 function impact(heavy=false){const a=soundtrack.current;if(!a||!soundEnabled.current)return;const t=a.currentTime;const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(heavy?105:180,t);o.frequency.exponentialRampToValueAtTime(heavy?28:55,t+.7);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(heavy?.15:.065,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+1.3);o.connect(g);g.connect(a.destination);o.start();o.stop(t+1.4);o.onended=()=>{o.disconnect();g.disconnect();};}
 function toggleAudio(){if(!soundtrack.current)soundtrack.current=new AudioContext();if(sound)soundtrack.current.suspend();else soundtrack.current.resume();onToggleSound();}
 useEffect(()=>{const el=dialog.current!;el.showModal();video.current?.play().catch(()=>{});const motion=matchMedia('(prefers-reduced-motion:reduce)');let raf=0,start=performance.now(),previous=-1,endedAt=0;
  const complete=()=>{if(finished.current)return;finished.current=true;el.close();done.current();};const change=()=>{if(motion.matches)complete();};
  if(motion.matches){complete();return;}
  // Follow decoded video time so text and edits stay aligned on slow connections.
  const tick=(now:number)=>{const v=video.current;const elapsed=(now-start)/1000;if(v?.ended&&!endedAt)endedAt=now;const t=endedAt?8.6+(now-endedAt)/1000:v&&!v.error&&v.currentTime>0?v.currentTime:elapsed;
   const scene=t<2.1?0:t<4.1?1:t<6.8?2:t<8.2?3:t<9.6?4:5;
   el.style.setProperty('--elapsed',String(Math.min(1,t/10.4)));el.style.setProperty('--breach',String(Math.max(0,Math.min(1,(t-4.1)/2.7))));
   if(scene!==previous){previous=scene;setPhase(scene);impact(scene===2||scene===4);}
   if(t>=10.4||elapsed>=16){complete();return;}raf=requestAnimationFrame(tick);
  };raf=requestAnimationFrame(tick);motion.addEventListener('change',change);return()=>{cancelAnimationFrame(raf);motion.removeEventListener('change',change);if(el.open)el.close();};
 },[]);
 useEffect(()=>()=>{soundtrack.current?.close();},[]);
 return <dialog ref={dialog} className={styles.intro} data-phase={phase} aria-label="CodeVerse cinematic introduction" aria-describedby="intro-description" onCancel={e=>{e.preventDefault();finish();}} onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mx',String((e.clientX/r.width-.5)*2));e.currentTarget.style.setProperty('--my',String((e.clientY/r.height-.5)*2));}}>
  <p id="intro-description" className={styles.srOnly}>A ten-second heist film: intercepted surveillance, the Professor, and a vault breach. Skip at any time.</p>
  <video ref={video} className={styles.video} poster="/vault-frames/frame_001.webp" autoPlay muted playsInline preload="auto" aria-hidden="true"><source media="(max-width: 760px)" src="/media/heist-intro-mobile.webm" type="video/webm"/><source src="/media/heist-intro.webm" type="video/webm"/></video>
  <div className={styles.grain}/><div className={styles.shade}/>
  <div className={styles.shutterTop}/><div className={styles.shutterBottom}/>
  <div className={styles.top}><span><i/>CODEAI / CV—02</span><span>09 OCT 2026 · MUMBAI</span><span className={styles.record}>● REC <b>00:00:{['01','03','05','07','09','10'][phase]}</b></span></div>
  {phase===0&&<div className={styles.surveillance}>
   {['01 / PERIMETER','02 / THE MINT','03 / PRIVATE ROOM'].map((label,i)=><div className={styles.feed} key={label}><span>{label}</span><div className={styles.target}><i/><i/><i/><i/><b>{['TRACKING','LOCKED','INTERCEPTED'][i]}</b></div><small>{['19.0760° N / 72.8777° E','SECURITY LEVEL 09','ENCRYPTED CHANNEL'][i]}</small></div>)}
   <div className={styles.intercept}><i/> SIGNAL ACQUIRED <span>3 / 3</span></div>
  </div>}
  {phase===1&&<div className={styles.professor}><span>TRANSMISSION 001 / THE PROFESSOR</span><div className={styles.wave}>{Array.from({length:32},(_,i)=><i key={i} style={{height:8+(i*17)%30,animationDelay:`${i*.04}s`}}/>)}</div><p>“This is where<br/>everything changes.”</p><small>PRIVATE FREQUENCY · 09.10.26</small></div>}
  {phase===2&&<div className={styles.security}><svg viewBox="0 0 400 400" fill="none" aria-hidden="true"><circle cx="200" cy="200" r="188" stroke="currentColor" strokeDasharray="1 12"/><circle className={styles.ring} cx="200" cy="200" r="166" stroke="currentColor" strokeDasharray="190 90 20 80"/><circle className={styles.trace} cx="200" cy="200" r="177" pathLength="1"/><path d="M200 7v35M200 358v35M7 200h35M358 200h35" stroke="currentColor"/>{[0,60,120,180,240,300].map(a=><path key={a} transform={`rotate(${a} 200 200)`} d="M184 52h32l-5 12h-22z" fill="currentColor"/>)}</svg><div className={styles.lockLabel}><span>REMOTE OVERRIDE</span><strong>DISENGAGING<br/>THE LOCK.</strong><div className={styles.lockProgress}/><small>01 / AUTHENTICATE &nbsp; 02 / BREACH</small></div></div>}
  {phase===3&&<div className={styles.crewCaption}><span>THE POINT OF NO RETURN.</span><p>Once you’re in.<br/><em>There’s no going back.</em></p><div><i/> CREW AUTHORIZED / ACCESS GRANTED</div></div>}
  {phase>=4&&<div className={styles.titleCard}><span>DJS CODEAI PRESENTS</span><div className={styles.wordmark}>CODEVERSE <b>2.0</b></div><img src="/media/the-heist-brush.webp" width="620" height="120" alt="The Heist"/><div className={styles.titleRule}/><p>45 CREWS <i/> ONE MINT <i/> YOUR MOVE</p></div>}
  <div className={styles.bottom}><button onClick={toggleAudio} aria-pressed={sound} aria-label={sound?'Mute intro sound':'Enable intro sound'}>{sound?<Volume2 size={16}/>:<VolumeX size={16}/>}<span>{sound?'SOUND ON':'SOUND OFF'}</span></button><div className={styles.scenes}><span>{scenes[phase]}</span><div>{scenes.slice(0,5).map((_,i)=><i key={i} data-active={phase>=i}/>)}</div></div><button autoFocus onClick={finish}>SKIP INTRO <ArrowRight size={17}/></button></div>
 </dialog>;
}

