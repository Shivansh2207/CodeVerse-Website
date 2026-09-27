from pathlib import Path
p=Path('src/components/Vault.tsx');s=p.read_text().replace('new THREE.RingGeometry(2.5,6.5,96)','new THREE.RingGeometry(2.5,30,96)');p.write_text(s)
