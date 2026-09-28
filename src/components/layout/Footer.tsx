import { personal } from '@/data/personal'

export function Footer() {
  const handleBackToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'instant' : 'smooth' })
  }

  return (
    <footer className="pb-16 md:pb-24 pt-8 md:pt-12">
      <div className="page-frame">
        {/* Upper row: Identity (Left) & Social Links (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12 md:mb-16">
          {/* Left: Identity (Cols 1–6) */}
          <div className="md:col-span-6 space-y-2">
            <span
              className="block font-bold uppercase text-base md:text-lg tracking-wider"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {personal.name.full}
            </span>
            <span
              className="block text-sm md:text-[15px] uppercase tracking-[0.16em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              AI / ML RESEARCHER &nbsp;·&nbsp; SOFTWARE ENGINEER
            </span>
          </div>

          {/* Right: Simple vertical text links (Cols 7–12, aligned right on desktop) */}
          {/*<div className="md:col-span-6 flex flex-col md:items-end space-y-2.5">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-[15px] tracking-wider uppercase transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
              aria-label="GitHub profile (opens in new tab)"
            >
              GitHub
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-[15px] tracking-wider uppercase transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
              aria-label="LinkedIn profile (opens in new tab)"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personal.contact.email}`}
              className="text-sm md:text-[15px] tracking-wider uppercase transition-colors hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:text-[var(--color-accent)]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
              aria-label="Send email to Aditya Sachan"
            >
              Email
            </a>
          </div>*/}
        </div>

        {/* Lower metadata area: Copyright (Left) & Back to top (Right) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm md:text-[15px] tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
          <span>&copy; {new Date().getFullYear()} {personal.name.full}</span>

          <button
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-3 text-[32px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] py-1"
            style={{ fontSize: '32px', lineHeight: '1.2' }}
            aria-label="Back to top of page"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true">
              ↑
            </span>
            <span>BACK TO TOP</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
