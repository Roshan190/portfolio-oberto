import { BASE_PATH } from '@/lib/site';

const visual = (file: string) => `${BASE_PATH}/visuals/${file}`;

export interface Project {
  id: number;
  slug: string;
  title: string;
  year: string;
  tech: string[];
  description: string;
  myRole: string[];
  images: string[];
  hoverImage: string;
  github: string;
  liveUrl: string;
  accentColor?: string;
  isMobile?: boolean;
  featured?: boolean;
  note?: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: 'healthshield',
    title: 'HealthShield',
    year: 'Featured',
    featured: true,
    tech: [
      'Expo',
      'Expo Router',
      'NativeWind',
      'Zustand',
      'Zod',
      'React Hook Form',
      'Supabase',
      'OpenAI',
      'Mapbox',
    ],
    description:
      'Solo-built, mobile-first personal health and insurance companion for India. HealthShield is source-available and all rights reserved. It is not open source. The product is published at health-shield.in, including an Android APK.',
    myRole: [
      'Solo-built the mobile app.',
      'Vitals and medications tracking, SOS, and household sharing.',
      'AI summaries, policy PDF extraction, and document Q&A. OpenAI is used via Edge Functions.',
      'Nearby and cashless hospital search, claims assist, and a doctor portal hosted on Vercel.',
    ],
    images: [visual('healthshield-1.png'), visual('healthshield-2.png')],
    hoverImage: visual('healthshield-1.png'),
    github: '',
    liveUrl: 'https://health-shield.in',
    accentColor: '#047857',
    isMobile: true,
    note: 'Source-available. All rights reserved. Not open source.',
  },
  {
    id: 2,
    slug: 'form-ninja',
    title: 'Form Ninja',
    year: 'Open source',
    tech: ['TypeScript', 'npm', 'MIT'],
    description:
      'Form Ninja is an open-source npm form library released under the MIT license. The source is on GitHub at Roshan190/form-ninja.',
    myRole: ['Published the library as open source under the MIT license.'],
    images: [visual('form-ninja.png'), visual('form-ninja-2.png')],
    hoverImage: visual('form-ninja.png'),
    github: 'https://github.com/Roshan190/form-ninja',
    liveUrl: 'https://github.com/Roshan190/form-ninja',
    accentColor: '#c8ff00',
    note: 'MIT license.',
  },
  {
    id: 3,
    slug: 'client-work',
    title: 'Client work',
    year: '2021–2026',
    tech: ['React', 'Next.js', 'Angular', 'AEM'],
    description:
      'Selected client work from DEPT® in Mumbai and from freelance. At DEPT® this included configurable insurance journeys, KYC prefill, CMS-driven platforms, and integrated backend services for IFB, India First Life Insurance, and Palfinger. MumbaiFilter is freelance work.',
    myRole: [
      'DEPT®, Mumbai: React, Next.js, Angular, and AEM.',
      'Configurable insurance journeys, KYC prefill, CMS-driven platforms, and integrated backend services.',
      'Clients through DEPT®: IFB, India First Life Insurance, and Palfinger.',
      'MumbaiFilter, freelance.',
    ],
    images: [visual('client-work.png'), visual('client-work-2.png')],
    hoverImage: visual('client-work.png'),
    github: '',
    liveUrl: '',
    accentColor: '#6b645c',
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
