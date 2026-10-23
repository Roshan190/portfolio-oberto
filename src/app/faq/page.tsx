import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Facts about Roshan Shikhare, HealthShield, and this portfolio. No sales packages and no contact form.',
};

const faqs = [
  {
    num: '01',
    q: 'Who is this portfolio about?',
    a: 'Roshan Shikhare, a Senior Software Engineer in Mumbai with 6 years of experience. The current role is at Bajaj Finserv, on the IT, MarTech & GenAI technology team.',
  },
  {
    num: '02',
    q: 'What is HealthShield?',
    a: 'HealthShield is a solo-built, mobile-first personal health and insurance companion for India. It is published at health-shield.in, including an Android APK. It is source-available and all rights reserved. It is not open source.',
  },
  {
    num: '03',
    q: 'What is Form Ninja?',
    a: 'Form Ninja is an open-source npm form library under the MIT license. The repository is github.com/Roshan190/form-ninja.',
  },
  {
    num: '04',
    q: 'Which companies are listed?',
    a: 'Bajaj Finserv (Apr 2026–present), DEPT® Agency in Mumbai (Aug 2023–Apr 2026), and Tekno Point in Mumbai (Jul 2021–Jul 2023). DEPT® clients named here are IFB, India First Life Insurance, and Palfinger. MumbaiFilter is freelance work.',
  },
  {
    num: '05',
    q: 'How do I get in touch?',
    a: 'Use GitHub (github.com/Roshan190) or LinkedIn. This site does not publish an email address, a phone number, or a resume, and it does not run a contact form.',
  },
  {
    num: '06',
    q: 'Does this site track visitors?',
    a: 'No analytics and no tracking scripts are included. The pages are a static export.',
  },
];

export default function FAQPage() {
  return (
    <main id="content" className="bg-ink min-h-screen text-light pt-32 pb-32 px-4 sm:px-6 md:px-10 lg:px-14 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-neon hover:text-light transition-colors mb-10 font-mono text-sm uppercase tracking-widest"
        >
          ← Back to portfolio
        </Link>
        <div className="mb-16">
          <span className="text-warm/50 font-mono text-sm uppercase tracking-[0.2em] block mb-4">Notes</span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tight leading-none uppercase mb-6 text-light">
            Questions
          </h1>
          <p className="text-white/70 font-sans text-lg sm:text-xl leading-relaxed max-w-2xl">
            Short answers drawn from the same facts as the rest of the site.
          </p>
        </div>
        <div className="divide-y divide-border-subtle">
          {faqs.map((faq) => (
            <article key={faq.num} className="py-10">
              <p className="font-mono uppercase tracking-[0.2em] text-neon text-sm mb-4">{faq.num}</p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-light mb-5 leading-tight">{faq.q}</h2>
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed">{faq.a}</p>
            </article>
          ))}
        </div>
        <div className="mt-16">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon text-ink font-mono text-sm font-bold uppercase tracking-widest"
          >
            GitHub and LinkedIn →
          </Link>
        </div>
      </div>
    </main>
  );
}
