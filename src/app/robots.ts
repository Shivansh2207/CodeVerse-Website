import type { MetadataRoute } from 'next';
import { event } from '@/config/event';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots { return {rules:{userAgent:'*',allow:'/'},...(event.siteUrl ? {sitemap:`${event.siteUrl}/sitemap.xml`}: {})}; }
