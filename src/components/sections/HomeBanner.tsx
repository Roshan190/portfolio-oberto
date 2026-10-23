'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useTransitionState } from 'next-transition-router';
import dynamic from 'next/dynamic';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { safeSessionStorage } from '@/utils/storage';
import { profile } from '@/lib/site';

const HeroChartBackground = dynamic(() => import('@/components/canvas/HeroChartBackground'), {
  ssr: false,
});

const RoleTicker = () => {
  const roles = [
    'Senior Software Engineer',
    'Frontend / Fullstack',
    'React & Next.js',
    'Node.js',
  ];
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      const wrapper = containerRef.current;
      if (!wrapper) return;
      const currentWord = wrapper.querySelector('.ticker-word-current');
      const nextWord = wrapper.querySelector('.ticker-word-next');
      if (currentWord && nextWord) {
        gsap.set(nextWord, { yPercent: 100 });
        gsap.to(currentWord, {
          yPercent: -100,
          duration: 0.4,
          ease: 'power3.out',
        });
        gsap.to(nextWord, {
          yPercent: 0,
          duration: 0.4,
          ease: 'power3.out',
          onComplete: () => {
            setCurrentIdx((prev) => (prev + 1) % roles.length);
            gsap.set(currentWord, { yPercent: 0 });
          },
        });
      }
    }, 2600);
    return () => clearInterval(interval);
  }, [roles.length, reduced]);

  const nextIdx = (currentIdx + 1) % roles.length;
  return (
    <div className="relative h-8 overflow-hidden mb-8 flex justify-center items-center select-none">
      <div
        ref={containerRef}
        className="relative h-8 w-full max-w-md text-center font-mono text-sm sm:text-base uppercase tracking-widest text-forest"
      >
        <div className="ticker-word-current absolute inset-0 flex items-center justify-center">
          {roles[currentIdx]}
        </div>
        <div className="ticker-word-next absolute inset-0 flex items-center justify-center translate-y-full">
          {roles[nextIdx]}
        </div>
      </div>
    </div>
  );
};

