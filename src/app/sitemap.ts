import type { MetadataRoute } from 'next';
import { event } from '@/config/event';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return event.siteUrl ? [{url:event.siteUrl,changeFrequency:'weekly',priority:1}] : []; }
