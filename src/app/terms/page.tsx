import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms for this personal portfolio site.',
};

export default function TermsPage() {
  return (
    <main id="content" className="bg-ink min-h-screen text-light pt-32 pb-32 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="max-w-[800px] mx-auto">
        <Link href="/" className="inline-flex text-neon font-mono text-sm uppercase tracking-widest mb-10">
          ← Back to portfolio
        </Link>
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none mb-8">Terms</h1>
        <div className="space-y-6 text-white/75 text-lg leading-relaxed">
          <p>
            This is a personal portfolio for Roshan Shikhare. It describes work and projects. It is not an offer of
            freelance packages, and it does not quote prices.
          </p>
          <p>
            The site design and motion are adapted from Juan Diego Oberto Urribarri’s portfolio, which is licensed
            under the MIT License. That copyright notice is kept in the LICENSE file, with a line for Roshan Shikhare
            added. The original repository is github.com/juandgg1611/Portfolio.
          </p>
          <p>
            HealthShield is source-available and all rights reserved. It is not open source. Form Ninja is a separate
            project under the MIT license. Client names are listed as context for employment and freelance work.
          </p>
          <p>Pages are provided as a static site. There is no account, checkout, or message form.</p>
        </div>
      </div>
    </main>
  );
}
