export const SITE_URL = 'https://roshan190.github.io/portfolio-oberto';
export const BASE_PATH = '/portfolio-oberto';

export const profile = {
  name: 'Roshan Shikhare',
  given: 'Roshan',
  family: 'Shikhare',
  location: 'Mumbai, India',
  locality: 'Mumbai',
  region: 'Maharashtra',
  country: 'IN',
  timezone: 'Asia/Kolkata',
  role: 'Senior Software Engineer',
  years: '5+',
  headline:
    'Senior Frontend / Fullstack Engineer working with React, Next.js, and Node.js on enterprise and product web applications.',
  github: 'https://github.com/Roshan190',
  linkedin: 'https://www.linkedin.com/in/roshan-shikhare-83320820a',
  repository: 'https://github.com/Roshan190/portfolio-oberto',
  originalPortfolio: 'https://github.com/juandgg1611/Portfolio',
};

export const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'Tailwind',
  'Angular',
  'AEM',
  'Expo',
  'React Native',
  'Supabase',
] as const;

/** Prefix a public-folder path for raw <img> and window.Image usage. next/image adds basePath itself. */
export function assetPath(path: string): string {
  if (!path || /^(https?:|data:|blob:)/.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === BASE_PATH || normalized.startsWith(`${BASE_PATH}/`)) return normalized;
  return `${BASE_PATH}${normalized}`;
}

/** App Router pathnames omit basePath. window.location.pathname does not. */
export function stripBasePath(pathname: string): string {
  if (!pathname) return '/';
  let path = pathname;
  if (path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length) || '/';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path || '/';
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
