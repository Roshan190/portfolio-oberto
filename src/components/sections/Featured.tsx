'use client';

import Link from 'next/link';

const features = [
  'Vitals and medications',
  'SOS',
  'Household sharing',
  'AI summaries',
  'Policy PDF extraction',
  'Document Q&A',
  'Nearby and cashless hospitals',
  'Claims assist',
  'Doctor portal',
];

export default function Featured() {
  return (
    <section
      id="healthshield"
      aria-labelledby="healthshield-heading"
      className="relative bg-ink text-cream py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-neon mb-4">Featured project</p>
        <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
          <h2
            id="healthshield-heading"
            className="font-display font-black uppercase leading-[0.92] tracking-tight text-[clamp(2.4rem,6vw,5rem)]"
          >
            Health
            <br />
            <span className="text-neon">Shield</span>
          </h2>
          <p className="max-w-md text-base sm:text-lg leading-relaxed text-muted">
            Solo-built, mobile-first personal health and insurance companion for India. Source-available,
            all rights reserved, and not open source.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-8 items-stretch">
          <div
            className="relative rounded-[2rem] border border-white/10 bg-surface overflow-hidden min-h-[420px] flex items-end p-8"
            aria-hidden="true"
          >
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage:
                'linear-gradient(#2a2a28 1px, transparent 1px), linear-gradient(90deg, #2a2a28 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />
            <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full border border-neon/50" />
            <p className="relative font-display font-black text-neon leading-none text-[6rem]">HS</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-warm mb-5">On the product</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-light font-sans text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon flex-shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-muted font-sans text-sm sm:text-base leading-relaxed mb-8">
              Stack: Expo, Expo Router, NativeWind, Zustand, Zod, React Hook Form, Supabase, OpenAI via Edge
              Functions, and Mapbox. The doctor portal is hosted on Vercel. An Android APK is published with
              the site.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://health-shield.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon text-ink font-mono text-xs font-bold uppercase tracking-widest"
              >
                health-shield.in
                <span aria-hidden="true">↗</span>
              </a>
              <Link
                href="/projects/healthshield"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-cream font-mono text-xs font-bold uppercase tracking-widest"
              >
                Project notes
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
