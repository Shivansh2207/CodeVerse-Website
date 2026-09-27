'use client';
import { useEffect, useRef } from 'react';

export default function VaultReveal() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const act = sectionRef.current;
    const mount = mountRef.current;
    if (!act || !mount) return;

    const updateState = () => {
      const p = Number(act.style.getPropertyValue('--sc-p') || 0);
      const frame = Math.min(86, Math.max(1, Math.round(1 + p * 85)));
      mount.setAttribute('data-sc-verify-state', `door:-${(p * 2.05).toFixed(2)};frame:${frame}`);
    };

    const mo = new MutationObserver(updateState);
    mo.observe(act, { attributes: true, attributeFilter: ['style'] });
    updateState();

    return () => mo.disconnect();
  }, []);

  return (
    <>
      <div className="vault-prelude">
        <span className="mono">THE JOB WAS NEVER ABOUT GETTING IN.</span>
        <p>
          It was about<br />
          <em>getting out.</em>
        </p>
        <div className="red-thread" />
      </div>

      <section
        ref={sectionRef}
        id="vault"
        className="vault"
        data-sc-act="pin"
        data-sc-span="2.8"
      >
        <div data-sc-stage className="vault-stage">
          {/* ScrollCraft native image sequence canvas */}
          <div className="vault-canvas" ref={mountRef} role="img" aria-label="Vault unlocking sequence frame animation">
            <img className="vault-sequence-poster" src="/vault-frames/frame_086.webp" alt="" loading="lazy" aria-hidden="true" />
            <canvas
              className="vault-sequence-canvas"
              data-sc-sequence="/vault-frames/frame_{iii}.webp:86:1"
            />
          </div>

          {/* Top Status Header - active during early unlocking phase */}
          <div className="vault-head" data-sc-cue="0 0.42">
            <span className="mono">VAULT 0910 / SECURITY LEVEL 03</span>
            <span className="mono red">SCROLL TO UNLOCK</span>
          </div>

          {/* Central Reward Overlay - reveals as the vault unlocks and holds */}
          <div className="vault-reward" data-sc-cue="0.55">
            <span className="mono">ACCESS GRANTED</span>
            <strong>₹25,000</strong>
            <p>THE LOOT IS YOURS TO TAKE.</p>
          </div>

          {/* Bottom Security Telemetry */}
          <div className="vault-bottom" data-sc-cue="0 1.0">
            <span>MECHANICAL LOCK / CV—2.0</span>
            <div className="lock-progress">
              <i /><i /><i /><i /><i />
            </div>
            <span>THE PROFESSOR’S FINAL MOVE</span>
          </div>
        </div>
      </section>
    </>
  );
}
