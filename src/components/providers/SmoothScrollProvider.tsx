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
    let lenis: Lenis | null = null;
    let refreshTimer = 0;
    let timerId = 0;
    let cancelled = false;

    const onRaf = (time: number) => {
      if (!aliveRef.current || !lenis) return;
      lenis.raf(time * 1000);
    };

    const start = () => {
      if (cancelled || aliveRef.current) return;
      const reduced = prefersReducedMotion();
      lenis = new Lenis({
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
      gsap.ticker.add(onRaf);
      gsap.ticker.lagSmoothing(0);

      refreshTimer = window.setTimeout(() => {
        if (aliveRef.current) ScrollTrigger.refresh();
      }, 400);
    };

    // After the intro, so this layout pass is outside the initial interaction window.
    timerId = window.setTimeout(start, 7000);

    return () => {
      cancelled = true;
      if (timerId) window.clearTimeout(timerId);
      aliveRef.current = false;
      gsap.ticker.remove(onRaf);
      delete window.__lenis;
      lenis?.destroy();
      lenisRef.current = null;
      if (refreshTimer) window.clearTimeout(refreshTimer);
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
