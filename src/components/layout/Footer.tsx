import { personal } from '@/data/personal'
import { scrollToTop } from '@/lib/scroll'

export function Footer() {
  const handleBackToTop = () => {
    scrollToTop()
  }

  return (
    <footer className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 border-t border-[var(--color-surface-border)]/40">
      <div className="page-frame">
        {/* Upper row: Identity (Left) & Social Links (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start mb-10 sm:mb-12 md:mb-16">
          {/* Left: Identity (Cols 1–6) */}
          <div className="md:col-span-6 space-y-2">
            <span
              className="block font-bold uppercase text-base md:text-lg tracking-wider"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {personal.name.full}
            </span>
            <span
              className="block text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.1em] sm:tracking-[0.16em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              AI / ML RESEARCHER · SOFTWARE ENGINEER
            </span>
          </div>
        </div>

        {/* Lower metadata area: Copyright (Left) & Back to top (Right) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm md:text-[15px] tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
          <span>&copy; {new Date().getFullYear()} {personal.name.full}</span>

          <button
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-2.5 sm:gap-3 uppercase tracking-[0.1em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] py-2 min-h-[44px]"
            style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)', lineHeight: '1.2' }}
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
