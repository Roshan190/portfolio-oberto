import type { Metadata } from 'next';
import Link from 'next/link';
import { profile } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'GitHub and LinkedIn for Roshan Shikhare. No email, phone, or contact form.',
};

const links = [
  { href: profile.github, label: 'GitHub', detail: 'github.com/Roshan190' },
  { href: profile.linkedin, label: 'LinkedIn', detail: 'roshan-shikhare' },
];

export default function ContactPage() {
  return (
    <main id="content" className="bg-ink min-h-screen text-light pt-32 pb-32 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="max-w-[900px] mx-auto">
        <Link href="/" className="inline-flex items-center text-neon font-mono text-sm uppercase tracking-widest mb-10">
          ← Back to portfolio
        </Link>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-warm/60 mb-4">Mumbai</p>
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-none mb-6">Contact</h1>
        <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mb-12">
          GitHub and LinkedIn are the public links. This page does not ask for a message, and the site does not
          store one.
        </p>
        <ul className="grid gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 px-6 py-6 hover:border-neon/50"
              >
                <span>
                  <span className="block font-display text-3xl font-black uppercase">{link.label}</span>
                  <span className="block font-mono text-xs uppercase tracking-widest text-white/50 mt-2">{link.detail}</span>
                </span>
                <span aria-hidden="true" className="text-neon text-2xl">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
