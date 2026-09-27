'use client';
import { useEffect, useRef, useState } from 'react';
import { Download, RefreshCw, Share2, Fingerprint, ArrowUpRight, Check, ShieldAlert } from 'lucide-react';
import { shareMessage } from '@/config/event';
import { share } from './Experience';

export interface CityCodename {
  name: string;
  code: string;
  cityCode: string;
}

export const CITY_CODENAMES: CityCodename[] = [
  { name: 'TOKYO', code: 'TK', cityCode: 'TK-01' },
  { name: 'BERLIN', code: 'BL', cityCode: 'BL-02' },
  { name: 'NAIROBI', code: 'NB', cityCode: 'NB-03' },
  { name: 'DENVER', code: 'DN', cityCode: 'DN-04' },
  { name: 'RIO', code: 'RIO', cityCode: 'RIO-05' },
  { name: 'HELSINKI', code: 'HK', cityCode: 'HK-06' },
  { name: 'MOSCOW', code: 'MS', cityCode: 'MS-07' },
  { name: 'OSLO', code: 'OS', cityCode: 'OS-08' },
  { name: 'STOCKHOLM', code: 'ST', cityCode: 'ST-09' },
  { name: 'PALERMO', code: 'PL', cityCode: 'PL-10' },
  { name: 'LISBON', code: 'LS', cityCode: 'LS-11' },
];

