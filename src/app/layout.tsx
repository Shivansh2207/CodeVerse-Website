import type { Metadata } from 'next';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './scrollcraft.css';
import './globals.css';
import { event } from '@/config/event';
export const metadata: Metadata = {
 metadataBase: new URL(event.siteUrl || 'http://localhost:3000'),
 title: 'CodeVerse 2.0 · The Heist | DJS CODEAI',
 description: 'Forty-five crews of three. One mint. A heist-themed tech event on 9 October 2026 at DJSCE Mumbai. ₹25,000 in prizes. The Professor is recruiting.',
 ...(event.siteUrl ? { metadataBase: new URL(event.siteUrl), alternates: {canonical:'/'} } : {}),
 openGraph: {title:'CodeVerse 2.0 · The Heist', description:'45 crews. 3 per crew. One mint. 9 October 2026 at DJSCE Mumbai. ₹25,000 in prizes.', type:'website', locale:'en_IN', images:[{url:'/media/social.jpg',width:1200,height:630,alt:'CodeVerse 2.0, The Heist, 9 October 2026'}]},
 twitter:{card:'summary_large_image',title:'CodeVerse 2.0 · The Heist',images:['/media/social.jpg']},
 icons:{icon:'/icon.svg'}, robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
