'use client';

import {useEffect, useRef, useState} from 'react';
import {ArrowDown, ArrowUpRight, Fingerprint, RotateCcw} from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const unlockedRef = useRef(false);
  const [unlocked, setUnlocked] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const section = root.current!;
    const surface = stage.current!;
    const host = canvas.current!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, visible = true, frame = 0, last = 0, elapsed = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0, breach = 0, scroll = 0;
    let scene: Awaited<ReturnType<typeof import('./HeroScene')['createHeroScene']>> | undefined;
    const measure = () => {
      const bounds = section.getBoundingClientRect();
      scroll = reduced.matches ? 0 : Math.max(0, Math.min(1, -bounds.top / Math.max(1, section.offsetHeight - surface.offsetHeight)));
      scene?.resize();
      wake();
    };
    const onScroll = () => {
      const bounds = section.getBoundingClientRect();
      scroll = reduced.matches ? 0 : Math.max(0, Math.min(1, -bounds.top / Math.max(1, section.offsetHeight - surface.offsetHeight)));
      wake();
    };
    const pointer = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || reduced.matches) return;
      const bounds = surface.getBoundingClientRect();
      targetX = (e.clientX - bounds.left) / bounds.width * 2 - 1;
      targetY = (e.clientY - bounds.top) / bounds.height * 2 - 1;
      surface.style.setProperty('--cursor-x', `${e.clientX - bounds.left}px`);
      surface.style.setProperty('--cursor-y', `${e.clientY - bounds.top}px`);
      if ((e.target as Element).closest('a,button')) delete surface.dataset.pointer;
      else surface.dataset.pointer = 'active';
      wake();
    };
    const leave = () => {targetX = targetY = 0; delete surface.dataset.pointer; wake();};
    function tick(now: number) {
      frame = 0;
      if (!visible || document.hidden || disposed) return;
      const dt = Math.min((now - last) / 1000 || .016, .05); last = now;
      if (!reduced.matches) elapsed += dt;
      const ease = reduced.matches ? 1 : 1 - Math.exp(-dt * 5);
      x += (targetX - x) * ease; y += (targetY - y) * ease;
      breach += ((unlockedRef.current ? 1 : 0) - breach) * ease;
      surface.style.setProperty('--hx', x.toFixed(4));
      surface.style.setProperty('--hy', y.toFixed(4));
      surface.style.setProperty('--hp', scroll.toFixed(4));
      surface.style.setProperty('--breach', breach.toFixed(4));
      scene?.render({x, y, progress: scroll, breach, time: elapsed, reduced: reduced.matches});
      if (!reduced.matches) frame = requestAnimationFrame(tick);
    }
    function wake() { if (!frame && visible && !document.hidden && !disposed) frame = requestAnimationFrame(tick); }
    const visibility = () => { if (document.hidden) {cancelAnimationFrame(frame); frame = 0;} else {last = performance.now(); wake();} };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {cancelAnimationFrame(frame); frame = 0;} else {last = performance.now(); wake();}
    });
    observer.observe(section);
    const resize = new ResizeObserver(measure); resize.observe(surface);
    surface.addEventListener('pointermove', pointer);
    surface.addEventListener('pointerleave', leave);
    surface.addEventListener('click', wake);
    window.addEventListener('scroll', onScroll, {passive: true});
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', measure);
    import('./HeroScene').then(({createHeroScene}) => {
      if (disposed) return;
      scene = createHeroScene(host);
      if (scene) surface.dataset.webgl = 'ready';
      measure();
    }).catch(() => {/* The CSS security ring remains available without WebGL. */});
    measure();
    return () => {
      disposed = true; cancelAnimationFrame(frame); scene?.dispose(); observer.disconnect(); resize.disconnect();
      surface.removeEventListener('pointermove', pointer); surface.removeEventListener('pointerleave', leave);
      surface.removeEventListener('click', wake); window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', measure);
    };
  }, []);

  function toggleBreach() {unlockedRef.current = !unlockedRef.current; setUnlocked(unlockedRef.current); setInteracted(true);}

  return <section ref={root} id="home" className={styles.hero} aria-label="CodeVerse recruitment">
    <div ref={stage} className={styles.stage} data-unlocked={unlocked} data-interacted={interacted}>
      <div className={styles.ambient} aria-hidden="true"/>
      <div className={styles.grid} aria-hidden="true"/>
      <div className={styles.giantSerial} aria-hidden="true">CV—02</div>
      <div className={styles.fallbackRing} aria-hidden="true"><i/><i/><i/></div>
      <div ref={canvas} className={styles.scene} aria-hidden="true"/>

      <div className={styles.topline}>
        <span><i/> DJS CODEAI PRESENTS</span>
        <span>AN OPERATION, NOT AN EVENT.</span>
      </div>
      <div className={styles.titleBlock}>
        <div className={styles.brand}>CODEVERSE <span>2.0</span><i>VOL. 02 / MUMBAI</i></div>
        <h1 aria-label="CodeVerse 2.0 — The Heist"><span className={styles.titleTop}>THE<span className={styles.titleStar} aria-hidden="true">✳</span></span><span className={styles.titleMain}>HEIST<span className={styles.titlePeriod}>.</span></span></h1>
        <div className={styles.tagline}><span className={styles.taglineLine}/><p>Every system has a weakness.<br/><strong>You’re about to find it.</strong></p></div>
        <div className={styles.actions}>
          <a className={styles.join} href="#join"><span>Join the crew</span><span className={styles.joinArrow}><ArrowUpRight size={23}/></span></a>
          <a className={styles.discover} href="#briefing">The plan <ArrowDown size={14}/></a>
        </div>
      </div>

      <div className={styles.art} aria-hidden="true">
        <div className={styles.maskFloat}><img src="/media/heist-mask-v2.webp" alt="" width="900" height="1350" fetchPriority="high" draggable="false"/></div>
        <div className={styles.scanLine}/>
      </div>
      <div className={styles.evidence} aria-hidden="true"><span className={styles.evidenceCross}>+</span><span>EXHIBIT 002<br/><b>IDENTITY: UNKNOWN</b></span><i/></div>
      <div className={styles.sideStats}><div><b>45</b><span>CREWS IN</span></div><div><b>01</b><span>WAY OUT</span></div></div>
      <div className={styles.security}>
        <button className={styles.seal} onClick={toggleBreach} aria-pressed={unlocked} aria-label={unlocked ? 'Rearm security' : 'Break the seal'}>
          <span className={styles.sealIcon}>{unlocked ? <RotateCcw size={25}/> : <Fingerprint size={29}/>}</span>
          <span><small>{unlocked ? 'PROTOCOL OVERRIDDEN' : 'SECURITY LEVEL / 03'}</small><strong>{unlocked ? 'REARM SECURITY' : 'BREAK THE SEAL'} <ArrowUpRight size={14}/></strong></span>
        </button>
        <span className={styles.securityStatus} role="status">{unlocked ? 'ACCESS GRANTED. WELCOME TO THE CREW.' : 'YOUR FIRST MOVE STARTS HERE.'}</span>
      </div>
      <div className={styles.reticle} aria-hidden="true"><i/><span>+</span><small>{unlocked ? 'UNLOCKED' : 'TRACKING'}</small></div>
      <div className={styles.bottom}>
        <div className={styles.date}><strong>09.10.26</strong><span>DJSCE / MUMBAI</span></div>
        <div className={styles.bottomMessage}><span className={styles.liveDot}/><span>{unlocked ? 'THE SYSTEM IS YOURS.' : 'NO NAMES. NO PASTS. JUST THE PLAN.'}</span></div>
        <a href="#briefing" className={styles.scrollCue}><span>SCROLL TO BREAK IN</span><span className={styles.scrollArrow}><ArrowDown size={16}/></span></a>
      </div>
      <div className={styles.progress} aria-hidden="true"/>
    </div>
  </section>;
}
