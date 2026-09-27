import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personal, navLinks } from '@/data/personal'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const isMobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
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
        className="fixed top-0 left-0 right-0 w-full transition-all"
        style={{
          height: 'var(--nav-height)',
          zIndex: 'var(--z-nav)',
          backgroundColor: isScrolled ? 'rgba(5, 5, 5, 0.92)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--color-surface-border)' : '1px solid transparent',
          transitionDuration: 'var(--duration-normal)',
          transitionTimingFunction: 'var(--ease-out-expo)',
        }}
      >
        <div className="page-frame flex h-full items-center justify-between">
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
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group relative text-xs font-medium uppercase tracking-[0.1em] transition-colors"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: isActive
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-secondary)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = isActive
                        ? 'var(--color-text-primary)'
                        : 'var(--color-text-secondary)')
                    }
                  >
                    {link.label}
                    {/* Active dot indicator */}
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? '3px' : '0px',
                        height: isActive ? '3px' : '0px',
                        backgroundColor: 'var(--color-accent)',
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                    {/* Hover underline */}
                    <span
                      className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                  </a>
                )
              })}
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
                    color: activeSection === link.href.replace('#', '')
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-secondary)',
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
