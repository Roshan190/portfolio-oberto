'use client';

import { useState } from 'react';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import AnimateDescription from '@/components/ui/AnimateDescription';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { profile } from '@/lib/site';

const links = [
  {
    href: profile.github,
    label: 'Code',
    title: 'GitHub',
    description: 'Repositories, including Form Ninja and this portfolio.',
    meta: 'github.com/Roshan190',
    cta: 'Open GitHub',
    accent: '#e8e8e3',
    glow: '232,232,227',
  },
  {
    href: profile.linkedin,
    label: 'Profile',
    title: 'LinkedIn',
    description: 'Professional profile for Roshan Shikhare.',
    meta: 'linkedin.com/in/roshan-shikhare',
    cta: 'Open LinkedIn',
    accent: '#c8ff00',
    glow: '200,255,0',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="bg-cream py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full">
        <div className="mb-10 md:mb-14">
          <AnimatedHeading
            text="Contact"
            className="text-[clamp(2rem,5vw,4.5rem)] font-black tracking-tight leading-none uppercase mb-6"
          />
        </div>
        <div className="rounded-3xl bg-ink text-light p-8 sm:p-12 md:p-16 lg:p-20 border border-elevated-dark">
          <div className="max-w-2xl mb-12">
            <AnimateDescription
              text="GitHub and LinkedIn are the ways to reach Roshan. This site does not collect messages."
              className="text-base sm:text-lg text-gray-soft font-sans leading-relaxed"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {links.map((link) => (
              <ContactCard key={link.href} {...link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function ContactCard({
  href,
  label,
  title,
  description,
  meta,
  cta,
  accent,
  glow,
}: (typeof links)[number]) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col gap-5 p-6 md:p-8 rounded-2xl overflow-hidden"
      style={{
        background: hovered ? `rgba(${glow},0.06)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? `rgba(${glow},0.5)` : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered ? `0 0 55px -10px rgba(${glow},0.35)` : '0 2px 20px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="w-11 h-11 rounded-xl flex items-center justify-center font-mono text-sm font-bold"
          style={{ background: `rgba(${glow},0.15)`, border: `1px solid rgba(${glow},0.3)`, color: accent }}
        >
          {hovered ? <CheckCircle size={18} aria-hidden="true" /> : title.slice(0, 2).toUpperCase()}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: accent }}>
          {label}
        </span>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-black text-light uppercase leading-tight">{title}</h3>
        <p className="text-white/60 font-sans text-sm leading-relaxed mt-2">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
        <span className="text-white/75 font-mono text-[10px] uppercase tracking-widest">{meta}</span>
        <span
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono font-bold text-xs uppercase tracking-widest"
          style={{ background: accent, color: '#080807' }}
        >
          {cta}
          <ArrowRight size={12} strokeWidth={2.5} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

export default Contact;
