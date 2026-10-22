'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/site';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const LenisContext = createContext<React.RefObject<Lenis | null> | null>(null);

export const useLenis = () => useContext(LenisContext);

/**
 * Lenis is kept for scroll events and ScrollTrigger sync.
 * smoothWheel and syncTouch stay off so wheel, trackpad, touch, keyboard,
 * and the scrollbar use the browser's own scrolling.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const aliveRef = useRef(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: false,
      syncTouch: false,
      anchors: false,
      lerp: 1,
      duration: reduced ? 0 : 0,
      overscroll: true,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;
    aliveRef.current = true;

    lenis.on('scroll', ScrollTrigger.update);

    const onRaf = (time: number) => {
      if (!aliveRef.current) return;
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    const refreshTimer = setTimeout(() => {
      if (aliveRef.current) ScrollTrigger.refresh();
    }, 400);

    return () => {
      aliveRef.current = false;
      gsap.ticker.remove(onRaf);
      delete window.__lenis;
      lenis.destroy();
      clearTimeout(refreshTimer);
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
