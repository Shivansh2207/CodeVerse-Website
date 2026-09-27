'use client';

import { useEffect, useRef, useState } from 'react';

export default function Payoff() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [amounts, setAmounts] = useState({ p1: 0, p2: 0, p3: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setHasAnimated(true);
      setAmounts({ p1: 12000, p2: 8000, p3: 5000 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 1500; // ms
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth cubic ease out
            const ease = 1 - Math.pow(1 - progress, 3);

            setAmounts({
              p1: Math.round(12000 * ease),
              p2: Math.round(8000 * ease),
              p3: Math.round(5000 * ease),
            });

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="loot" ref={sectionRef} className="loot section">
      <div className="section-index">
        <span>THE PAYOFF</span>
        <span className="mono">INVENTORY / ₹25,000</span>
      </div>

      <div className="loot-hero">
        <div className="loot-title">
          <h2>
            HIGH STAKES.<br />
            <em>HIGHER REWARDS.</em>
          </h2>
        </div>
        <div className="loot-briefing">
          <p>
            Not just bragging rights.<br />
            Something worth getting out for.
          </p>
        </div>
      </div>

      <div className="prize-lineup">
        {/* Card 1 - FIRST CREW OUT (AUTHORIZED Hero Panel) */}
        <div className="prize prize-dominant">
          <div className="prize-header">
            <span className="mono">FIRST CREW OUT</span>
            <span className="prize-badge badge-authorized">AUTHORIZED</span>
          </div>
          <div className="prize-body">
            <span className="prize-ghost" aria-hidden="true">01</span>
            <strong className="prize-amount dominant-amount">
              ₹{amounts.p1.toLocaleString('en-IN')}
            </strong>
          </div>
          <div className="prize-footer">
            <span className="prize-trophy"><span className="trophy-plus">+</span> TROPHY</span>
          </div>
        </div>

        {/* Card 2 - SECOND CREW OUT */}
        <div className="prize prize-tier-2">
          <div className="prize-header">
            <span className="mono">SECOND CREW OUT</span>
            <span className="prize-badge badge-cleared">CLEARED</span>
          </div>
          <div className="prize-body">
            <span className="prize-ghost" aria-hidden="true">02</span>
            <strong className="prize-amount tier-2-amount">
              ₹{amounts.p2.toLocaleString('en-IN')}
            </strong>
          </div>
          <div className="prize-footer">
            <span className="prize-trophy"><span className="trophy-plus">+</span> TROPHY</span>
          </div>
        </div>

        {/* Card 3 - THIRD CREW OUT */}
        <div className="prize prize-tier-3">
          <div className="prize-header">
            <span className="mono">THIRD CREW OUT</span>
            <span className="prize-badge badge-cleared">CLEARED</span>
          </div>
          <div className="prize-body">
            <span className="prize-ghost" aria-hidden="true">03</span>
            <strong className="prize-amount tier-3-amount">
              ₹{amounts.p3.toLocaleString('en-IN')}
            </strong>
          </div>
          <div className="prize-footer">
            <span className="prize-trophy"><span className="trophy-plus">+</span> TROPHY</span>
          </div>
        </div>
      </div>

      <div className="loot-bottom">
        <p className="certificate">EVERY OPERATIVE LEAVES WITH AN E-CERTIFICATE.</p>
      </div>
    </section>
  );
}

