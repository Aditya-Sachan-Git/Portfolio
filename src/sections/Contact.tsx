import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { personal } from '@/data/personal'

interface ContactItem {
  num: string
  label: string
  destination: string
  href: string
  external: boolean
  ariaLabel: string
}

const contactDirectory: ContactItem[] = [
  {
    num: '01',
    label: 'EMAIL',
    destination: personal.contact.email,
    href: `mailto:${personal.contact.email}`,
    external: false,
    ariaLabel: `Send email to ${personal.contact.email}`,
  },
  {
    num: '02',
    label: 'LINKEDIN',
    destination: 'View LinkedIn Profile',
    href: personal.social.linkedin,
    external: true,
    ariaLabel: 'View LinkedIn Profile (opens in new tab)',
  },
  {
    num: '03',
    label: 'GITHUB',
    destination: 'View GitHub Repositories',
    href: personal.social.github,
    external: true,
    ariaLabel: 'View GitHub Repositories (opens in new tab)',
  },
  {
    num: '04',
    label: 'CV',
    destination: 'View Résumé',
    href: personal.resume,
    external: true,
    ariaLabel: 'View Résumé on Google Drive (opens in new tab)',
  },
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.ct-label', {
        opacity: 0,
        y: 15,
        duration: 0.5,
        scrollTrigger: { trigger: '.ct-label', start: 'top 85%' },
      })
      gsap.from('.ct-question', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: { trigger: '.ct-question', start: 'top 82%' },
      })
      gsap.from('.ct-cta', {
        opacity: 0,
        y: 25,
        duration: 0.7,
        scrollTrigger: { trigger: '.ct-cta', start: 'top 80%' },
      })
      gsap.from('.ct-context', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: { trigger: '.ct-context', start: 'top 80%' },
      })
      gsap.from('.ct-dir-item', {
        opacity: 0,
        y: 15,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: { trigger: '.ct-directory', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32"
    >
      <div className="page-frame">

        {/* ── Section label ── */}
        <span
          className="ct-label mb-6 md:mb-8 block text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          08 / Contact
        </span>

        {/* ── Headlines: Asymmetric 12-Column Composition ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 lg:items-end mb-20 md:mb-28 lg:mb-36">

          {/* Left Side (Cols 1–7): Main CTA Typography */}
          <div className="lg:col-span-7">
            <h2
              className="ct-question font-bold uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                lineHeight: '1.2',
                color: 'var(--color-text-secondary)',
              }}
            >
              Have a problem
              <br />
              worth solving?
            </h2>

            <p
              className="ct-cta mt-6 md:mt-10 font-bold uppercase tracking-tighter"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
                lineHeight: '0.92',
                color: 'var(--color-text-primary)',
              }}
            >
              Let&rsquo;s Build
              <br />
              Something
              <br />
              Intelligent<span style={{ color: 'var(--color-accent)' }}>.</span>
            </p>
          </div>

          {/* Right Side (Cols 9–12): Technical Contextual Block (Visually Aligned with CTA) */}
          <div className="ct-context lg:col-span-4 lg:col-start-9 mt-12 lg:mt-0 pb-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.2em] font-medium"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                CONTACT / 001
              </span>
            </div>

            <div className="space-y-3">
              <span
                className="block text-[10px] uppercase tracking-[0.18em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                OPEN TO
              </span>
              <ul className="space-y-1.5">
                {['SOFTWARE ENGINEERING', 'AI / ML', 'RESEARCH', 'COLLABORATION'].map((role) => (
                  <li
                    key={role}
                    className="text-xs md:text-sm tracking-wider font-mono"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* ── New Contact Directory: 2 × 2 on Desktop, Zero Horizontal Lines ── */}
        <div className="ct-directory grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-12 md:gap-y-16 w-full">
          {contactDirectory.map((item) => (
            <a
              key={item.num}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="ct-dir-item group block outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:rounded"
              aria-label={item.ariaLabel}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <span
                  className="text-[11px] font-mono tracking-wider transition-colors duration-200 group-hover:text-[var(--color-accent)] group-focus-visible:text-[var(--color-accent)]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item.num}
                </span>
                <span
                  className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-200 group-hover:text-[var(--color-accent)] group-focus-visible:text-[var(--color-accent)]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item.label}
                </span>
              </div>
              <span
                className="block text-lg md:text-xl lg:text-2xl font-medium tracking-tight transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[var(--color-text-primary)] group-focus-visible:-translate-y-1 group-focus-visible:text-[var(--color-text-primary)]"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {item.destination}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
