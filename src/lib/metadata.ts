import { Metadata } from 'next';
import { BASE_PATH, SITE_URL, profile } from '@/lib/site';

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Roshan Shikhare — Senior Software Engineer | Mumbai',
    template: '%s | Roshan Shikhare',
  },
  description: profile.headline,
  keywords: [
    'Roshan Shikhare',
    'Senior Software Engineer',
    'Frontend Engineer',
    'Fullstack Engineer',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Mumbai',
    'HealthShield',
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.svg`, type: 'image/svg+xml' },
      { url: `${BASE_PATH}/favicon-32.png`, sizes: '32x32', type: 'image/png' },
    ],
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
  openGraph: {
    title: 'Roshan Shikhare — Senior Software Engineer',
    description: profile.headline,
    url: `${SITE_URL}/`,
    siteName: 'Roshan Shikhare',
    locale: 'en_IN',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Roshan Shikhare, Senior Software Engineer in Mumbai',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roshan Shikhare — Senior Software Engineer',
    description: profile.headline,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
