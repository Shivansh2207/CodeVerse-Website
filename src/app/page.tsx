import {Experience} from '@/components/Experience';
import {Breach} from '@/components/Story';
import Briefing from '@/components/Briefing';
import Hero from '@/components/Hero';
import OperationMarquee from '@/components/OperationMarquee';
import CrewSelector from '@/components/CrewSelector';
import {PhaseOne,Escape} from '@/components/Phases';
import {Elimination} from '@/components/Elimination';
import VaultReveal from '@/components/VaultReveal';
import Payoff from '@/components/Payoff';
import CrewId from '@/components/CrewId';
import {Rules,Timeline,Venue,Closing} from '@/components/Details';
import {event} from '@/config/event';
export default function Page(){const schema={'@context':'https://schema.org','@type':'Event',name:event.name,description:'A heist-themed technology event. Forty-five crews of two to three. INR 25,000 in prizes.',startDate:event.starts,endDate:event.ends,eventStatus:'https://schema.org/EventScheduled',eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',location:{'@type':'Place',name:event.venue,address:{'@type':'PostalAddress',streetAddress:'Bhaktivedanta Swami Marg, Vile Parle (West)',addressLocality:'Mumbai',addressRegion:'Maharashtra',addressCountry:'IN'}},organizer:{'@type':'Organization',name:'DJS CODEAI',url:event.instagram},...(event.siteUrl?{url:event.siteUrl,image:`${event.siteUrl}/media/social.jpg`}:{})};return <Experience><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><main id="operation"><Hero/><OperationMarquee/><Briefing/><CrewSelector/><Breach/><PhaseOne/><Elimination/><Escape/><VaultReveal/><Payoff/><CrewId/><Rules/><Timeline/><Venue/>{event.sponsors.length>0&&<section className="section"><h2>The financiers.</h2><div className="sponsors">{event.sponsors.map(s=><a key={s.name} href={s.url}><img src={s.logo} alt={s.name} width="160" height="80"/></a>)}</div></section>}{event.organizers.length>0&&<section className="section"><h2>The masterminds.</h2><div className="organizers">{event.organizers.map(o=><article key={o.name}><img src={o.photo} alt={o.name} width="240" height="280"/><span>{o.codename}</span><h3>{o.name}</h3><p>{o.role}</p></article>)}</div></section>}<Closing/></main></Experience>;}
