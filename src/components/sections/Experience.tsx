'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import AnimateDescription from '@/components/ui/AnimateDescription';
import { prefersReducedMotion } from '@/lib/site';

const roles = [
  {
    id: 'bajaj',
    tag: 'Apr 2026 — Present',
    name: 'Bajaj Finserv',
    title: 'Senior Software Engineer',
    place: 'IT, MarTech & GenAI, Technology',
    summary: "Building web experiences for Bajaj Finserv's IT, MarTech & GenAI technology team.",
    points: ['Senior Software Engineer', 'IT, MarTech & GenAI, Technology'],
    accent: true,
    badge: 'Current',
  },
  {
    id: 'dept',
    tag: 'Aug 2023 — Apr 2026',
    name: 'DEPT®',
    title: 'Senior Software Engineer',
    place: 'DEPT® Agency, Mumbai',
    summary:
      'React, Next.js, Angular, and AEM. Configurable insurance journeys, KYC prefill, CMS-driven platforms, and integrated backend services.',
    points: [
      'Clients: IFB, India First Life Insurance, Palfinger',
      'Configurable insurance journeys and KYC prefill',
      'CMS-driven platforms and integrated backend services',
    ],
    accent: false,
    badge: '',
  },
  {
    id: 'tekno',
    tag: 'Jul 2021 — Jul 2023',
    name: 'Tekno Point',
    title: 'Software Engineer',
    place: 'Tekno Point, Mumbai',
    summary: 'Software Engineer at Tekno Point in Mumbai.',
    points: ['Mumbai', 'Jul 2021 — Jul 2023'],
    accent: false,
    badge: '',
  },
];

const Experience = () => {
  const experienceRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>('.role-card');
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.role-cards', start: 'top 85%', once: true },
        },
      );
    },
    { scope: experienceRef },
  );

  return (
    <section
      id="experience"
      ref={experienceRef}
      className="bg-ink text-light py-24 md:py-40 pb-10 md:pb-14 overflow-hidden border-t border-border-subtle"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-16 md:mb-24">
          <AnimatedHeading
            text="Experience"
            className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tight leading-none uppercase mb-8"
          />
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-start-5 md:col-span-8 flex flex-col md:flex-row gap-6 md:gap-16">
              <span className="text-neon uppercase text-lg md:text-xl font-bold tracking-[0.2em] whitespace-nowrap pt-2">
                (Roles)
              </span>
              <AnimateDescription
                text="Senior Software Engineer with 5+ years. Currently at Bajaj Finserv, previously at DEPT® and Tekno Point, both in Mumbai."
                className="max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-soft font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="role-cards grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {roles.map((role) => (
            <article
              key={role.id}
              className={`role-card relative flex flex-col rounded-[2rem] overflow-hidden border-2 ${
                role.accent
                  ? 'border-neon/40 bg-gradient-to-br from-[#0d0d0c] via-[#0d140d] to-[#0d0d0c]'
                  : 'border-border-subtle bg-elevated-dark'
              }`}
            >
              {role.accent && (
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-neon to-transparent" />
              )}
              <div className="flex flex-col flex-1 p-7 md:p-8">
                <div className="mb-8">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className={`text-xs md:text-sm font-mono uppercase tracking-[0.2em] font-bold ${
                        role.accent ? 'text-neon' : 'text-warm/70'
                      }`}
                    >
                      {role.tag}
                    </span>
                    {role.badge ? (
                      <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] bg-neon text-ink px-3 py-1.5 rounded-full">
                        {role.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl font-black uppercase leading-none tracking-tight text-light mb-3">
                    {role.name}
                  </h3>
                  <p className="text-light font-sans text-lg leading-snug">{role.title}</p>
                  <p className="text-warm/70 font-sans text-base leading-snug mt-2">{role.place}</p>
                </div>
                <div className={`w-full h-px mb-8 ${role.accent ? 'bg-neon/30' : 'bg-border-subtle'}`} />
                <p className="text-light/85 font-sans text-base sm:text-lg leading-relaxed mb-6">{role.summary}</p>
                <ul className="flex-1 space-y-3">
                  {role.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span
                        className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          role.accent ? 'bg-neon text-ink' : 'bg-elevated text-warm'
                        }`}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="font-sans text-base leading-snug text-light/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border-subtle pt-10">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-neon mb-3">Education</h3>
            <p className="text-light font-sans text-lg">B.Sc. Computer Science, Mumbai University</p>
            <p className="text-muted font-mono text-sm uppercase tracking-widest mt-1">2018 — 2021</p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-neon mb-3">Certificate</h3>
            <p className="text-light font-sans text-lg">The Complete 2024 Web Development Bootcamp, Udemy</p>
            <p className="text-muted font-mono text-sm uppercase tracking-widest mt-1">2021</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
