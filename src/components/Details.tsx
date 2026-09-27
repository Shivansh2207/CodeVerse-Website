'use client';
import {useState} from 'react';
import {ArrowDownToLine,ArrowUpRight,Plus,Minus} from 'lucide-react';
import {event,schedule,currentSlot} from '@/config/event';
import {useClock,Registration,ShareButton} from './Experience';
const files=[{name:'Crew protocol',title:'TWO OR THREE. ONE CREW.',text:'Nobody goes in alone, and nobody brings a fourth. A minimum of two and a maximum of three members per crew. A maximum of 45 crews enter. Open to everyone: any college, any branch, any level.'},{name:'Your equipment',title:'BRING YOUR OWN TOOLS.',text:'Bring your laptop, laptop charger and college ID. Be through the door on time. Registration starts at 08:00 on 9 October.'},{name:'Code of conduct',title:'KEEP IT ORIGINAL.',text:'Original work only. No plagiarism. No one gets hurt. Respect fellow crews and the event team. The full operational briefing happens on event day.'},{name:'Qualification',title:'FORTY-FIVE BECOME TEN.',text:'The top 10 crews from Phase 1 advance to Phase 2. In Phase 2, the first crew to collect every hint wins. Task details remain classified until the briefing.'},{name:'The loot',title:'MAKE IT COUNT.',text:'INR 25,000 in total prizes. First: INR 12,000. Second: INR 8,000. Third: INR 5,000. Trophies for the top three, and an e-certificate for every participant.'}];
export function Rules() {
  const [active, setActive] = useState(0);

  return (
    <section id="rules" className="rules section">
      <div className="section-index">
        <span>READ BEFORE YOU ENTER</span>
        <span className="mono">PUBLIC BRIEF / REV 2.0</span>
      </div>

      <div className="rules-title">
        <div className="rules-title-text">
          <span className="rules-kicker mono">CONFIDENTIAL OPERATION DOSSIER</span>
          <h2>
            The Professor’s<br />
            <em>rulebook.</em>
          </h2>
        </div>
        <a href="/documents/codeverse-rulebook.pdf" className="document-download-button mono" download>
          <span>DOWNLOAD RULEBOOK</span>
          <ArrowDownToLine size={15} />
        </a>
      </div>

      <div className="dossier">
        <div className="dossier-tabs" role="tablist" aria-label="Rulebook files">
          {files.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              id={`file-tab-${i}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              aria-controls="file-panel"
              onKeyDown={e => {
                let next = active;
                if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % files.length;
                else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active + files.length - 1) % files.length;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = files.length - 1;
                else return;
                e.preventDefault();
                setActive(next);
                document.getElementById(`file-tab-${next}`)?.focus();
              }}
              onClick={() => setActive(i)}
            >
              <span className="mono">FILE 0{i + 1}</span>
              <span className="tab-label">{f.name}</span>
              <ArrowUpRight size={15} className="tab-arrow" />
            </button>
          ))}
        </div>

        <div className="dossier-paper" role="tabpanel" id="file-panel" aria-labelledby={`file-tab-${active}`}>
          <div className="paper-header">
            <span className="mono">OPERATION CODEVERSE / PUBLIC INTELLIGENCE</span>
            <span className="mono paper-reg-mark">DOC-REF: CV2-0{active + 1}</span>
          </div>

          <h3 className="paper-title">{files[active].title}</h3>
          <p className="paper-text">{files[active].text}</p>

          <div className="paper-footer">
            <span className="classified-tag mono">APPROVED FOR RELEASE</span>
            <b className="mono">DJS CODEAI</b>
          </div>
        </div>
      </div>

      <noscript>
        <div className="no-script-rules">
          {files.slice(1).map(f => (
            <article key={f.name}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </noscript>

      <div className="faq">
        <div className="faq-heading-wrap">
          <span className="mono faq-kicker">SECURITY CLEARANCE Q&amp;A</span>
          <h3>
            A few things<br />
            before you go in.
          </h3>
        </div>
        <div className="faq-list">
          {[
            ['How do I register?', 'Registration runs on Unstop from 29 September to 6 October. Form a team of two or three. The event team will provide the final registration link.'],
            ['Is there a registration fee?', `Yes. ₹${event.fee} registration fee. ${event.feeBasis ? `The fee is per ${event.feeBasis}.` : 'Whether this is per person or per crew is still to be confirmed. Contact the organizers before paying.'}`],
            ['Can beginners join?', 'Yes. Everyone is welcome, regardless of college, branch or experience.'],
            ['Where does the heist happen?', `${event.venue}, ${event.address}, on 9 October 2026.`]
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                <span>{q}</span>
                <Plus size={16} className="faq-icon" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Timeline() {
  const now = useClock();
  const active = now === null ? -1 : currentSlot(now);

  return (
    <section id="schedule" className="timeline section">
      <div className="section-index">
        <span>MISSION TIMELINE</span>
        <span className="mono">09 OCTOBER 2026 / IST</span>
      </div>

      <div className="timeline-layout">
        <div className="timeline-title">
          <span className="timeline-kicker mono">SYNCHRONIZE WATCHES</span>
          <h2>
            Ten hours.<br />
            <em>Make history.</em>
          </h2>
          <p>Crews of two or three. Be through the door on time.</p>
          <div className="timeline-actions">
            <a className="timeline-action-button mono" href="/documents/codeverse.ics" download>
              <span>Add to calendar</span>
              <ArrowDownToLine size={15} />
            </a>
            <a className="timeline-action-button mono" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=CodeVerse+2.0+The+Heist&dates=20261009T023000Z%2F20261009T123000Z&location=Dwarkadas+J.+Sanghvi+College+of+Engineering+Mumbai&details=Teams+of+2-3.+Registration+required.+DJS+CODEAI." target="_blank" rel="noreferrer">
              <span>Google Calendar</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <ol className="timeline-track">
          {schedule.map(([start, end, title, sub], i) => {
            const isPhase = i === 2 || i === 4;
            const isLive = i === active;

            return (
              <li key={start} className={`timeline-checkpoint ${isPhase ? 'phase-checkpoint ' : ''}${isLive ? 'live-checkpoint' : ''}`}>
                <div className="checkpoint-marker" aria-hidden="true">
                  <span className="checkpoint-index mono">0{i + 1}</span>
                  <span className="checkpoint-dot" />
                </div>
                <div className="checkpoint-content">
                  <div className="checkpoint-meta">
                    <time className="mono">{start} — {end}</time>
                    {isPhase && <span className="phase-tag mono">{i === 2 ? 'PHASE 01' : 'PHASE 02'}</span>}
                    {isLive && <span className="live-tag mono">LIVE NOW</span>}
                  </div>
                  <h3>{title}</h3>
                  <p>{sub}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
export function Venue() {
  return (
    <section id="venue" className="venue section">
      <div className="section-index">
        <span>TARGET RECONNAISSANCE</span>
        <span className="mono">SCHEMATIC / NOT TO SCALE</span>
      </div>

      <div className="venue-layout">
        <div className="target-blueprint-frame">
          <div className="target-blueprint" aria-hidden="true">
            <div className="blueprint-grid" />
            <div className="blueprint-crosshair-tl mono">+</div>
            <div className="blueprint-crosshair-tr mono">+</div>
            <div className="blueprint-crosshair-bl mono">+</div>
            <div className="blueprint-crosshair-br mono">+</div>

            <div className="city-grid">
              {Array.from({ length: 24 }, (_, i) => (
                <i key={i} style={{ height: `${32 + ((i * 17) % 75)}px` }} />
              ))}
            </div>

            <div className="target-marker-wrap">
              <div className="target-pulse-ring" />
              <div className="target-dashed-ring" />
              <div className="target-crosshair-center">+</div>
              <span className="target-coord-tag mono">19.1075° N, 72.8372° E</span>
            </div>

            <div className="blueprint-telemetry-top mono">
              <span className="telemetry-item">SEC // 07 — VILE PARLE</span>
              <span className="telemetry-live"><i /> TARGET ACQUIRED</span>
            </div>

            <div className="target-label mono">
              <strong>TARGET ACQUIRED</strong>
              <span>DJSCE / MUMBAI</span>
            </div>

            <span className="map-small mono">SCHEMATIC / NOT TO SCALE</span>
          </div>
        </div>

        <div className="venue-copy">
          <div className="venue-header">
            <span className="venue-kicker mono">THE TARGET IS REAL.</span>
            <h2>
              THE MINT.<br />
              <em>MUMBAI.</em>
            </h2>
          </div>

          <div className="venue-dossier">
            <div className="venue-dossier-row">
              <span className="venue-dossier-label mono">TARGET FACILITY</span>
              <h3 className="venue-venue-name">{event.venue}</h3>
            </div>
            <div className="venue-dossier-row">
              <span className="venue-dossier-label mono">SURFACE ADDRESS</span>
              <p className="venue-address-text">{event.address}</p>
            </div>
            <div className="venue-dossier-row venue-time-row">
              <span className="venue-dossier-label mono">OPERATIONAL COMMENCEMENT</span>
              <p className="venue-time-highlight mono">
                <span className="live-dot" />
                9 October · Registration desk opens at 08:00.
              </p>
            </div>
          </div>

          <div className="venue-actions">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="venue-open-button mono"
            >
              <span>Open location</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Closing(){return <><section id="join" className="closing section"><div className="closing-art" aria-hidden="true"/><div className="closing-copy"><span className="mono">THE PROFESSOR HAS A PLAN.</span><h2>ALL HE NEEDS<br/>IS <em>YOUR CREW.</em></h2><p>09 OCTOBER 2026 · DJSCE, MUMBAI</p><ShareButton/></div><Registration/></section><footer className="footer"><div className="footer-top"><a href="#home" className="logo"><img src="/media/codeai-original.png" alt="DJS CodeAI" width="180" height="52"/></a><p>Bella ciao.</p><a href={event.instagram} target="_blank" rel="noreferrer">@DJSCODEAI <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© 2026 DJS CODEAI. A fan-inspired event theme.<br/>Not affiliated with Netflix.</span><nav><a href="#briefing">Briefing</a><a href="#plan">Plan</a><a href="#schedule">Schedule</a><a href="#rules">Rules</a></nav><div>Questions? {event.contact}<br/><a href="tel:+919819486535">{event.phone}</a> · <a href={event.whatsapp}>WhatsApp ↗</a></div></div></footer></>;}
