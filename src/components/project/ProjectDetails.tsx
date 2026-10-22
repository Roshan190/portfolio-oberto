'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Link } from 'next-transition-router';
import { gsap, useGSAP } from '@/lib/gsap';
import AnimatedHeading from '@/components/ui/AnimateHeading';
import { FaArrowUp, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '@/lib/projects';
import { prefersReducedMotion, profile } from '@/lib/site';

export default function ProjectDetails({ project }: { project: Project }) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // ── Section label: clip-path reveal from bottom ──
      const labels = gsap.utils.toArray<HTMLElement>('.section-label');
      labels.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)', y: 12, opacity: 0 },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });

      // ── Section underline: draws left-to-right ──
      const underlines = gsap.utils.toArray<HTMLElement>('.section-underline');
      underlines.forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });

      // ── Section content: blur + fade + slide up with stagger ──
      const sections = gsap.utils.toArray<HTMLElement>('.animate-section');
      sections.forEach((section) => {
        const children = section.querySelectorAll<HTMLElement>('.animate-child');
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { y: 28, opacity: 0, filter: 'blur(6px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.75,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 88%', once: true },
            }
          );
        } else {
          gsap.fromTo(
            section,
            { y: 36, opacity: 0, filter: 'blur(5px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 88%', once: true },
            }
          );
        }
      });

      // ── Images: cinematic scale + fade + subtle blur ──
      const images = gsap.utils.toArray<HTMLElement>('.project-image');
      images.forEach((img, i) => {
        gsap.fromTo(
          img,
          { scale: 0.96, opacity: 0, y: 50, filter: 'blur(8px)' },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: img, start: 'top 85%', once: true },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section ref={containerRef} className="min-h-screen bg-[#080807] text-white px-4 sm:px-6 md:px-10 lg:px-14 py-12 md:py-20 relative">
      <div className="max-w-[1200px] mx-auto">
      {/* Back Button */}
      <div>
        <Link
          href="/#projects"
          className="inline-flex items-center text-neon hover:text-light transition-colors mb-10 font-mono text-sm uppercase tracking-widest group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300 inline-block mr-2">←</span>
          Back to portfolio
        </Link>
      </div>

      {/* Header & External Links */}
      <div className="mb-8">
        <span className="text-warm/50 font-mono text-sm uppercase tracking-[0.2em] block mb-4">Project</span>
        <div className="flex items-start justify-between gap-6 mb-6 md:mb-0">
          <AnimatedHeading
            text={project.title}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tight leading-none uppercase flex-1 text-light"
          />
          <div className="hidden md:flex gap-4 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-white hover:border-[#3a3a38] hover:bg-[#252523] transition-all duration-300"
                aria-label="GitHub Repository"
              >
                <FaGithub className="text-2xl" />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== project.github && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-white hover:border-[#3a3a38] hover:bg-[#252523] transition-all duration-300"
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt className="text-xl" />
              </a>
            )}
          </div>
        </div>

        {/* Mobile External Links */}
        <div className="flex md:hidden gap-4 mt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-white hover:border-[#3a3a38] hover:bg-[#252523] transition-all duration-300"
              aria-label="GitHub Repository"
            >
              <FaGithub className="text-xl" />
            </a>
          )}
          {project.liveUrl && project.liveUrl !== project.github && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-white hover:border-[#3a3a38] hover:bg-[#252523] transition-all duration-300"
              aria-label="Live Demo"
            >
              <FaExternalLinkAlt className="text-lg" />
            </a>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-12 mt-6 animate-section">
        <div className="mb-3 overflow-hidden">
          <strong className="section-label text-sm md:text-base font-mono uppercase tracking-[0.2em] text-neon block">Stack</strong>
        </div>
        <div className="section-underline w-full h-px bg-border-subtler mb-5" />
        <p className="animate-child text-lg sm:text-xl text-white/70 font-sans leading-relaxed">
          {project.tech?.join(' · ')}
        </p>
      </div>

      {/* Description */}
      <div className="mb-12 animate-section">
        <div className="mb-3 overflow-hidden">
          <strong className="section-label text-sm md:text-base font-mono uppercase tracking-[0.2em] text-neon block">Description</strong>
        </div>
        <div className="section-underline w-full h-px bg-border-subtler mb-5" />
        <p className="animate-child text-lg sm:text-xl text-white/70 font-sans leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* My Role */}
      {project.myRole?.length > 0 && (
        <div className="mb-16 animate-section">
          <div className="mb-3 overflow-hidden">
            <strong className="section-label text-sm md:text-base font-mono uppercase tracking-[0.2em] text-neon block">Notes</strong>
          </div>
          <div className="section-underline w-full h-px bg-border-subtler mb-5" />
          <ul className="space-y-4 mt-2">
            {project.myRole.map((role, i) => (
              <li key={i} className="animate-child flex items-start gap-3 text-lg sm:text-xl text-white/70 font-sans">
                <span className="text-neon mt-1 flex-shrink-0">›</span>
                {role}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Project Image Showcase */}
      <div className="flex flex-col gap-8 mb-16">
        {project.images?.map((img, i) => {
          const isLoaded = loadedImages[i];
          const accent = project.accentColor;

          if (project.isMobile) {
            // ── Phone mockup for mobile apps ──
            return (
              <div key={`${project.slug}-img-${i}`} className="project-image flex justify-center">
                <div
                  style={{
                    width: 'min(320px, 70vw)',
                    aspectRatio: '9/19.5',
                    position: 'relative',
                    filter: accent ? `drop-shadow(0 24px 60px ${accent}55)` : 'drop-shadow(0 24px 60px rgba(0,0,0,0.6))',
                  }}
                >
                  {/* Outer bezel */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '44px',
                    background: 'linear-gradient(145deg, #2e2e2e 0%, #111 60%, #222 100%)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.09), inset 0 1px 0 rgba(255,255,255,0.07)',
                    overflow: 'hidden',
                    padding: '10px',
                  }}>
                    {/* Screen */}
                    <div style={{
                      position: 'relative',
                      width: '100%', height: '100%',
                      borderRadius: '34px',
                      overflow: 'hidden',
                      background: '#000',
                    }}>
                      {/* Dynamic island */}
                      <div style={{
                        position: 'absolute', top: '12px', left: '50%',
                        transform: 'translateX(-50%)',
                        width: '72px', height: '22px',
                        background: '#000',
                        borderRadius: '20px',
                        zIndex: 10,
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
                      }} />
                      {/* Skeleton */}
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-[#121211] flex flex-col items-center justify-center gap-3 z-0 animate-pulse">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: accent || '#C8FF00', boxShadow: `0 0 12px ${accent || '#C8FF00'}99` }}
                          />
                        </div>
                      )}
                      <a href={img} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative z-10">
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${i + 1}`}
                          fill
                          sizes="320px"
                          priority={i === 0}
                          onLoad={() => handleImageLoad(i)}
                          className={`object-cover object-top transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMTkxNyIvPjwvc3ZnPg=="
                        />
                      </a>
                    </div>
                  </div>
                  {/* Power button */}
                  <div style={{ position: 'absolute', right: '-4px', top: '22%', width: '4px', height: '44px', background: 'linear-gradient(180deg,#2a2a2a,#1a1a1a)', borderRadius: '0 3px 3px 0' }} />
                  {/* Volume buttons */}
                  <div style={{ position: 'absolute', left: '-4px', top: '18%', width: '4px', height: '32px', background: 'linear-gradient(180deg,#2a2a2a,#1a1a1a)', borderRadius: '3px 0 0 3px' }} />
                  <div style={{ position: 'absolute', left: '-4px', top: '30%', width: '4px', height: '32px', background: 'linear-gradient(180deg,#2a2a2a,#1a1a1a)', borderRadius: '3px 0 0 3px' }} />
                </div>
              </div>
            );
          }

          // ── Wide landscape for web projects ──
          return (
            <div
              key={`${project.slug}-img-${i}`}
              className="project-image overflow-hidden rounded-2xl bg-[#121211] border border-[#1f1f1d] relative aspect-[16/10] w-full transition-shadow duration-500"
              style={{
                maxHeight: '900px',
                boxShadow: accent
                  ? `0 8px 60px -10px ${accent}66, 0 0 0 1px ${accent}33`
                  : '0 8px 40px -10px rgba(0,0,0,0.5)',
              }}
            >
              {!isLoaded && (
                <div className="absolute inset-0 bg-[#121211] flex flex-col items-center justify-center gap-3 z-0 animate-pulse">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: accent || '#C8FF00', boxShadow: `0 0 16px ${accent || '#C8FF00'}99` }}
                  />
                  <span className="font-mono text-xs uppercase tracking-widest text-white/30">Loading Media...</span>
                </div>
              )}
              <a href={img} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative z-10">
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority={i === 0}
                  onLoad={() => handleImageLoad(i)}
                  className={`object-contain w-full h-full transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMTkxNyIvPjwvc3ZnPg=="
                />
              </a>
            </div>
          );
        })}
      </div>

      {/* Footer Contact CTA & Scroll to Top */}
      <div className="relative flex justify-center py-10">
        <div className="text-center">
          <p className="text-muted text-lg">GitHub and LinkedIn</p>
          <p className="text-xl font-semibold text-[#bab6b3]">
            <a href={profile.github} className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span className="px-3 text-white/30">/</span>
            <a href={profile.linkedin} className="hover:text-white transition" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
          {project.note ? <p className="text-sm text-white/50 mt-3">{project.note}</p> : null}
        </div>
        <button
          onClick={scrollToTop}
          className="absolute right-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-muted hover:text-neon hover:border-neon hover:bg-neon/10 transition-all duration-300 group focus:outline-none"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  </section>
);
}
