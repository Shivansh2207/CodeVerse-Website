from pathlib import Path
p=Path('scripts/verify.mjs');s=p.read_text();s=s.replace("imgs.filter(i=>!i.complete||!i.naturalWidth)","imgs.filter(i=>i.loading!=='lazy'&&(!i.complete||!i.naturalWidth))")
p.write_text(s)
