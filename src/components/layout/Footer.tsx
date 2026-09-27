import { personal } from '@/data/personal'

export function Footer() {
  const handleBackToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'instant' : 'smooth' })
  }

  return (
    <footer
      className="px-[var(--content-padding)] py-10 md:py-14"
      style={{ borderTop: '1px solid var(--color-surface-border)' }}
    >
      <div className="mx-auto max-w-[var(--max-width)]">

        {/* ── Top row: Name + Back to top ── */}
        <div className="flex items-start justify-between mb-6 md:mb-8">
          <div>
            <span
              className="block font-bold uppercase text-[13px] md:text-[14px] tracking-[0.06em]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {personal.name.full}
            </span>
            <span
              className="mt-1 block text-[10px] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {personal.roles.join(' · ')}
            </span>
          </div>

          <button
            onClick={handleBackToTop}
            className="footer-top-link flex items-center gap-2 outline-none cursor-pointer"
            aria-label="Back to top"
          >
            <span
              className="text-[10px] uppercase tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ↑ Back to top
            </span>
          </button>
        </div>

        {/* ── Separator ── */}
        <div className="h-px mb-6 md:mb-8" style={{ backgroundColor: 'var(--color-surface-border)' }} />

        {/* ── Bottom row: Copyright + Social links ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span
            className="text-[10px] tracking-wide"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            &copy; {new Date().getFullYear()} {personal.name.full}
          </span>

          <div className="flex items-center gap-5">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-top-link text-[10px] uppercase tracking-[0.12em] outline-none"
              style={{ fontFamily: 'var(--font-mono)' }}
              aria-label="GitHub (opens in new tab)"
            >
              GitHub
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-top-link text-[10px] uppercase tracking-[0.12em] outline-none"
              style={{ fontFamily: 'var(--font-mono)' }}
              aria-label="LinkedIn (opens in new tab)"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
