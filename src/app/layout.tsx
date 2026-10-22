import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';
import { siteMetadata } from '@/lib/metadata';
import { SITE_URL, profile, skills } from '@/lib/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  preload: true,
  display: 'swap',
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  preload: true,
  display: 'swap',
});
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  preload: true,
  display: 'swap',
});

export const metadata = siteMetadata;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: profile.name,
  url: SITE_URL,
  jobTitle: profile.role,
  description: profile.headline,
  image: `${SITE_URL}/og-image.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.locality,
    addressRegion: profile.region,
    addressCountry: profile.country,
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Bajaj Finserv',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Mumbai University',
  },
  knowsAbout: [...skills],
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-cream`}
      >
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