const HomeBanner = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const availRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { isReady } = useTransitionState();
  const reduced = useReducedMotion();

  const splitText = (text: string) =>
    text.split('').map((char, idx) => (
      <span
        key={idx}
        className="letter-wrapper inline-block relative overflow-hidden"
        style={{ display: 'inline-block', ['--idx' as any]: idx }}
      >
        <span className="letter-original block">{char === ' ' ? '\u00A0' : char}</span>
        <span aria-hidden="true" className="letter-duplicate block absolute top-full left-0 w-full select-none">
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ));

  useEffect(() => {
    if (reduced) {
      gsap.set(sectionRef.current, { opacity: 1 });
      return;
    }
    if (sectionRef.current) gsap.set(sectionRef.current, { opacity: 0 });
    if (nameRef.current) {
      gsap.set(nameRef.current.querySelectorAll('.letter-wrapper'), { y: '100%', opacity: 0 });
      gsap.set(nameRef.current.querySelectorAll('.letter-original, .letter-duplicate'), { y: '0%' });
    }
    [availRef, paragraphRef, tickerRef, buttonsRef, statsRef].forEach((ref) => {
      if (ref.current) gsap.set(ref.current, { y: 40, opacity: 0 });
    });
  }, [reduced]);

  useEffect(() => {
    if (!isReady) return;

    const play = () => {
      if (reduced) {
        gsap.set(sectionRef.current, { opacity: 1 });
        return;
      }

      const timer = window.setTimeout(() => {
      gsap.to(sectionRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      if (nameRef.current) {
        gsap.set(nameRef.current.querySelectorAll('.letter-original, .letter-duplicate'), { y: '0%' });
      }
      const letters = nameRef.current?.querySelectorAll('.letter-wrapper');
      if (letters?.length) {
        gsap.to(letters, {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.3,
        });
      }
      const tl = gsap.timeline({ delay: 1.1, ease: 'power3.out' });
      [availRef, paragraphRef, tickerRef, buttonsRef, statsRef].forEach((ref) => {
        if (ref.current) {
          tl.to(ref.current, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4');
        }
      });
      }, 100);
      return () => window.clearTimeout(timer);
    };

    if (safeSessionStorage.getItem('preloader-shown')) return play();
    let stop = () => {};
    const handler = () => {
      stop = play() || (() => {});
    };
    window.addEventListener('preloaderComplete', handler);
    return () => {
      window.removeEventListener('preloaderComplete', handler);
      stop();
    };
  }, [isReady, reduced]);

  const handleMouseEnter = () => {
    if (reduced || !nameRef.current) return;
    const isDesktop = window.innerWidth >= 768;
    const selector = isDesktop ? '[data-hero-name="desktop"] .letter-wrapper' : '[data-hero-name="mobile"] .letter-wrapper';
    const letters = nameRef.current.querySelectorAll(selector);
    letters.forEach((wrapper, idx) => {
      const original = wrapper.querySelector('.letter-original');
      const duplicate = wrapper.querySelector('.letter-duplicate');
      if (original && duplicate) {
        gsap.to(original, {
          y: '-100%',
          duration: 0.45,
          ease: 'power2.out',
          delay: idx * 0.03,
          overwrite: 'auto',
        });
        gsap.to(duplicate, {
          y: '-100%',
          duration: 0.45,
          ease: 'power2.out',
          delay: idx * 0.03,
          overwrite: 'auto',
        });
      }
    });
  };

  const handleMouseLeave = () => {
    if (reduced || !nameRef.current) return;
    const isDesktop = window.innerWidth >= 768;
    const selector = isDesktop ? '[data-hero-name="desktop"] .letter-wrapper' : '[data-hero-name="mobile"] .letter-wrapper';
    const letters = nameRef.current.querySelectorAll(selector);
    letters.forEach((wrapper, idx) => {
      const original = wrapper.querySelector('.letter-original');
      const duplicate = wrapper.querySelector('.letter-duplicate');
      if (original && duplicate) {
        gsap.to(original, {
          y: '0%',
          duration: 0.45,
          ease: 'power2.out',
          delay: idx * 0.03,
          overwrite: 'auto',
        });
        gsap.to(duplicate, {
          y: '0%',
          duration: 0.45,
          ease: 'power2.out',
          delay: idx * 0.03,
          overwrite: 'auto',
        });
      }
    });
  };

  // Mouse spotlight
  useEffect(() => {
    if (reduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      spotlightRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
      spotlightRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
      gsap.to(spotlightRef.current, { opacity: 1, duration: 0.5, overwrite: 'auto' });
    };
    const handleMouseLeave = () => {
      gsap.to(spotlightRef.current, { opacity: 0, duration: 0.8, overwrite: 'auto' });
    };
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [reduced]);

  useGSAP(
    () => {
      if (reduced || !sectionRef.current || !innerContentRef.current) return;
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(innerContentRef.current, { y: '-15vh', ease: 'none' }),
      });
      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-svh px-6 sm:px-8 md:px-12 lg:px-16 pt-24 pb-10 md:pt-20 md:pb-8 bg-cream flex items-center relative overflow-x-hidden"
      style={{ opacity: reduced ? 1 : 0 }}
    >
      <HeroChartBackground />

      {!reduced && (
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-[1] opacity-0"
          style={{
            background: 'radial-gradient(400px circle at var(--x, 0px) var(--y, 0px), rgba(4, 120, 87, 0.08), transparent 85%)',
            willChange: 'opacity',
          }}
        />
      )}

      <div ref={innerContentRef} className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center">
          <h1
            ref={nameRef}
            aria-label={profile.name}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="name-heading font-display text-[clamp(2.7rem,12vw,4.6rem)] md:text-[clamp(3.2rem,6.1vw,6.6rem)] whitespace-nowrap select-none font-bold leading-none uppercase cursor-pointer overflow-hidden mb-6"
          >
            <span aria-hidden="true" data-hero-name="mobile" className="block md:hidden whitespace-normal">
              <span className="block">{splitText('Roshan')}</span>
              <span className="block">{splitText('Shikhare')}</span>
            </span>
            <span aria-hidden="true" data-hero-name="desktop" className="hidden md:block">
              {splitText('Roshan Shikhare')}
            </span>
          </h1>
        </div>

        <div className="flex justify-center items-center py-1 md:py-3 px-4 sm:px-6">
          <div className="max-w-xl text-center">

            {/* Availability badge */}
            <div ref={availRef} className="flex justify-center mb-7">
              <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-forest/30 bg-forest/5 text-forest text-sm font-mono font-semibold uppercase tracking-widest">
                <span className="inline-flex rounded-full h-2.5 w-2.5 bg-forest" aria-hidden="true" />
                Mumbai, India
              </span>
            </div>

            <p
              ref={paragraphRef}
              className="text-ink font-sans text-lg sm:text-xl md:text-2xl leading-relaxed mb-9 md:mb-12"
            >
              {profile.headline}
            </p>

            <div ref={tickerRef}>
              <RoleTicker />
            </div>

            <div ref={buttonsRef} className="flex flex-row justify-center items-center gap-2 sm:gap-4 flex-wrap max-w-full px-2">
              <AnimatedButton
                onClick={() => handleScroll('projects')}
                topText="PROJECTS"
                bottomText="SEE THE WORK →"
                variant="dark"
              />
              <AnimatedButton
                onClick={() => handleScroll('contact')}
                topText="CONTACT"
                bottomText="GITHUB & LINKEDIN →"
                variant="light"
              />
              <AnimatedButton
                onClick={() => window.open(profile.github, '_blank', 'noopener,noreferrer')}
                topText="GITHUB"
                bottomText="ROSHAN190 →"
                variant="outline"
              />
            </div>

            {/* Results strip — the real WOW for business owners */}
            <div ref={statsRef} className="mt-12 pt-8 border-t border-warm/15">
              <div className="grid grid-cols-3 gap-6 sm:gap-10">
                {[
                  { value: '6', label: 'Years' },
                  { value: 'Mumbai', label: 'India' },
                  { value: 'B.Sc.', label: 'Computer Science' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-ink leading-none">
                      {value}
                    </div>
                    <div className="font-mono text-xs sm:text-sm uppercase tracking-widest text-ink/70 mt-2 leading-tight">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
