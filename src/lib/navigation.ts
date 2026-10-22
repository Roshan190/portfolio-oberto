'use client';

import { useRouter } from 'next/navigation';
import { prefersReducedMotion } from '@/lib/site';

function scrollToHash(hash: string) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
  if (!hash || hash === 'top') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  let attempts = 0;
  const tryScroll = () => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior, block: 'start' });
      return;
    }
    if (attempts < 30) {
      attempts += 1;
      requestAnimationFrame(tryScroll);
    }
  };
  tryScroll();
}

export const useHandleLinkClick = (setIsMenuOpen?: (isOpen: boolean) => void) => {
  const router = useRouter();

  return (href: string) => {
    const [path, hash] = href.replace('#', '/#').split('/#');
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const nextPath = (path || '').replace(/\/$/, '') || '/';
    if (setIsMenuOpen) setIsMenuOpen(false);

    const current = currentPath.endsWith('/portfolio-oberto') ? '/' : currentPath.replace('/portfolio-oberto', '') || '/';
    const target = nextPath || '/';

    if (target && target !== '/' && target !== current) {
      router.push(href, { scroll: false });
      window.setTimeout(() => scrollToHash(hash), 350);
      return;
    }

    if (target === '/' && current !== '/' && current !== '') {
      router.push(href, { scroll: false });
      window.setTimeout(() => scrollToHash(hash), 350);
      return;
    }

    scrollToHash(hash);
    if (hash) window.history.pushState(null, '', `#${hash}`);
  };
};
