from pathlib import Path
p=Path('src/components/Story.tsx')
s=p.read_text(encoding='utf-8')
s=s.replace('data-sc-span="1.65"','data-sc-span="2.15"').replace('className="hero-stage"','className="hero-stage" data-sc-spotlight')
s=s.replace('<div className="hero-scrim"/>','<div className="hero-scrim"/><div className="hero-orbit" aria-hidden="true"><i/><i/><i/></div>')
s=s.replace('<div className="hero-coordinate">','<div className="hero-operative"><img src="/media/operative.webp" alt="A masked operative in a crimson hood" width="900" height="1350" fetchPriority="high"/></div><div className="hero-foreground-fade"/><div className="hero-side-note" aria-hidden="true">NO NAMES. NO PASTS. JUST THE PLAN.</div><div className="hero-coordinate">')
s=s.replace('<span className="small-cross">+</span>','<span className="small-cross">[ RECRUITMENT FILE 002 ]</span>')
p.write_text(s,encoding='utf-8')
p=Path('src/components/CrewSelector.tsx');s=p.read_text(encoding='utf-8');s=s.replace('<div className="hood"><div className="face"><i/><i/><b/></div></div><div className="shoulders"/>','<img className="operative-photo" src="/media/operative.webp" alt="" width="240" height="360" loading="lazy"/>');p.write_text(s,encoding='utf-8')
