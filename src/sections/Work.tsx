import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { projects } from '@/data/projects'

/* ═══════════════════════════════════════════════════
   Sub-components: Architecture Visuals
   ═══════════════════════════════════════════════════ */

/** FedLLM architecture diagram — editorial research-lab style */
function FedLLMVisual() {
  return (
    <div className="fedllm-visual relative border border-[var(--color-surface-border)] bg-[var(--color-surface-elevated)] p-5 md:p-7 lg:p-8">
      {/* ── Header ── */}
      <div className="fedllm-header flex items-center justify-between mb-6 md:mb-8">
        <span
          className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.15em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          FedLLM Architecture
        </span>
        <span
          className="text-[8px] md:text-[9px] uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          SYS / 001
        </span>
      </div>

      {/* ── Decorative rule ── */}
      <div
        className="fedllm-connection mb-6 md:mb-8 h-px w-12"
        style={{ backgroundColor: 'var(--color-surface-border)' }}
      />

      {/* ── Architecture flow ── */}
      <div className="flex flex-col items-center">

        {/* ── Data Source ── */}
        <div className="fedllm-stage-data mb-3">
          <span
            className="text-[8px] uppercase tracking-[0.15em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            PeMS · Traffic Data
          </span>
        </div>

        {/* Connection down */}
        <div className="fedllm-connection w-px h-5" style={{ backgroundColor: 'var(--color-surface-border)' }} />

        {/* ── Local Clients row ── */}
        <div className="fedllm-stage-clients flex w-full justify-center gap-3 md:gap-6 my-3">
          <ClientNode label="Local Client A" detail="Data → Text" />
          <ClientNode label="Local Client B" detail="Data → Text" />
        </div>

        {/* ── Merge connection (two clients → one) ── */}
        <div className="relative w-full max-w-[280px] h-8 my-1">
          {/* Left vertical from Client A */}
          <div
            className="fedllm-connection absolute left-[25%] top-0 h-[45%] w-px"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
          {/* Right vertical from Client B */}
          <div
            className="fedllm-connection absolute right-[25%] top-0 h-[45%] w-px"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
          {/* Horizontal bridge */}
          <div
            className="fedllm-connection absolute left-[25%] right-[25%] top-[45%] h-px"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
          {/* Center junction dot */}
          <div
            className="fedllm-dot fedllm-dot-accent absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 h-[5px] w-[5px] rounded-full"
            style={{ backgroundColor: 'var(--color-text-muted)' }}
          />
          {/* Center vertical down */}
          <div
            className="fedllm-connection absolute left-1/2 top-[45%] -translate-x-1/2 h-[55%] w-px"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
        </div>

        {/* ── FedCSS Aggregation ── */}
        <div className="fedllm-stage-fedcss my-2">
          <ArchNode label="FedCSS" sublabel="Aggregation" />
        </div>

        {/* Connection down */}
        <div className="fedllm-connection w-px h-6" style={{ backgroundColor: 'var(--color-surface-border)' }} />
        {/* Junction dot */}
        <div
          className="fedllm-dot fedllm-dot-accent h-[5px] w-[5px] rounded-full"
          style={{ backgroundColor: 'var(--color-text-muted)' }}
        />
        <div className="fedllm-connection w-px h-6" style={{ backgroundColor: 'var(--color-surface-border)' }} />

        {/* ── Global FedLLM (primary node) ── */}
        <div className="fedllm-stage-global my-2">
          <ArchNode label="Global FedLLM" primary />
        </div>

        {/* Connection down */}
        <div className="fedllm-connection w-px h-6" style={{ backgroundColor: 'var(--color-surface-border)' }} />

        {/* ── Time horizons ── */}
        <div className="fedllm-stage-time flex items-center gap-2 md:gap-3 my-2">
          {['15', '30', '45', '60'].map((t) => (
            <span
              key={t}
              className="border border-[var(--color-surface-border)] px-2 py-0.5 text-[8px] md:text-[9px] tabular-nums tracking-wide"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {t}
              <span className="ml-0.5 text-[7px]">MIN</span>
            </span>
          ))}
        </div>

        {/* Connection down */}
        <div className="fedllm-connection w-px h-5" style={{ backgroundColor: 'var(--color-surface-border)' }} />

        {/* ── Output labels ── */}
        <div className="fedllm-stage-output flex flex-col items-center gap-1 mt-2">
          <span
            className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
          >
            Explainable Prediction
          </span>
          <span
            className="text-[8px] md:text-[9px] uppercase tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            Dynamic Route Optimization
          </span>
        </div>
      </div>

      {/* ── Coordinate markers ── */}
      <span
        className="fedllm-coord absolute bottom-3 left-4 text-[7px] tracking-wider"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', opacity: 0.35 }}
      >
        0,0
      </span>
      <span
        className="fedllm-coord absolute bottom-3 right-4 text-[7px] tracking-wider"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', opacity: 0.35 }}
      >
        1.0,1.0
      </span>
    </div>
  )
}

