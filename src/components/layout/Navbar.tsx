import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { personal, navLinks } from '@/data/personal'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 transition-all',
          'px-[var(--content-padding)]'
        )}
        style={{
          height: 'var(--nav-height)',
          zIndex: 'var(--z-nav)',
          backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.92)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--color-surface-border)' : '1px solid transparent',
          transitionDuration: 'var(--duration-normal)',
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        <div className="mx-auto flex h-full max-w-[var(--max-width)] items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            className="text-sm font-medium tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {personal.name.full}
          </a>

          {/* Desktop nav links */}
          {!isMobile && (
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-xs font-medium uppercase tracking-[0.1em] transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                </a>
              ))}
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="block h-px w-5" style={{ backgroundColor: 'var(--color-text-primary)' }} />
              <span className="block h-px w-5" style={{ backgroundColor: 'var(--color-text-primary)' }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{
              zIndex: 'var(--z-overlay)',
              backgroundColor: 'var(--color-surface-primary)',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeMobileMenu}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center"
              aria-label="Close menu"
            >
              <span
                className="absolute block h-px w-5 rotate-45"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
              />
              <span
                className="absolute block h-px w-5 -rotate-45"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
              />
            </button>

            {/* Mobile nav links */}
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  className="text-3xl font-semibold uppercase tracking-[0.1em]"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
