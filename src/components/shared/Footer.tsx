'use client';

import React, { useState, useEffect, useRef } from 'react';
import AnimatedLink from '@/components/ui/AnimateLink';
import { FaArrowUp } from 'react-icons/fa';
import { useHandleLinkClick } from '@/lib/navigation';
import Link from 'next/link';
import { BASE_PATH, profile } from '@/lib/site';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
    let interval: NodeJS.Timeout | number | undefined;

    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: profile.timezone,
      });
      setCurrentTime(timeString);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          updateTime();
          interval = setInterval(updateTime, 30000);
        } else {
          if (interval) { clearInterval(interval); interval = undefined; }
        }
      },
      { threshold: 0 },
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleLinkClick = useHandleLinkClick();
  const links = [
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/contact', page: true },
    { name: 'FAQ', href: '/faq', page: true },
    { name: 'Terms', href: '/terms', page: true },
    { name: 'Privacy', href: '/privacy', page: true },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative z-30 bg-cream px-6 sm:px-8 md:px-12 pt-20 pb-8 md:pt-32 md:pb-12 border-t border-warm/10">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24 mb-20 md:mb-32">
          
          {/* Brand & Intro */}
          <div className="flex-1 max-w-sm">
            <h2 className="text-warm font-display text-4xl md:text-5xl font-black uppercase leading-none tracking-tight mb-6">
              Roshan Shikhare
            </h2>
            <p className="text-ink/80 font-sans text-sm md:text-base leading-relaxed mb-8">
              Senior Software Engineer in Mumbai. Frontend and fullstack work with React, Next.js, and Node.js.
            </p>
            <div className="inline-flex flex-col">
              <span className="text-ink/60 font-mono text-xs uppercase tracking-widest font-bold mb-3">
                Local time
              </span>
              <p className="text-ink text-sm font-sans font-medium bg-warm/5 inline-flex items-center px-4 py-2.5 rounded-xl border border-warm/10">
                <span className="w-2 h-2 rounded-full bg-forest mr-3"></span>
                {isMounted && currentTime ? `${currentTime} IST` : 'Loading...'}
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex-1 w-full grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-ink/75 font-mono text-xs uppercase tracking-[0.2em] font-bold mb-6">
                Explore
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 text-warm text-sm sm:text-base font-sans font-semibold tracking-wide">
                {links.map((link) => (
                  <AnimatedLink key={link.href}>
                    {link.page ? (
                      <Link href={link.href} className="hover:text-forest transition-colors flex items-center gap-2 group">
                        {link.name}
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-forest">→</span>
                      </Link>
                    ) : (
                      <a
                        href={`${BASE_PATH}${link.href}`}
                        className="hover:text-forest transition-colors flex items-center gap-2 group"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                      >
                        {link.name}
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-forest">→</span>
                      </a>
                    )}
                  </AnimatedLink>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-ink/75 font-mono text-xs uppercase tracking-[0.2em] font-bold mb-6">
                Connect
              </h3>
              <ul className="flex flex-col gap-4 text-warm text-sm sm:text-base font-sans font-semibold tracking-wide">
                <AnimatedLink>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-forest transition-colors flex items-center gap-2 group">
                    LinkedIn
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-forest">↗</span>
                  </a>
                </AnimatedLink>
                <AnimatedLink>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-forest transition-colors flex items-center gap-2 group">
                    GitHub
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-forest">↗</span>
                  </a>
                </AnimatedLink>
                <AnimatedLink>
                  <a href="https://health-shield.in" target="_blank" rel="noopener noreferrer" className="hover:text-forest transition-colors flex items-center gap-2 group">
                    HealthShield
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-forest">↗</span>
                  </a>
                </AnimatedLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm/10 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-ink/75 font-sans text-xs sm:text-sm uppercase tracking-widest font-medium text-center md:text-left">
            © {new Date().getFullYear()} Roshan Shikhare. Design adapted from Juan Oberto’s MIT-licensed portfolio.
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-warm/5 border border-ink/15 text-ink hover:text-forest hover:border-forest/30 hover:bg-forest/5 transition-all duration-300 focus:outline-none"
            aria-label="Back to top"
          >
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Back to top</span>
            <FaArrowUp className="w-3 h-3 transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
