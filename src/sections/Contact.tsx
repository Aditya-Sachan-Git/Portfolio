import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { personal } from '@/data/personal'

interface ContactAction {
  label: string
  href: string
  external: boolean
}

const actions: ContactAction[] = [
  {
    label: 'Email',
    href: `mailto:${personal.contact.email}`,
    external: false,
  },
  {
    label: 'LinkedIn',
    href: personal.social.linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    href: personal.social.github,
    external: true,
  },
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.ct-label', {
        opacity: 0, y: 18, duration: 0.6,
        scrollTrigger: { trigger: '.ct-label', start: 'top 85%' },
      })
      gsap.from('.ct-question', {
        clipPath: 'inset(0 100% 0 0)', duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: '.ct-question', start: 'top 82%' },
      })
      gsap.from('.ct-cta', {
        clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: '.ct-cta', start: 'top 80%' },
      })
      gsap.from('.ct-rule-top', {
        scaleX: 0, transformOrigin: 'left center', duration: 0.8,
        scrollTrigger: { trigger: '.ct-rule-top', start: 'top 85%' },
      })
      gsap.from('.ct-action', {
        opacity: 0, y: 18, duration: 0.5, stagger: 0.12,
        scrollTrigger: { trigger: '.ct-actions', start: 'top 82%' },
      })
      gsap.from('.ct-resume', {
        opacity: 0, y: 14, duration: 0.5,
        scrollTrigger: { trigger: '.ct-resume', start: 'top 88%' },
      })
      gsap.from('.ct-identity', {
        opacity: 0, y: 14, duration: 0.5,
        scrollTrigger: { trigger: '.ct-identity', start: 'top 90%' },
      })
      gsap.from('.ct-end-marker', {
        opacity: 0, duration: 0.4,
        scrollTrigger: { trigger: '.ct-end-marker', start: 'top 92%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 lg:py-40 px-[var(--content-padding)]"
    >
      <div className="mx-auto w-full max-w-[var(--max-width)]">

        {/* ── Section label ── */}
        <span
          className="ct-label mb-4 block text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          08 / Contact
        </span>

        {/* ── Headlines ── */}
        <div className="mb-16 md:mb-24 lg:mb-32 max-w-3xl">
          <h2
            className="ct-question font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-secondary)',
              clipPath: 'inset(0 0 0 0)',
            }}
          >
            Have a problem
            <br />
            worth solving?
          </h2>

          <p
            className="ct-cta mt-6 md:mt-8 font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h1)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-primary)',
              clipPath: 'inset(0 0 0 0)',
            }}
          >
            Let&rsquo;s Build
            <br />
            Something
            <br />
            Intelligent<span style={{ color: 'var(--color-accent)' }}>.</span>
          </p>
        </div>

        {/* ── Top rule ── */}
        <div
          className="ct-rule-top h-px mb-10 md:mb-12"
          style={{ backgroundColor: 'var(--color-surface-border)' }}
        />

        {/* ── Contact actions ── */}
        <div className="ct-actions space-y-0">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              className="ct-action contact-link group flex items-center justify-between py-5 md:py-6 outline-none"
              style={{ borderBottom: '1px solid var(--color-surface-border)' }}
              aria-label={`${action.label}${action.external ? ' (opens in new tab)' : ''}`}
            >
              <div className="flex items-center gap-4 md:gap-6">
                <span
                  className="text-[14px] md:text-[16px] font-bold uppercase tracking-[0.08em]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {action.label}
                </span>
                <div
                  className="contact-link-rule hidden md:block h-px w-24 lg:w-48"
                  style={{ backgroundColor: 'var(--color-surface-border)' }}
                />
              </div>
              <span
                className="contact-link-arrow text-[14px] md:text-[16px]"
              >
                →
              </span>
            </a>
          ))}
        </div>

        {/* ── Resume CTA ── */}
        <div className="ct-resume mt-10 md:mt-12">
          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group inline-flex items-center gap-3 py-3 outline-none"
            aria-label="Download CV (opens in new tab)"
          >
            <span
              className="text-[12px] md:text-[13px] font-medium uppercase tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Download CV
            </span>
            <span className="contact-link-arrow text-[12px]">→</span>
          </a>
        </div>

        {/* ── Bottom rule ── */}
        <div
          className="h-px mt-12 md:mt-16 mb-10 md:mb-12"
          style={{ backgroundColor: 'var(--color-surface-border)' }}
        />

        {/* ── Identity block ── */}
        <div className="ct-identity flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span
              className="block font-bold uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h3)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--color-text-primary)',
              }}
            >
              {personal.name.full}
            </span>
            <div className="mt-2 flex flex-col gap-0.5">
              {personal.roles.map((role) => (
                <span
                  key={role}
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Decorative end marker */}
          <div className="ct-end-marker">
            <span
              className="block text-[8px] uppercase tracking-[0.15em] text-right"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', opacity: 0.5 }}
            >
              END / OF / SYSTEM
            </span>
            <span
              className="block text-[8px] uppercase tracking-[0.15em] text-right mt-0.5"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', opacity: 0.5 }}
            >
              AS / 001
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
