'use client';

import React from 'react';

interface SectionDividerProps {
  variant: 'kinetic' | 'number';
  label?: string;
  index?: number;
}

export default function SectionDivider({ variant, label = '', index = 1 }: SectionDividerProps) {
  const items = Array.from({ length: 10 }, (_, i) => label.toUpperCase() + (i % 2 === 0 ? ' ◆ ' : ' → '));
  const text = items.join(' ');

  if (variant === 'kinetic') {
    return (
      <div
        className="relative w-full overflow-hidden bg-surface-mid select-none"
        style={{ borderTop: '1px solid #2a2a28', borderBottom: '1px solid #2a2a28' }}
        aria-hidden="true"
      >
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: '10%', background: 'linear-gradient(to right, #161615, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{ width: '10%', background: 'linear-gradient(to left, #161615, transparent)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, rgba(200,255,0,0.25), transparent)' }}
        />
        <div className="marquee-row py-5 md:py-6">
          <div className="marquee-content-left whitespace-nowrap" style={{ animationDuration: '22s' }}>
            <span className="font-display text-[clamp(1.2rem,3vw,2rem)] font-black uppercase tracking-[0.08em]" style={{ color: 'rgba(200,255,0,0.18)' }}>
              {text}{text}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.35em] px-4 py-1.5 rounded-full"
            style={{
              color: 'rgba(200,255,0,0.55)',
              border: '1px solid rgba(200,255,0,0.15)',
              background: 'rgba(22,22,21,0.7)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden bg-surface select-none"
      style={{ borderTop: '1px solid #2a2a28', borderBottom: '1px solid #2a2a28' }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <span
          className="font-display font-black leading-none"
          style={{ fontSize: 'clamp(8rem, 25vw, 18rem)', color: 'rgba(232,232,227,0.025)', letterSpacing: '-0.05em', lineHeight: 1 }}
        >
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,255,0,0.03), transparent)' }}
      />
      <div className="relative z-10 flex items-center justify-between max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gray-soft/40">
          Section {String(index).padStart(2, '0')}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.35em] px-4 py-1.5 rounded-full"
          style={{ color: 'rgba(200,255,0,0.5)', border: '1px solid rgba(200,255,0,0.12)', background: 'rgba(13,13,12,0.6)' }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
