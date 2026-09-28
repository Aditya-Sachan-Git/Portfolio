import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { projects } from '@/data/projects'

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const fedllm = projects[0]
  const healthcare = projects[1]

  /* ─────────────────────────────────────────────
     Scroll-triggered animations
     ───────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      /* ── Section header reveal ── */
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.work-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      headerTl
        .from('.work-section-label', { opacity: 0, y: 20, duration: 0.6 })
        .from('.work-heading', {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1,
          ease: 'power4.out',
        }, 0.2)
        .from('.work-support', { opacity: 0, y: 12, duration: 0.5 }, 0.6)
        .from('.work-header-rule', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
        }, 0.4)

      /* ── FedLLM project reveal ── */
      const fedllmProjectTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.fedllm-project',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      fedllmProjectTl
        .from('.fedllm-meta', { opacity: 0, y: 20, duration: 0.5 })
        .from('.fedllm-info-title', { opacity: 0, y: 20, duration: 0.6 }, 0.2)
        .from('.fedllm-info-desc', { opacity: 0, y: 15, duration: 0.5, stagger: 0.1 }, 0.35)
        .from('.fedllm-tech', { opacity: 0, y: 15, duration: 0.5 }, 0.5)
        .from('.fedllm-cta', { opacity: 0, y: 12, duration: 0.5 }, 0.6)

      /* ── Project separator ── */
      gsap.from('.work-separator', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        scrollTrigger: {
          trigger: '.work-separator',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })

      /* ── Healthcare project reveal ── */
      const healthTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.health-project',
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
      healthTl
        .from('.health-meta', { opacity: 0, y: 15, duration: 0.5 })
        .from('.health-title', {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.9,
          ease: 'power4.out',
        }, 0.2)
        .from('.health-desc', { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 }, 0.4)
        .from('.health-tech', { opacity: 0, y: 10, duration: 0.4 }, 0.55)
        .from('.health-cta', { opacity: 0, y: 10, duration: 0.4 }, 0.65)
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  /* ─────────────────────────────────────────────
     Render
     ───────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="page-frame">

        {/* ════════════════════════════════════════
            Section Header
           ════════════════════════════════════════ */}
        <div className="work-header mb-16 md:mb-24 lg:mb-32">
          <span
            className="work-section-label mb-4 block text-base uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            02 / Selected Work
          </span>

          <h2
            className="work-heading font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-primary)',
              clipPath: 'inset(0 0 0 0)',
            }}
          >
            Selected
            <br />
            Work
            <span style={{ color: 'var(--color-accent)' }}>.</span>
          </h2>

          <p
            className="work-support mt-4 max-w-md text-base"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Selected systems, experiments and applications.
          </p>

          <div
            className="work-header-rule mt-6 h-px w-16"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
        </div>

        {/* ════════════════════════════════════════
            Project 01 — FedLLM
           ════════════════════════════════════════ */}
        <article id="fedllm" className="fedllm-project">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-start">

            {/* Left: Metadata */}
            <div className="fedllm-meta lg:col-span-3 mb-6 lg:mb-0">
              <span
                className="block font-bold text-2xl md:text-3xl lg:text-4xl tabular-nums tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
              >
                {fedllm.number}
              </span>
              <div
                className="my-3 h-px w-10"
                style={{ backgroundColor: 'var(--color-surface-border)' }}
              />
              <span
                className="block text-base md:text-[17px] uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {fedllm.category} · {fedllm.categoryLabel}
              </span>
            </div>

            {/* Right: Info + Tech + GitHub Action */}
            <div className="lg:col-span-8 lg:col-start-5 space-y-6 lg:ml-auto w-full">
              <div className="flex flex-col lg:items-end lg:text-right">
                <h3
                  className="fedllm-info-title font-bold uppercase text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-tighter"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {fedllm.title}<span style={{ color: 'var(--color-accent)' }}>.</span>
                </h3>
                <p
                  className="fedllm-info-desc mt-3 text-base md:text-[17px] uppercase tracking-[0.08em]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.4',
                  }}
                >
                  {fedllm.fullTitle}
                </p>
              </div>

              <p
                className="fedllm-info-desc text-base md:text-[18px] w-full"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {fedllm.description}
              </p>

              {/* Key details */}
              <ul className="fedllm-info-desc space-y-2 pt-1 w-full">
                {fedllm.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base md:text-[17px]"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="fedllm-tech pt-2">
                <span
                  className="block text-base uppercase tracking-[0.15em] mb-3"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                >
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {fedllm.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block border border-[var(--color-surface-border)] px-3.5 py-1.5 text-base uppercase tracking-[0.06em]"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Interaction: View on GitHub */}
              <div className="fedllm-cta pt-4">
                <a
                  href="https://github.com/Aditya-Sachan-Git/FedLLM-for-Explainable-Traffic-Prediction.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base md:text-[17px] uppercase tracking-[0.16em] font-medium group transition-colors"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
                  aria-label="View FedLLM repository on GitHub (opens in new tab)"
                >
                  <span className="group-hover:text-[var(--color-accent)] transition-colors">
                    View on GitHub
                  </span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-[var(--color-accent)]">
                    →
                  </span>
                </a>
              </div>
            </div>

          </div>
        </article>

        {/* ════════════════════════════════════════
            Separator
           ════════════════════════════════════════ */}
        <div
          className="work-separator my-16 md:my-24 lg:my-32 h-px"
          style={{ backgroundColor: 'var(--color-surface-border)' }}
        />

        {/* ════════════════════════════════════════
            Project 02 — Healthcare Assistant
           ════════════════════════════════════════ */}
        <article id="healthcare-assistant" className="health-project">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-start">

            {/* Left: Metadata */}
            <div className="health-meta lg:col-span-3 mb-6 lg:mb-0">
              <span
                className="block font-bold text-2xl md:text-3xl lg:text-4xl tabular-nums tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
              >
                {healthcare.number}
              </span>
              <div
                className="my-3 h-px w-10"
                style={{ backgroundColor: 'var(--color-surface-border)' }}
              />
              <span
                className="block text-base md:text-[17px] uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {healthcare.category} · {healthcare.categoryLabel}
              </span>
            </div>

            {/* Right: Info + Tech + GitHub Action */}
            <div className="lg:col-span-8 lg:col-start-5 space-y-6 lg:ml-auto w-full">
              <div className="flex flex-col lg:items-end lg:text-right">
                <h3
                  className="health-title font-bold uppercase text-[clamp(1.75rem,4vw,4rem)] leading-[0.95] tracking-tighter"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  AI-Powered Multilingual
                  <br />
                  Healthcare Assistant<span style={{ color: 'var(--color-accent)' }}>.</span>
                </h3>
              </div>

              <p
                className="health-desc text-base md:text-[18px] w-full"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {healthcare.description}
              </p>

              {/* Key details */}
              <ul className="health-desc space-y-2 pt-1 w-full">
                {healthcare.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base md:text-[17px]"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="health-tech pt-2">
                <span
                  className="block text-base uppercase tracking-[0.15em] mb-3"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                >
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {healthcare.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block border border-[var(--color-surface-border)] px-3.5 py-1.5 text-base uppercase tracking-[0.06em]"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Interaction: View on GitHub */}
              <div className="health-cta pt-4">
                <a
                  href="https://github.com/Aditya-Sachan-Git/AI-Powered_Multilingual_Healthcare_Assistant.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base md:text-[17px] uppercase tracking-[0.16em] font-medium group transition-colors"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
                  aria-label="View Healthcare Assistant repository on GitHub (opens in new tab)"
                >
                  <span className="group-hover:text-[var(--color-accent)] transition-colors">
                    View on GitHub
                  </span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-[var(--color-accent)]">
                    →
                  </span>
                </a>
              </div>
            </div>

          </div>
        </article>

      </div>
    </section>
  )
}
