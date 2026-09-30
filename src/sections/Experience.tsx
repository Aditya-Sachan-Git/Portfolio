import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { experience } from '@/data/experience'

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const entry = experience[0]

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      /* Header */
      gsap.from('.exp-label', {
        opacity: 0, y: 18, duration: 0.6,
        scrollTrigger: { trigger: '.exp-label', start: 'top 85%' },
      })
      gsap.from('.exp-heading', {
        clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.exp-heading', start: 'top 85%' },
      })

      /* Timeline spine draws into place */
      gsap.from('.exp-spine', {
        scaleY: 0, transformOrigin: 'top center', duration: 1.4, ease: 'power4.out',
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 80%' },
      })

      /* Year badge */
      gsap.from('.exp-year', {
        opacity: 0, scale: 0.9, duration: 0.5,
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 78%' },
      })

      /* Company + role */
      gsap.from('.exp-company', {
        opacity: 0, x: -20, duration: 0.6,
        scrollTrigger: { trigger: '.exp-company', start: 'top 82%' },
      })

      /* Period */
      gsap.from('.exp-period', {
        opacity: 0, y: 12, duration: 0.5,
        scrollTrigger: { trigger: '.exp-period', start: 'top 85%' },
      })

      /* Tags */
      gsap.from('.exp-tag', {
        opacity: 0, y: 10, duration: 0.4, stagger: 0.08,
        scrollTrigger: { trigger: '.exp-tags', start: 'top 85%' },
      })

      /* Responsibilities */
      gsap.from('.exp-resp', {
        opacity: 0, y: 14, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.exp-responsibilities', start: 'top 82%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-12 sm:py-16 md:py-18 lg:py-16"
    >
      <div className="page-frame">

        {/* ── Header ── */}
        <div className="mb-12 sm:mb-16 md:mb-18 lg:mb-16">
          <span
            className="exp-label mb-3 sm:mb-4 block text-sm md:text-[15px] uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            05 / Experience
          </span>

          <h2
            className="exp-heading font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-primary)',
              clipPath: 'inset(0 0 0 0)',
            }}
          >
            Experience<span style={{ color: 'var(--color-accent)' }}>.</span>
          </h2>
        </div>

        {/* ── Editorial Timeline: 12-Column Balanced Architecture (Left: Year | Center: UL | Right: Company) ── */}
        <div className="exp-timeline relative flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 items-start">

          {/* Timeline spine (mobile absolute line, desktop column line) */}
          <div className="absolute left-0 lg:hidden top-0 bottom-0 flex flex-col items-center z-0">
            <div
              className="exp-spine w-px flex-1"
              style={{ backgroundColor: 'var(--color-surface-border)' }}
            />
          </div>

          {/* Cols 1–3: Year marker + Desktop spine (Left) */}
          <div className="order-1 lg:order-1 lg:col-span-3 relative z-10 mb-6 sm:mb-8 lg:mb-0 pl-7 sm:pl-8 lg:pl-0">
            <div className="exp-year flex items-center gap-3 lg:gap-4">
              <div
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <span
                className="font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                  lineHeight: '1',
                  color: 'var(--color-text-primary)',
                  letterSpacing: 'var(--tracking-tighter)',
                }}
              >
                {entry.year}
              </span>
            </div>
            {/* Desktop spine rule beneath year */}
            <div
              className="exp-spine hidden lg:block mt-6 h-20 lg:h-20 w-px ml-1"
              style={{ backgroundColor: 'var(--color-surface-border)' }}
            />
          </div>

          {/* Cols 4–9: Responsibilities UL (Centered) */}
          <div className="order-3 lg:order-2 lg:col-span-6 lg:col-start-4 pl-7 sm:pl-8 lg:pl-0 mb-8 lg:mb-0">
            <ul className="exp-responsibilities space-y-3 md:space-y-3.5 w-full">
              {entry.description.map((item, i) => (
                <li
                  key={i}
                  className="exp-resp flex gap-3 text-[15px] md:text-base"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.7',
                  }}
                >
                  <span
                    className="mt-1 shrink-0 text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* End marker */}
            <div className="mt-8 sm:mt-10 flex items-center gap-4">
              <div
                className="h-px flex-1 max-w-32"
                style={{ backgroundColor: 'var(--color-surface-border)' }}
              />
              <span
                className="text-sm uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                END / 05
              </span>
            </div>
          </div>

          {/* Cols 10–12: Company + Role + Dates + Tags (Right End) */}
          <div className="order-2 lg:order-3 lg:col-span-3 lg:col-start-10 pl-7 sm:pl-8 lg:pl-0 lg:ml-auto w-full mb-8 lg:mb-0 flex flex-col lg:items-end lg:text-right">
            <div className="exp-company mb-4">
              <h3
                className="font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {entry.company}
              </h3>
              <span
                className="mt-1 block text-sm md:text-[15px] uppercase tracking-[0.08em]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {entry.role}
              </span>
            </div>

            {/* Period */}
            <div className="exp-period flex items-center lg:justify-end gap-3 mb-6">
              <span
                className="text-sm uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {entry.startMonth}
              </span>
              <div className="h-px w-6" style={{ backgroundColor: 'var(--color-surface-border)' }} />
              <span
                className="text-sm uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {entry.endMonth}
              </span>
            </div>

            {/* Tags */}
            <div className="exp-tags flex flex-wrap gap-2 lg:justify-end">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="exp-tag inline-block border border-[var(--color-surface-border)] px-3 py-1.5 text-sm uppercase tracking-[0.06em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
