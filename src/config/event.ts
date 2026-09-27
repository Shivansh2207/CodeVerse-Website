export const event = {
  name: 'CodeVerse 2.0 · The Heist',
  starts: '2026-10-09T08:00:00+05:30', ends: '2026-10-09T18:00:00+05:30',
  registrationOpens: '2026-09-29T00:00:00+05:30', registrationCloses: '2026-10-07T00:00:00+05:30',
  unstopUrl: process.env.NEXT_PUBLIC_UNSTOP_URL || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
  fee: 99, feeBasis: null as 'person' | 'crew' | null, seatsRemaining: null as number | null,
  venue: 'Dwarkadas J. Sanghvi College of Engineering',
  address: 'Bhaktivedanta Swami Marg, Vile Parle (West), Mumbai',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dwarkadas+J.+Sanghvi+College+of+Engineering+Mumbai',
  instagram: 'https://www.instagram.com/djscodeai/',
  whatsapp: 'https://wa.me/919819486535', phone: '+91 98194 86535', contact: 'Adish Shah',
  sponsors: [] as {name: string; logo: string; url: string}[],
  organizers: [] as {name: string; codename: string; role: string; photo: string}[],
};
export const schedule = [
 ['08:00','09:00','Crew registration','Your operation starts here.'],
 ['09:00','09:30','Opening & briefing','Meet the plan. Know the rules.'],
 ['10:00','13:30','Inside the Mint','Phase 01. Forty-five crews go in.'],
 ['13:30','14:30','Reset & refuel','Take a breath. The next move is yours.'],
 ['14:30','16:30','The Escape','Phase 02. Ten crews. One way out.'],
 ['16:30','17:15','Final evaluation','Every move accounted for.'],
 ['17:15','18:00','The payoff','Prize distribution. Bella ciao.'],
];
export const codenames = ['Tokyo','Berlin','Nairobi','Rio','Denver','Helsinki','Oslo','Moscow','Lisbon','Palermo','Bogota','Manila','Stockholm','Marseille'];
export function getEventState(now: number, remaining: number | null = event.seatsRemaining) {
 if (now >= Date.parse(event.ends)) return { key:'complete', label:'Operation complete', detail:'The heist is over. Thanks for playing.', target:0 };
 if (now >= Date.parse(event.starts)) return { key:'live', label:'Operation live', detail:'Live now at DJSCE, Mumbai', target:Date.parse(event.ends) };
 if (now >= Date.parse(event.registrationCloses)) return { key:'closed', label:'Roster locked', detail:'Registration closed. See you on 9 October.', target:Date.parse(event.starts) };
 if (remaining === 0) return { key:'full', label:'Every seat is taken', detail:'All 45 crews are in. See you on 9 October.', target:Date.parse(event.starts) };
 if (now < Date.parse(event.registrationOpens)) return { key:'soon', label:'Opens 29 September', detail:'Recruitment opens 29 September', target:Date.parse(event.registrationOpens) };
 return { key:'open', label:'Join the crew', detail:'Recruitment active. Closes 6 October', target:Date.parse(event.registrationCloses) };
}
export function currentSlot(now: number) { return schedule.findIndex(([start,end]) => now >= Date.parse(`2026-10-09T${start}:00+05:30`) && now < Date.parse(`2026-10-09T${end}:00+05:30`)); }
export const shareMessage = 'Join our crew for CodeVerse 2.0, a heist-themed event on 9 October at DJSCE Mumbai. Teams of 2–3. ₹25,000 in prizes.';
