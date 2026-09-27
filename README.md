# CodeVerse 2.0 · The Heist

A complete Next.js / React / TypeScript event microsite with original generated artwork, an unmodified Scroll Craft runtime, and a real Three.js mechanical vault.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. The development server is running in the current Codex session.

```powershell
npm run build
npm start
npm run typecheck
npm test
npm run verify
```

Browser verification uses installed Google Chrome through Playwright. Screenshots and reports are saved in `artifacts/`. No account credentials are required.

## Launch configuration

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`: real public origin, for canonical URLs, sitemap and social image URLs.
- `NEXT_PUBLIC_UNSTOP_URL`: final registration URL. Until supplied, the registration panel clearly explains availability and links to the event contact.

Edit `src/config/event.ts` for dates, fee basis, seats remaining, sponsors and organizers. Dates use explicit Asia/Kolkata offsets. INR 99 is confirmed; per-person versus per-crew is not. No seat scarcity, sponsor identity or organizer portrait is fabricated. Unknown organizer/sponsor lists are intentionally hidden.

## What is implemented

- Brief boot sequence, session skip, semantic server-rendered event content.
- Layered hero with transparent operative, architecture, atmosphere, foreground dossier and pointer response.
- Briefing, interactive three-person crew scanner, sliding mint security doors.
- Scroll-controlled 45-to-10 elimination, lateral photographic escape map and traced route.
- Three.js vault: retracting bolts, turning wheel, hinged door, metal material and illuminated interior.
- Prize pool, local-only codename IDs with downloadable PNG and share/clipboard fallback.
- Keyboard-operated rules dossier, FAQ, four-page public rulebook PDF.
- IST-aware registration and timeline, ICS download and Google Calendar.
- Venue map schematic linked to real Google Maps search, contact, sharing and footer.
- Responsive layouts, reduced-motion and no-JavaScript content fallbacks, optional synthesized audio that only starts after a click.
- Metadata, Open Graph, social preview, Event JSON-LD, robots and configurable sitemap.

## Assets

`docs/ASSETS.md` records provenance and review. Generated stills are original themed artwork, not documentary photos. No AI video was generated: there is no video provider/key in this environment. The central opening sequence is actual runtime 3D, not a video claim.

The public PDF is generated with `scripts/rulebook.py` using reportlab. Image optimization and the calendar generator are in `scripts/assets.mjs`. Keep the original user logo intact.

## Verification

See `docs/VERIFICATION.md`. Physical phone testing and production deployment are not performed. Build output is suitable for a standard Next.js host after the real public origin and registration URL are configured.
