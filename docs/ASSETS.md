# Asset manifest and review

| Asset | Origin | Review / usage |
|---|---|---|
| codeai-original.png | Supplied CodeAI logo | Preserved original file; displayed with CSS crop, used in ID export |
| hero.webp | Built-in Imagegen, hero revision 2 | First frame rejected for muddy subjects. Revision accepted for recognizable red crew, clear architecture and lighting. Now environmental background and breach scene |
| operative.webp | Built-in Imagegen | Inspected in generation and actual desktop/mobile composition. Genuine alpha confirmed via channel statistics. Independent foreground and crew scanner |
| heist-mask-v2.webp | Built-in Imagegen, refined cutout | First result refined for cleaner separation and open eye holes. Rejected hero direction; retained as an unused iteration. Replaced by the cinematic vault scene. |
| briefing-room-v2.webp | Built-in Imagegen | Inspected for credible anatomy, practical desk lighting, tactile plans and right-side negative space. Previous dossier direction, now unused; optimized WebP 142 KB. |
| briefing.webp | Built-in Imagegen | Inspected for coherent practical lighting, tactile paper and credible props |
| escape-city.webp | Built-in Imagegen | Inspected for photographic roof detail, no baked labels and route contrast. Fictional schematic, not a real event route or Mumbai photograph |
| loot.webp | Built-in Imagegen | Inspected for material realism, central negative space and coherent light. Revealed behind real-time vault door |
| social.jpg | Local composite of hero artwork and SVG type | Locally generated Open Graph artwork |
| icon.svg | Original project mark | Code-native decorative favicon, not a replacement for supplied logo |
| scrollcraft.js | nateherkai/scroll-craft | Unmodified; MIT license retained in public/vendor |
| hero-reference-v4.webp | Built-in Imagegen edit of supplied reference | Inspected against the requested scene; preserves vault, crew, CCTV, banner and map. UI removed from image and rebuilt as accessible HTML. |
| the-heist-brush.webp | Built-in Imagegen edit of supplied reference | Inspected red brush lettering with confirmed alpha; trimmed and compressed for the hero title. |
| hero-cinematic-v3.webp | Built-in Imagegen | Rejected previous hero direction; unused iteration. |
| Fonts | Fontsource Anton / Barlow Condensed / IBM Plex Mono / Quantico / Story Script / Inter | Self-hosted via npm packages |
| 3D vault, route and city schematic | Original code | Three.js geometry/materials and SVG/CSS |
| Audio | Original Web Audio synthesis | Three quiet oscillator tones; explicit user activation only |
| heist-intro.webm / heist-intro-mobile.webm | Local trailer edit of reviewed briefing, city, crew, hero artwork and vault frames 001–045 | Separate landscape and portrait edits. Surveillance triptych, planning table, vault breach and crew reveal. Portrait crop revised after inspection to keep the Professor in frame. Approximately 1.4 MB each; reproducible with scripts/render-intro.mjs. Muted by default with optional synthesized impacts. |

Built-in image originals are retained in the Codex generated_images directory. Optimized site assets are copied into this repository. Source hero and briefing PNGs are also retained locally. No third-party website photos or videos were copied.

References informed composition and motion only: Scroll Craft, cinematic-scroll-skill, devinilabs/pro-skill and Lusion's cinematic work. The opening uses a locally composited WebM; the interactive sections use SVG, CSS, WebGL and the supplied vault frame sequence.

The briefing route adapts the user-owned portfolio Journey component and typography. Its frame, grid, path and interactive stops are SVG, CSS and HTML; no photographic background is used.

Briefing colors follow the CodeVerse hero: charcoal, warm ivory, red and subdued brass. The operation marquee is live HTML/CSS with a pause control and static reduced-motion layout.

Merged from Bhavya’s `6d0f160` branch: the 86-frame vault sequence and crew, payoff, rulebook and closing artwork. The sequence replaces the previous procedural vault; the completed final frame also serves reduced-motion and pre-script rendering. Supplied duplicates remain preserved from the branch.

Payoff money drop: codeai-airship.webp is a new Imagegen cutout using the supplied CodeAI logo as reference. Reviewed hull materials, complete airship geometry, branding and desktop/mobile composition before integration; true alpha verified. Optimized WebP: 267 KB. Falling prop banknotes, searchlights and skyline are original canvas/CSS graphics. Animation pauses offscreen, supports a pause button and respects reduced motion.
