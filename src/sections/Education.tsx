import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { education } from '@/data/experience'

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const primary = education.filter((e) => e.primary)
  const secondary = education.filter((e) => !e.primary)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      /* Header */
      gsap.from('.edu-label', {
        opacity: 0, y: 18, duration: 0.6,
        scrollTrigger: { trigger: '.edu-label', start: 'top 85%' },
      })
      gsap.from('.edu-heading', {
        clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.edu-heading', start: 'top 85%' },
      })

      /* Primary entry */
      gsap.from('.edu-primary-entry', {
        opacity: 0, y: 25, duration: 0.7,
        scrollTrigger: { trigger: '.edu-primary-entry', start: 'top 82%' },
      })
      gsap.from('.edu-primary-grade', {
        opacity: 0, scale: 0.9, duration: 0.6, delay: 0.2,
        scrollTrigger: { trigger: '.edu-primary-entry', start: 'top 82%' },
      })

      /* Secondary entries */
      gsap.from('.edu-secondary-entry', {
        opacity: 0, y: 18, duration: 0.5, stagger: 0.2,
        scrollTrigger: { trigger: '.edu-secondary', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="page-frame">

        {/* ── Header ── */}
        <div className="mb-16 md:mb-24 lg:mb-32">
          <span
            className="edu-label mb-4 block text-xs md:text-[13px] uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            06 / Education
          </span>

          <h2
            className="edu-heading font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-primary)',
              clipPath: 'inset(0 0 0 0)',
            }}
          >
            Education<span style={{ color: 'var(--color-accent)' }}>.</span>
          </h2>
        </div>

        {/* ── Primary: University ── */}
        {primary.map((entry) => (
          <div
            key={entry.id}
            className="edu-primary-entry grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-start mb-16 md:mb-20"
          >
            {/* Institution + Degree */}
            <div className="lg:col-span-8">
              <h3
                className="font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {entry.shortName}
              </h3>
              <span
                className="mt-2 block text-[12px] md:text-[13px] uppercase tracking-[0.08em]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {entry.degree}
              </span>
              <span
                className="mt-1 block text-xs uppercase tracking-[0.1em]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {entry.year}
              </span>
            </div>

            {/* Grade — large typographic element */}
            <div className="edu-primary-grade lg:col-span-4 mt-6 lg:mt-0 lg:text-right">
              <span
                className="block font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  lineHeight: '1',
                  color: 'var(--color-text-primary)',
                  letterSpacing: 'var(--tracking-tighter)',
                }}
              >
                {entry.grade}
              </span>
              <span
                className="mt-1 block text-xs uppercase tracking-[0.15em]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {entry.gradeLabel}
              </span>
            </div>
          </div>
        ))}

        {/* ── Secondary: Schools ── */}
        <div className="edu-secondary space-y-6 md:space-y-8 w-full">
          {secondary.map((entry) => (
            <div
              key={entry.id}
              className="edu-secondary-entry grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-baseline py-6 border-t border-[var(--color-surface-border)]"
            >
              {/* Institution */}
              <div className="lg:col-span-8">
                <h3
                  className="font-bold uppercase text-[15px] md:text-[17px]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    lineHeight: 'var(--leading-snug)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {entry.institution}
                </h3>
                <span
                  className="mt-1 block text-xs md:text-[13px] uppercase tracking-[0.08em]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {entry.board && `${entry.board} · `}{entry.year}
                </span>
              </div>

              {/* Grade — aligned to right columns */}
              <div className="lg:col-span-4 mt-2 lg:mt-0 lg:text-right">
                <span
                  className="text-[20px] md:text-[22px] font-bold tabular-nums"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {entry.grade}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── End marker ── */}
        <div className="mt-16 md:mt-24 flex items-center gap-4">
          <div
            className="h-px flex-1 max-w-24"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
          <span
            className="text-xs uppercase tracking-[0.15em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            END / 06
          </span>
        </div>

      </div>
    </section>
  )
}
