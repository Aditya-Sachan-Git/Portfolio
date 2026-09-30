import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { personal } from '@/data/personal'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  /* ─────────────────────────────────────────────
     Entrance animation timeline
     ───────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      /* Phase 1 — metadata + decorative rule */
      tl.from('.hero-name', { opacity: 0, y: 20, duration: 0.7 }, 0.2)
        .from('.hero-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.8 }, 0.4)

      /* Phase 2 — headline clip-path reveals */
        .from('.hero-line-1', {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.9,
        }, 0.6)
        .from('.hero-line-2', {
          clipPath: 'inset(0 100% 0 0)',
          y: 15,
          duration: 1.1,
          ease: 'power4.out',
        }, 0.8)
        .from('.hero-line-3', {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.9,
        }, 1.0)

      /* Phase 3 — portrait reveal (top-to-bottom) */
        .from('.hero-portrait', {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.3,
          ease: 'power4.out',
        }, 0.9)
        .from('.hero-portrait-img', {
          scale: 1.15,
          duration: 1.8,
          ease: 'power2.out',
        }, 0.9)

      /* Phase 4 — coordinate markers */
        .from('.hero-coord', {
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        }, 1.0)

      /* Phase 5 — identity, keywords, CTAs */
        .from('.hero-identity', { opacity: 0, y: 20, duration: 0.6 }, 1.4)
        .from('.hero-keywords', { opacity: 0, y: 15, duration: 0.5 }, 1.6)
        .from('.hero-cta', { opacity: 0, y: 15, duration: 0.5, stagger: 0.12 }, 1.7)

      /* Phase 6 — scroll indicator */
        .from('.hero-scroll-indicator', { opacity: 0, duration: 0.6 }, 2.0)
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  /* ─────────────────────────────────────────────
     Subtle portrait parallax on scroll
     ───────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-portrait-img', {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  /* ─────────────────────────────────────────────
     Render
     ───────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col justify-between"
      style={{ paddingTop: 'var(--nav-height)' }}
    >
      {/* ── Top metadata bar ─────────────────── */}
      <div className="pt-6 md:pt-10 lg:pt-14">
        <div className="page-frame flex items-center justify-between">
          {/* Top-right coordinate */}
          <span
            className="hero-coord hidden text-sm uppercase tracking-[0.15em] md:block"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-muted)',
            }}
          >
            01 / 00
          </span>
        </div>

        {/* Thin decorative rule */}
        <div className="page-frame">
          <div
            className="hero-rule mt-4 h-px"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
        </div>
      </div>

      {/* ── Main composition ─────────────────── */}
      <div className="flex flex-1 items-center py-8 sm:py-10 md:py-16">
        <div className="page-frame">
          <div className="relative w-full flex flex-col lg:flex-row lg:items-center justify-start gap-8 sm:gap-12 lg:gap-36 xl:gap-48">

            {/* Div 1: Left Headline + Identity + CTAs */}
            <div className="relative z-[3] w-full lg:w-auto lg:shrink-0">

              {/* ── Primary Identity Wordmark (Bridge) ── */}
              <div className="hero-name flex flex-col gap-1.5 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-bold uppercase tracking-[0.06em]"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.1rem, 1.5vw, 1.55rem)',
                      color: 'var(--color-text-primary)',
                      lineHeight: '1.2',
                    }}
                  >
                    {personal.name.full}
                  </span>
                </div>
                <div className="pl-4.5">
                  <span
                    className="text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.1em] sm:tracking-[0.16em] font-medium block"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    AI / ML RESEARCHER · SOFTWARE ENGINEER
                  </span>
                </div>
              </div>

              <h1>
                {/* Line 1: I BUILD */}
                <div
                  className="hero-line-1 relative z-[3] md:z-[1]"
                  style={{ clipPath: 'inset(0 0 0 0)' }}
                >
                  <span
                    className="block font-bold uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.75rem, 5.5vw, 6rem)',
                      lineHeight: '1.1',
                      letterSpacing: 'var(--tracking-tight)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    I Build
                  </span>
                </div>

                {/* Line 2: INTELLIGENT */}
                <div
                  className="hero-line-2 relative z-[3] -mt-1 md:-mt-2"
                  style={{ clipPath: 'inset(0 0 0 0)' }}
                >
                  <span
                    className="block font-bold uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.2rem, 7.5vw, 10rem)',
                      lineHeight: '0.85',
                      letterSpacing: 'var(--tracking-tighter)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Intelligent
                  </span>
                </div>

                {/* Line 3: SYSTEMS. */}
                <div
                  className="hero-line-3 relative z-[3] md:z-[1] mt-1 md:mt-0"
                  style={{ clipPath: 'inset(0 0 0 0)' }}
                >
                  <span
                    className="block font-bold uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.75rem, 5.5vw, 6rem)',
                      lineHeight: '1.1',
                      letterSpacing: 'var(--tracking-tight)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Systems
                    <span style={{ color: 'var(--color-accent)' }}>.</span>
                  </span>
                </div>
              </h1>

              {/* ── Identity ─────────────────────── */}
              <div className="hero-identity relative z-[4] mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                <div className="flex flex-col gap-0.5">
                  {personal.roles.map((role) => (
                    <span
                      key={role}
                      className="text-sm font-medium uppercase tracking-[0.12em] md:tracking-[0.15em] md:text-[15px]"
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Keywords ─────────────────────── */}
              <p
                className="hero-keywords relative z-[4] mt-2.5 sm:mt-3 text-xs sm:text-sm tracking-[0.06em] sm:tracking-[0.1em] md:mt-4 md:text-[15px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                }}
              >
                LLMs · Machine Learning · Federated Learning · Explainable AI
              </p>

              {/* ── CTAs ─────────────────────────── */}
              <div className="relative z-[4] mt-6 sm:mt-8 flex flex-wrap items-center gap-4 md:mt-10 md:gap-6"> 
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta hero-cta-secondary inline-flex items-center text-sm font-medium uppercase tracking-[0.15em] md:text-base min-h-[44px] py-2"
                  style={{ fontFamily: 'var(--font-body)' }}
                  aria-label="Download CV (opens in new tab)"
                >
                  Download CV<span aria-hidden="true">&#8195;→</span>
                </a>
              </div>
            </div>

            {/* Div 2: Right Portrait */}
            <div className="relative shrink-0 flex items-center">
              <div
                className="hero-portrait relative z-[2] overflow-hidden w-[75vw] sm:w-[50vw] md:w-[380px] lg:w-[340px] xl:w-[380px] max-w-[340px] sm:max-w-[400px]"
                style={{ clipPath: 'inset(0 0 0 0)' }}
              >
                {/* Thin accent line — left edge */}
                <div
                  className="absolute left-0 top-0 bottom-0 z-[1] w-px"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    opacity: 1.0,
                  }}
                />

                {/* Portrait image with natural but desaturated editorial treatment */}
                <img
                  src={personal.portrait}
                  alt={`Portrait of ${personal.name.full}`}
                  className="hero-portrait-img w-full object-cover"
                  width={600}
                  height={800}
                  fetchPriority="high"
                  style={{
                    aspectRatio: '3 / 4',
                    objectPosition: 'center 20%',
                    transform: 'scale(1.15)',
                    filter: 'saturate(0.85) contrast(1.05) brightness(0.95)',
                  }}
                />

                {/* Top fade — subtle edge blend */}
                <div
                  className="pointer-events-none absolute inset-0 z-[2]"
                  style={{
                    background:
                      'linear-gradient(to bottom, var(--color-surface-primary) 0%, transparent 10%)',
                  }}
                />

                {/* Bottom fade — aggressive blend into background */}
                <div
                  className="pointer-events-none absolute inset-0 z-[2]"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 40%, var(--color-surface-primary) 100%)',
                  }}
                />
              </div>

              {/* Coordinate marker near portrait */}
              <span
                className="hero-coord absolute -bottom-6 right-0 hidden text-sm uppercase tracking-[0.15em] md:block"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                }}
              >
                SYSTEM / 001
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────── */}
      <div className="hero-scroll-indicator flex flex-col items-center gap-2 pb-6 md:pb-10">
        <span
          className="text-sm uppercase tracking-[0.2em]"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-muted)',
          }}
        >
          Scroll to explore
        </span>
        <span
          className="inline-block text-sm animate-hero-scroll"
          style={{ color: 'var(--color-text-muted)' }}
        >
          ↓
        </span>
      </div>
    </section>
  )
}
