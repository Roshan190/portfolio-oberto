import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/projects';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = ['', '/faq', '/contact', '/terms', '/privacy'];
  const staticEntries = pages.map((path) => ({
    url: `${SITE_URL}${path}/`.replace(/\/+$/, '/'),
    lastModified,
  }));
  const projectEntries = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}/`,
    lastModified,
  }));
  return [...staticEntries, ...projectEntries];
}
