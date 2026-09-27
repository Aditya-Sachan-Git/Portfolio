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
      className="relative flex min-h-screen flex-col"
      style={{ paddingTop: 'var(--nav-height)' }}
    >
      {/* ── Top metadata bar ─────────────────── */}
      <div className="px-[var(--content-padding)] pt-6 md:pt-10 lg:pt-14">
        <div className="mx-auto flex max-w-[var(--max-width)] items-center justify-between">
          {/* Name label */}
          <div className="hero-name flex items-center gap-4">
            <span
              className="text-[11px] font-medium uppercase tracking-[0.2em] md:text-xs"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {personal.name.full}
            </span>
          </div>

          {/* Top-right coordinate */}
          <span
            className="hero-coord hidden text-[10px] uppercase tracking-[0.15em] md:block"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-muted)',
            }}
          >
            01 / 00
          </span>
        </div>

        {/* Thin decorative rule */}
        <div className="mx-auto max-w-[var(--max-width)]">
          <div
            className="hero-rule mt-4 h-px"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
        </div>
      </div>

      {/* ── Main composition ─────────────────── */}
      <div className="flex flex-1 items-center px-[var(--content-padding)]">
        <div className="mx-auto w-full max-w-[var(--max-width)]">

          {/* Headline + Portrait ─────────────── */}
          <div className="relative py-6 md:py-0">

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
                  fontSize: 'clamp(2rem, 5.5vw, 7rem)',
                  lineHeight: '1.1',
                  letterSpacing: 'var(--tracking-tight)',
                  color: 'var(--color-text-primary)',
                }}
              >
                I Build
              </span>
            </div>

            {/* Line 2: INTELLIGENT — the dominant visual element */}
            <div
              className="hero-line-2 relative z-[3] -mt-1 md:-mt-2"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              <span
                className="block font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 10.5vw, 12rem)',
                  lineHeight: '0.85',
                  letterSpacing: 'var(--tracking-tighter)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Intelligent
              </span>
            </div>

            {/* Line 3: SYSTEMS. — accent-colored period */}
            <div
              className="hero-line-3 relative z-[3] md:z-[1] mt-1 md:mt-0"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              <span
                className="block font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5.5vw, 7rem)',
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

            {/* ── Portrait ──────────────────────
                 z-2 sits between z-1 text (behind)
                 and z-3 "INTELLIGENT" (in front),
                 creating editorial depth layering.
                 On mobile, all text is z-3 so text
                 is always readable.
                 ─────────────────────────────── */}
            <div
              className="hero-portrait absolute z-[2] overflow-hidden
                right-0 top-[20%] w-[44%]
                md:right-0 md:top-[5%] md:w-[38%]
                lg:right-[2%] lg:top-[-8%] lg:w-[33%]
                xl:right-[4%] xl:top-[-12%] xl:w-[29%]"
              style={{ clipPath: 'inset(0 0 0 0)' }}
            >
              {/* Thin accent line — left edge */}
              <div
                className="absolute left-0 top-0 bottom-0 z-[1] w-[2px]"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  opacity: 0.5,
                }}
              />

              {/* Portrait image with editorial monochrome treatment */}
              <img
                src={personal.portrait}
                alt={`Portrait of ${personal.name.full}`}
                className="hero-portrait-img w-full object-cover object-top"
                width={600}
                height={800}
                fetchPriority="high"
                style={{
                  aspectRatio: '3 / 4',
                  filter: 'grayscale(1) sepia(0.1) contrast(1.08) brightness(0.82)',
                }}
              />

              {/* Bottom fade — blends portrait into the dark background */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 50%, var(--color-surface-primary) 100%)',
                  opacity: 0.6,
                }}
              />
            </div>

            {/* Coordinate marker near portrait */}
            <span
              className="hero-coord absolute z-[4] hidden text-[10px] uppercase tracking-[0.15em] md:block
                right-0 bottom-[-12%]
                lg:right-[2%] lg:bottom-[-15%]"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)',
              }}
            >
              SYSTEM / 001
            </span>
          </div>

          {/* ── Identity ─────────────────────── */}
          <div className="hero-identity relative z-[4] mt-8 md:mt-12 lg:mt-16">
            <div className="flex flex-col gap-0.5">
              {personal.roles.map((role) => (
                <span
                  key={role}
                  className="text-[11px] font-medium uppercase tracking-[0.15em] md:text-xs"
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
            className="hero-keywords relative z-[4] mt-3 text-[10px] tracking-[0.1em] md:mt-4 md:text-[11px]"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-muted)',
            }}
          >
            LLMs · Machine Learning · Federated Learning · Explainable AI
          </p>

          {/* ── CTAs ─────────────────────────── */}
          <div className="relative z-[4] mt-8 flex flex-wrap items-center gap-4 md:mt-10 md:gap-6">
            <a
              href="#work"
              className="hero-cta hero-cta-primary inline-flex items-center px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] md:px-6 md:py-3 md:text-xs"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              View My Work<span aria-hidden="true">&#8195;→</span>
            </a>
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta hero-cta-secondary inline-flex items-center text-[11px] font-medium uppercase tracking-[0.15em] md:text-xs"
              style={{ fontFamily: 'var(--font-body)' }}
              aria-label="Download CV (opens in new tab)"
            >
              Download CV<span aria-hidden="true">&#8195;→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Side coordinate (vertical text, xl+ only) ── */}
      <span
        className="hero-coord absolute left-4 top-1/2 hidden xl:block"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: 'var(--color-text-muted)',
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
        }}
      >
        N 20° 35′
      </span>

      {/* ── Scroll indicator ─────────────────── */}
      <div className="hero-scroll-indicator flex flex-col items-center gap-2 pb-6 md:pb-10">
        <span
          className="text-[9px] uppercase tracking-[0.25em] md:text-[10px]"
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
