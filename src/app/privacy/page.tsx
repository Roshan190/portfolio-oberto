import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy notes for this static portfolio. No analytics and no contact form.',
};

export default function PrivacyPage() {
  return (
    <main id="content" className="bg-ink min-h-screen text-light pt-32 pb-32 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="max-w-[800px] mx-auto">
        <Link href="/" className="inline-flex text-neon font-mono text-sm uppercase tracking-widest mb-10">
          ← Back to portfolio
        </Link>
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none mb-8">Privacy</h1>
        <div className="space-y-6 text-white/75 text-lg leading-relaxed">
          <p>
            This portfolio does not include analytics, advertising tags, or a contact form. It does not ask for an
            email address or a phone number, and it does not publish either.
          </p>
          <p>
            GitHub and LinkedIn links leave this site. Those services have their own policies. The pages themselves
            are static files served from GitHub Pages.
          </p>
          <p>
            A session flag remembers whether the opening title animation has already played in the current tab. That
            value stays in session storage on your browser and is not sent to a server.
          </p>
        </div>
      </div>
    </main>
  );
}