/** Client node — compact box with dot indicator */
function ClientNode({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="fedllm-node flex-1 max-w-[160px] border border-[var(--color-surface-border)] p-3 md:p-3.5">
      <div className="flex items-center gap-1.5 mb-1">
        <div
          className="fedllm-dot fedllm-dot-accent h-[4px] w-[4px] rounded-full shrink-0"
          style={{ backgroundColor: 'var(--color-text-muted)' }}
        />
        <span
          className="text-[8px] md:text-[9px] font-medium uppercase tracking-[0.08em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
        >
          {label}
        </span>
      </div>
      <span
        className="text-[7px] md:text-[8px] uppercase tracking-[0.05em] block pl-[14px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
      >
        {detail}
      </span>
    </div>
  )
}

/** Architecture node — bordered box for aggregation/model nodes */
function ArchNode({
  label,
  sublabel,
  primary,
}: {
  label: string
  sublabel?: string
  primary?: boolean
}) {
  return (
    <div
      className={`fedllm-node ${primary ? 'fedllm-node-primary' : ''} border px-4 py-2.5 md:px-5 md:py-3 text-center`}
      style={{
        borderColor: primary ? 'var(--color-accent)' : 'var(--color-surface-border)',
        backgroundColor: primary ? 'var(--color-accent-subtle)' : 'transparent',
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <div
          className={`fedllm-dot ${primary ? 'fedllm-dot-accent' : ''} h-[4px] w-[4px] rounded-full shrink-0`}
          style={{ backgroundColor: primary ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
        />
        <span
          className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.1em]"
          style={{
            fontFamily: 'var(--font-mono)',
            color: primary ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
          }}
        >
          {label}
        </span>
      </div>
      {sublabel && (
        <span
          className="text-[7px] md:text-[8px] uppercase tracking-[0.05em] block mt-0.5"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          {sublabel}
        </span>
      )}
    </div>
  )
}

/** Healthcare assistant — minimal abstract interface visual */
function HealthcareVisual() {
  return (
    <div className="healthcare-visual relative border border-[var(--color-surface-border)] bg-[var(--color-surface-elevated)] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-[9px] uppercase tracking-[0.12em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          System Interface
        </span>
        <span
          className="text-[8px] uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          SYS / 002
        </span>
      </div>

      <div className="flex flex-col items-center gap-0">
        {/* Input channels */}
        <div className="flex gap-3 mb-1">
          <div className="border border-[var(--color-surface-border)] px-3 py-1.5 text-center">
            <span
              className="text-[8px] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              Voice
            </span>
          </div>
          <div className="border border-[var(--color-surface-border)] px-3 py-1.5 text-center">
            <span
              className="text-[8px] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              Text
            </span>
          </div>
        </div>

        {/* Merge */}
        <div className="relative w-24 h-5">
          <div className="absolute left-[25%] top-0 h-[50%] w-px" style={{ backgroundColor: 'var(--color-surface-border)', opacity: 0.4 }} />
          <div className="absolute right-[25%] top-0 h-[50%] w-px" style={{ backgroundColor: 'var(--color-surface-border)', opacity: 0.4 }} />
          <div className="absolute left-[25%] right-[25%] top-[50%] h-px" style={{ backgroundColor: 'var(--color-surface-border)', opacity: 0.4 }} />
          <div className="absolute left-1/2 top-[50%] -translate-x-1/2 h-[50%] w-px" style={{ backgroundColor: 'var(--color-surface-border)', opacity: 0.4 }} />
        </div>

        {/* NLP Processing */}
        <div className="border border-[var(--color-surface-border)] px-4 py-1.5 text-center mb-1">
          <span
            className="text-[8px] uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
          >
            NLP Processing
          </span>
        </div>

        <div className="w-px h-4" style={{ backgroundColor: 'var(--color-surface-border)', opacity: 0.4 }} />

        {/* Prediction — accent node */}
        <div
          className="border px-4 py-1.5 text-center mb-1"
          style={{
            borderColor: 'var(--color-accent)',
            backgroundColor: 'var(--color-accent-subtle)',
          }}
        >
          <span
            className="text-[8px] uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
          >
            Disease Prediction
          </span>
        </div>

        <div className="w-px h-4" style={{ backgroundColor: 'var(--color-surface-border)', opacity: 0.4 }} />

        {/* Storage */}
        <div className="border border-[var(--color-surface-border)] px-4 py-1.5 text-center">
          <span
            className="text-[8px] uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            MongoDB
          </span>
        </div>
      </div>

      {/* Coordinate */}
      <span
        className="absolute bottom-2.5 right-3.5 text-[7px] tracking-wider"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', opacity: 0.3 }}
      >
        2.0
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Main Section Component
   ═══════════════════════════════════════════════════ */

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
        .from('.fedllm-info-desc', { opacity: 0, y: 15, duration: 0.5 }, 0.4)

      /* ── FedLLM visual staged assembly ── */
      const fedllmVisualTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.fedllm-visual',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      fedllmVisualTl
        .from('.fedllm-header', { opacity: 0, y: 10, duration: 0.4 })
        .from('.fedllm-stage-data', { opacity: 0, y: 10, duration: 0.3 }, 0.2)
        .from('.fedllm-stage-clients', { opacity: 0, y: 15, duration: 0.5 }, 0.35)
        .from('.fedllm-stage-fedcss', { opacity: 0, scale: 0.95, duration: 0.4 }, 0.65)
        .from('.fedllm-stage-global', { opacity: 0, scale: 0.95, duration: 0.5 }, 0.9)
        .from('.fedllm-stage-time', { opacity: 0, y: 8, duration: 0.4 }, 1.1)
        .from('.fedllm-stage-output', { opacity: 0, y: 8, duration: 0.4 }, 1.25)
        .from('.fedllm-coord', { opacity: 0, duration: 0.3, stagger: 0.1 }, 1.3)

      /* ── FedLLM tech + CTA ── */
      gsap.from('.fedllm-tech', {
        opacity: 0, y: 15, duration: 0.5,
        scrollTrigger: {
          trigger: '.fedllm-tech',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('.fedllm-cta', {
        opacity: 0, y: 12, duration: 0.5,
        scrollTrigger: {
          trigger: '.fedllm-cta',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

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
        .from('.health-number', {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.1)
        .from('.health-title', {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.9,
          ease: 'power4.out',
        }, 0.3)
        .from('.health-visual-container', { opacity: 0, y: 20, duration: 0.6 }, 0.5)
        .from('.health-desc', { opacity: 0, y: 12, duration: 0.5 }, 0.7)
        .from('.health-tech', { opacity: 0, y: 10, duration: 0.4 }, 0.85)
        .from('.health-cta', { opacity: 0, y: 10, duration: 0.4 }, 0.95)

    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  /* ─────────────────────────────────────────────
     Shared sub-renders
     ───────────────────────────────────────────── */

  const fedllmTechTags = (
    <div className="flex flex-wrap gap-1.5 md:gap-2">
      {fedllm.techStack.map((tech) => (
        <span
          key={tech}
          className="inline-block border border-[var(--color-surface-border)] px-2 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-[9px] uppercase tracking-[0.05em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          {tech}
        </span>
      ))}
    </div>
  )

  const fedllmCta = (
    <a
      href={fedllm.links.caseStudy}
      className="work-cta inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.15em] font-medium"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      View Case Study{' '}
      <span className="work-cta-arrow">→</span>
    </a>
  )

  /* ─────────────────────────────────────────────
     Render
     ───────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 md:py-32 lg:py-40 px-[var(--content-padding)]"
    >
      <div className="mx-auto w-full max-w-[var(--max-width)]">

        {/* ════════════════════════════════════════
            Section Header
           ════════════════════════════════════════ */}
        <div className="work-header mb-16 md:mb-24 lg:mb-32">
          <span
            className="work-section-label mb-4 block text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
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
            className="work-support mt-4 max-w-md text-[12px] md:text-[13px]"
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
            Project 01 — FedLLM (dominant)
           ════════════════════════════════════════ */}
        <div id="fedllm" className="fedllm-project">

          {/* ── Desktop: 3-zone editorial grid ── */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">

            {/* Left: Metadata */}
            <div className="fedllm-meta lg:col-span-2 pt-2">
              <span
                className="block text-[11px] font-medium uppercase tracking-[0.12em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {fedllm.number}
              </span>
              <div
                className="my-3 h-px w-8"
                style={{ backgroundColor: 'var(--color-surface-border)' }}
              />
              <span
                className="block text-[10px] uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {fedllm.category}
              </span>
              <span
                className="mt-0.5 block text-[10px] uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {fedllm.categoryLabel}
              </span>
            </div>

            {/* Center: Visual */}
            <div className="lg:col-span-6">
              <FedLLMVisual />
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-4">
              <h3
                className="fedllm-info-title font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h2)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {fedllm.title}
              </h3>
              <p
                className="fedllm-info-desc mt-2 text-[11px] uppercase tracking-[0.06em]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.4',
                }}
              >
                {fedllm.fullTitle}
              </p>
              <p
                className="fedllm-info-desc mt-4 text-[13px] md:text-[14px]"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-normal)',
                }}
              >
                {fedllm.description}
              </p>

              {/* Key details */}
              <ul className="fedllm-info-desc mt-5 space-y-1.5">
                {fedllm.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[11px] md:text-[12px]"
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

              {/* Tech stack */}
              <div className="fedllm-tech mt-6">
                {fedllmTechTags}
              </div>

              {/* CTA */}
              <div className="fedllm-cta mt-8">
                {fedllmCta}
              </div>
            </div>
          </div>

          {/* ── Mobile / Tablet: Vertical stack ── */}
          <div className="lg:hidden space-y-6">
            {/* Metadata */}
            <div className="fedllm-meta flex items-center gap-3">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.12em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {fedllm.number}
              </span>
              <div className="h-px flex-1 max-w-8" style={{ backgroundColor: 'var(--color-surface-border)' }} />
              <span
                className="text-[9px] uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {fedllm.category}
              </span>
              <span
                className="text-[9px] uppercase tracking-[0.1em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {fedllm.categoryLabel}
              </span>
            </div>

            {/* Title */}
            <h3
              className="fedllm-info-title font-bold uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--color-text-primary)',
              }}
            >
              {fedllm.title}
            </h3>

            {/* Full title */}
            <p
              className="fedllm-info-desc text-[10px] uppercase tracking-[0.06em]"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)',
                lineHeight: '1.4',
              }}
            >
              {fedllm.fullTitle}
            </p>

            {/* Description */}
            <p
              className="fedllm-info-desc text-[13px]"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              {fedllm.description}
            </p>

            {/* Visual */}
            <FedLLMVisual />

            {/* Tech */}
            <div className="fedllm-tech">
              {fedllmTechTags}
            </div>

            {/* CTA */}
            <div className="fedllm-cta">
              {fedllmCta}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            Separator
           ════════════════════════════════════════ */}
        <div
          className="work-separator my-16 md:my-24 lg:my-32 h-px"
          style={{ backgroundColor: 'var(--color-surface-border)' }}
        />

        {/* ════════════════════════════════════════
            Project 02 — Healthcare (secondary)
           ════════════════════════════════════════ */}
        <div className="health-project">

          {/* Metadata row */}
          <div className="health-meta flex items-center gap-3 mb-6 md:mb-8">
            <span
              className="text-[10px] font-medium uppercase tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {healthcare.number}
            </span>
            <div className="h-px flex-1 max-w-8" style={{ backgroundColor: 'var(--color-surface-border)' }} />
            <span
              className="text-[9px] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {healthcare.category}
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {healthcare.categoryLabel}
            </span>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start gap-8">

            {/* Left: Number + Title */}
            <div className="lg:col-span-5">
              {/* Large typographic number */}
              <span
                className="health-number block font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4rem, 8vw, 8rem)',
                  lineHeight: '0.85',
                  letterSpacing: 'var(--tracking-tighter)',
                  color: 'var(--color-surface-subtle)',
                }}
              >
                02
              </span>

              {/* Title */}
              <h3
                className="health-title mt-4 md:mt-6 font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-h3)',
                  lineHeight: 'var(--leading-snug)',
                  color: 'var(--color-text-primary)',
                  clipPath: 'inset(0 0 0 0)',
                }}
              >
                AI-Powered
                <br />
                Multilingual
                <br />
                Healthcare
                <br />
                Assistant
              </h3>
            </div>

            {/* Right: Visual + Description + Tech + CTA */}
            <div className="lg:col-span-5 lg:col-start-8 space-y-6">
              {/* Visual */}
              <div className="health-visual-container">
                <HealthcareVisual />
              </div>

              {/* Description */}
              <p
                className="health-desc text-[13px] md:text-[14px]"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-normal)',
                }}
              >
                {healthcare.description}
              </p>

              {/* Details */}
              <ul className="health-desc space-y-1.5">
                {healthcare.details.map((detail, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[11px] md:text-[12px]"
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

              {/* Tech */}
              <div className="health-tech flex flex-wrap gap-1.5 md:gap-2">
                {healthcare.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block border border-[var(--color-surface-border)] px-2 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-[9px] uppercase tracking-[0.05em]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="health-cta">
                <span
                  className="work-cta inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.15em] font-medium cursor-default"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                >
                  Case Study Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
