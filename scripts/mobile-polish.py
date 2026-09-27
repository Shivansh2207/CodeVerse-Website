from pathlib import Path
p=Path('src/components/Vault.tsx');s=p.read_text().replace('camera.position.z=10.3-open*.9','camera.position.z=(10.3-open*.9)*(innerWidth<768?1.25:1)');p.write_text(s)