export default function CrewId() {
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState<{
    name: string;
    code: string;
    cityCode: string;
    id: string;
  } | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('IDENTITY SCANNING...');
  const card = useRef<HTMLDivElement>(null);

  const scanTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => scanTimers.current.forEach(clearTimeout), []);

  function assign() {
    const clean = name.trim();
    if (!clean) {
      setMessage('ENTER YOUR NAME TO GENERATE YOUR OPERATIVE FILE.');
      return;
    }

    scanTimers.current.forEach(clearTimeout);
    scanTimers.current = [];
    setMessage('');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setScanning(!reduced);
    setScanStepText('IDENTITY SCANNING...');

    const pool = CITY_CODENAMES.filter(c => c.name !== identity?.code);
    const values = crypto.getRandomValues(new Uint32Array(2));
    const chosen = pool[values[0] % pool.length];
    const hexNum = (1000 + (values[1] % 9000)).toString();
    const generatedId = `CV2-${chosen.code}-${hexNum}`;

    // Set identity immediately so state & accessibility queries are immediately active
    setIdentity({
      name: clean,
      code: chosen.name,
      cityCode: chosen.cityCode,
      id: generatedId
    });

    if (reduced) {
      setMessage(`IDENTITY VERIFIED · CODENAME ASSIGNED: ${chosen.name}`);
      return;
    }

    // Cancel previous scans so rapid rerolls cannot display a stale codename.
    scanTimers.current.push(setTimeout(() => {
      setScanStepText('SECURE CHANNEL CONNECTED...');
    }, 300));

    scanTimers.current.push(setTimeout(() => {
      setScanStepText('ASSIGNING CODENAME...');
    }, 650));

    scanTimers.current.push(setTimeout(() => {
      setScanStepText('IDENTITY VERIFIED · ACCESS GRANTED');
      setMessage(`IDENTITY VERIFIED · CODENAME ASSIGNED: ${chosen.name}`);
    }, 1000));

    scanTimers.current.push(setTimeout(() => {
      setScanning(false);
    }, 1350));
  }

  async function makeCard() {
    if (!identity) return null;
    await document.fonts.ready;
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 760;
    const c = canvas.getContext('2d')!;

    // Background & Outer Frame
    c.fillStyle = '#0a0d0b';
    c.fillRect(0, 0, 1200, 760);

    // Subtle background tactical grid
    c.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    c.lineWidth = 1;
    for (let x = 40; x < 1200; x += 40) {
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x, 760);
      c.stroke();
    }
    for (let y = 40; y < 760; y += 40) {
      c.beginPath();
      c.moveTo(0, y);
      c.lineTo(1200, y);
      c.stroke();
    }

    // Card frame
    c.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    c.lineWidth = 2;
    c.strokeRect(30, 30, 1140, 700);

    // Crimson Top Header Accent Bar
    c.fillStyle = '#dc2626';
    c.fillRect(30, 30, 1140, 10);

    // Header Classification Tag
    c.fillStyle = 'rgba(220, 38, 38, 0.15)';
    c.fillRect(55, 55, 140, 32);
    c.strokeStyle = '#dc2626';
    c.lineWidth = 1.5;
    c.strokeRect(55, 55, 140, 32);

    c.fillStyle = '#dc2626';
    c.font = 'bold 15px "IBM Plex Mono", monospace';
    c.fillText('CLASSIFIED', 78, 77);

    c.fillStyle = '#8f9b88';
    c.font = '14px "IBM Plex Mono", monospace';
    c.fillText('OPERATIVE FILE // SECURE CHANNEL', 220, 77);
    c.fillText('OPERATION CODEVERSE 2.0', 820, 77);

    // Divider
    c.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    c.beginPath();
    c.moveTo(55, 110);
    c.lineTo(1145, 110);
    c.stroke();

    // Codename Hero Area
    c.fillStyle = '#8f9b88';
    c.font = '13px "IBM Plex Mono", monospace';
    c.fillText(`ASSIGNED CODENAME // OPERATIVE CODE ${identity.cityCode}`, 55, 150);

    c.fillStyle = '#f0ede6';
    c.font = 'bold 96px "Barlow Condensed", "Bebas Neue", sans-serif';
    c.fillText(identity.code, 50, 245);

    // Clearance Badge
    c.fillStyle = 'rgba(220, 38, 38, 0.2)';
    c.fillRect(55, 275, 220, 30);
    c.strokeStyle = 'rgba(220, 38, 38, 0.6)';
    c.strokeRect(55, 275, 220, 30);
    c.fillStyle = '#dc2626';
    c.font = 'bold 13px "IBM Plex Mono", monospace';
    c.fillText('CLEARANCE: LEVEL 03', 70, 296);

    // Operative Info Grid
    c.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    c.strokeRect(55, 335, 1090, 210);

    // Row 1: Real Name & Operative ID
    c.fillStyle = '#8f9b88';
    c.font = '12px "IBM Plex Mono", monospace';
    c.fillText('OPERATIVE NAME', 85, 375);
    c.fillText('OPERATIVE ID', 640, 375);

    c.fillStyle = '#f0ede6';
    let size = 32;
    c.font = `bold ${size}px "IBM Plex Mono", monospace`;
    while (c.measureText(identity.name.toUpperCase()).width > 480 && size > 16) {
      size--;
      c.font = `bold ${size}px "IBM Plex Mono", monospace`;
    }
    c.fillText(identity.name.toUpperCase(), 85, 420);

    c.fillStyle = '#f0ede6';
    c.font = 'bold 26px "IBM Plex Mono", monospace';
    c.fillText(identity.id, 640, 420);

    // Row 2: Mission, Status & Location
    c.fillStyle = '#8f9b88';
    c.font = '12px "IBM Plex Mono", monospace';
    c.fillText('MISSION', 85, 475);
    c.fillText('STATUS', 360, 475);
    c.fillText('LOCATION', 640, 475);

    c.fillStyle = '#f0ede6';
    c.font = '18px "IBM Plex Mono", monospace';
    c.fillText('THE HEIST', 85, 515);

    c.fillStyle = '#dc2626';
    c.fillText('ACTIVE', 360, 515);

    c.fillStyle = '#f0ede6';
    c.fillText('DJSCE · MUMBAI', 640, 515);

    // Footer Barcode & Stamp
    for (let i = 0; i < 72; i++) {
      c.fillStyle = i % 3 === 0 ? '#b8beaf' : i % 2 === 0 ? '#e2e7ce' : '#0a0d0b';
      c.fillRect(55 + i * 6, 580, 3 + (i % 3), 70);
    }

    c.fillStyle = '#8f9b88';
    c.font = '13px "IBM Plex Mono", monospace';
    c.fillText('DOC-REF: CV2-IDENTITY-DOSSIER', 55, 680);
    c.fillText('DJS CODEAI / COMMEMORATIVE OPERATIVE FILE', 55, 705);

    // Status Stamp
    c.save();
    c.translate(940, 640);
    c.rotate(-0.08);
    c.strokeStyle = '#dc2626';
    c.lineWidth = 3;
    c.strokeRect(-120, -35, 240, 70);
    c.fillStyle = '#dc2626';
    c.font = 'bold 18px "IBM Plex Mono", monospace';
    c.textAlign = 'center';
    c.fillText('IDENTITY VERIFIED', 0, -5);
    c.font = '12px "IBM Plex Mono", monospace';
    c.fillText('APPROVED FOR RELEASE', 0, 18);
    c.restore();

    return new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
  }

  async function download() {
    setBusy(true);
    try {
      const blob = await makeCard();
      if (!blob) throw Error();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `codeverse-operative-${identity!.code.toLowerCase()}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setMessage('OPERATIVE FILE DOWNLOADED. TRANSMIT TO YOUR CREW.');
    } catch {
      setMessage('EXPORT FAILED. PLEASE TRY AGAIN.');
    } finally {
      setBusy(false);
    }
  }

  async function shareCard() {
    if (!identity) return;
    setBusy(true);
    try {
      const blob = await makeCard();
      if (blob && navigator.canShare) {
        const file = new File([blob], `codeverse-${identity.code.toLowerCase()}.png`, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'CodeVerse 2.0 Operative File',
            text: `Operative ${identity.code} reporting for duty. ${shareMessage}`
          });
          setMessage('IDENTITY TRANSMITTED SUCCESSFULLY.');
          return;
        }
      }
      setMessage(await share(`Operative ${identity.code} reporting for duty. ${shareMessage}`));
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        setMessage('TRANSMISSION UNAVAILABLE. DOWNLOAD YOUR OPERATIVE ID INSTEAD.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="identity" className="identity section">
      <div className="section-index">
        <span>IDENTITY ASSIGNMENT // SECURE INTAKE</span>
        <span className="mono">CLEARANCE LEVEL 03 · DJS CODEAI</span>
      </div>

      <div className="identity-layout">
        {/* Left Column: Tactical Identity Intake Terminal */}
        <div className="identity-copy-wrap">
          <div className="intake-badge mono">
            <span className="live-dot" />
            <span>IDENTITY INTAKE // SECURE CHANNEL</span>
          </div>

          <h2>
            LEAVE YOUR NAME.<br />
            <em>TAKE A CODENAME.</em>
          </h2>

          <p className="identity-lead">
            Every great heist starts with a <span className="crimson-highlight">new identity</span>.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              assign();
            }}
            className="dossier-form"
          >
            <div className="terminal-field-group">
              <label htmlFor="operative-name" className="terminal-label mono">
                ENTER YOUR NAME
              </label>

              <div className={`identity-input ${scanning ? 'input-scanning' : ''}`}>
                <span className="input-prompt mono">&gt;</span>
                <input
                  id="operative-name"
                  aria-label="YOUR NAME"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={50}
                  placeholder="e.g. ROHIT RATHOD"
                  autoComplete="name"
                  required
                />
                <button
                  className="icon-button"
                  aria-label="Assign codename"
                  type="submit"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <span className="terminal-sub-message mono">
                SECURE CHANNEL // LOCAL PROCESSING
              </span>
            </div>

            <div className="identity-actions">
              <button
                className={`button assign-button ${scanning ? 'button-scanning' : ''}`}
                type="submit"
              >
                <span>{identity ? 'Roll again' : 'Assign codename'}</span>
                {identity ? <RefreshCw size={16} /> : <Fingerprint size={18} />}
              </button>
            </div>
          </form>

          <p className="privacy-note mono">
            LOCAL BROWSER GENERATION · NO PERSONAL DATA TRANSMITTED.<br />
            COMMEMORATIVE SOUVENIR OPERATIVE FILE · CODEVERSE 2.0
          </p>

          {message && (
            <div className="feedback-dossier mono" role="status">
              <span className="feedback-icon">{scanning ? '▲' : '✓'}</span>
              <span>{message}</span>
            </div>
          )}
        </div>

        {/* Right Column: High-End Classified Operative File Card */}
        <div className="id-preview-wrap">
          <div
            ref={card}
            className={`id-card ${identity ? 'id-card-active' : ''} ${scanning ? 'card-is-scanning' : ''}`}
          >
            {/* Animated Laser Scan Bar */}
            {scanning && (
              <>
                <div className="card-laser-scanner" />
                <div className="card-scanning-overlay mono">
                  <ShieldAlert size={18} className="scanning-pulse-icon" />
                  <span>{scanStepText}</span>
                </div>
              </>
            )}

            {/* Top Card Header */}
            <div className="id-card-top">
              <div className="id-top-tags">
                <span className="card-classified-tag mono">CLASSIFIED</span>
                <span className="card-sub-tag mono">OPERATIVE FILE</span>
              </div>
              <div className="id-top-codeai mono">
                <span>OPERATION CODEVERSE</span>
              </div>
            </div>

            {/* Hero Codename Block */}
            <div className="id-codename-section">
              <div className="id-codename-label-row">
                <span className="id-field-label mono">
                  {identity ? `CODENAME // ${identity.code}` : 'CODENAME'}
                </span>
                {identity && (
                  <span className="id-code-tag mono">
                    OPERATIVE CODE // {identity.cityCode}
                  </span>
                )}
              </div>
              <h3 className="id-codename">
                {identity?.code || 'AWAITING ASSIGNMENT'}
              </h3>
              {identity && <span className="id-assigned-pill mono">IDENTITY ASSIGNED</span>}
            </div>

            {/* Operative Information Dossier Grid */}
            <div className="id-record-grid">
              <div className="id-record-item record-name">
                <small className="mono">OPERATIVE NAME</small>
                <span>{identity?.name || 'AWAITING INTAKE'}</span>
              </div>

              <div className="id-record-item record-id">
                <small className="mono">OPERATIVE ID</small>
                <span className="mono">{identity?.id || 'CV2-TK-XXXX'}</span>
              </div>

              <div className="id-record-item record-clearance">
                <small className="mono">CLEARANCE</small>
                <b className="mono">
                  {identity ? (
                    <>
                      <Check size={12} className="check-icon" /> LEVEL 03
                    </>
                  ) : (
                    'UNAUTHORIZED'
                  )}
                </b>
              </div>

              <div className="id-record-item record-mission">
                <small className="mono">MISSION</small>
                <span className="mono">THE HEIST</span>
              </div>

              <div className="id-record-item record-location">
                <small className="mono">LOCATION</small>
                <span className="mono">DJSCE · MUMBAI</span>
              </div>

              <div className="id-record-item record-status">
                <small className="mono">STATUS</small>
                <b className={`mono ${identity ? 'status-active' : 'status-pending'}`}>
                  {identity ? 'ACTIVE' : 'PENDING'}
                </b>
              </div>
            </div>

            {/* Bottom Card Barcode & Verification */}
            <div className="id-card-bottom">
              <div className="barcode" aria-hidden="true" />
              <div className="id-bottom-meta mono">
                <span>DJS CODEAI / 2026</span>
                <span className="meta-sub">SOUVENIR FILE</span>
              </div>
              <Fingerprint size={28} className="id-fingerprint-watermark" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="id-tools">
            <button
              disabled={!identity || busy || scanning}
              onClick={download}
              className="id-tool-button mono"
            >
              <Download size={15} />
              <span>Download ID</span>
            </button>

            <button
              disabled={!identity || busy || scanning}
              onClick={shareCard}
              className="id-tool-button mono"
            >
              <Share2 size={15} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
