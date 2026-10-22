'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function NotFound() {
  const codeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate the 404 counter
    const el = codeRef.current;
    if (!el) return;
    let start = 0;
    const target = 404;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = String(start);
      if (start >= target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#080807] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#C8FF00 1px, transparent 1px), linear-gradient(90deg, #C8FF00 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Neon glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-xl">
        {/* Error code */}
        <div className="mb-6">
          <span className="text-neon font-mono text-xs uppercase tracking-[0.3em] opacity-60">Error</span>
        </div>
        <div
          className="font-black leading-none mb-6 text-light"
          style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', letterSpacing: '-0.05em' }}
        >
          <span ref={codeRef}>404</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black uppercase text-light tracking-tight mb-4">
          Page not found
        </h1>
        <p className="text-white/60 font-sans text-lg leading-relaxed mb-10">
          That address is not on this portfolio.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neon text-ink font-mono font-bold text-sm uppercase tracking-widest rounded-full hover:bg-neon/90 transition-all duration-300 shadow-[0_0_30px_rgba(200,255,0,0.3)]"
          >
            ← Back home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-elevated-dark text-light border border-border-subtle font-mono font-bold text-sm uppercase tracking-widest rounded-full hover:border-neon/40 transition-all duration-300"
          >
            View projects
          </Link>
        </div>

        {/* Quick nav */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-5">On this site</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: 'About', href: '/#about' },
              { label: 'Experience', href: '/#experience' },
              { label: 'Contact', href: '/contact' },
              { label: 'FAQ', href: '/faq' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/50 hover:text-neon font-mono text-sm uppercase tracking-widest transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
