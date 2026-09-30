import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { codingProfiles } from '@/data/codingProfiles'

export function CodingProfiles() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.from('.cp-label', { opacity: 0, y: 15, duration: 0.5 })
        .from('.cp-heading', { opacity: 0, y: 20, duration: 0.6 }, 0.15)
        .from('.cp-support', { opacity: 0, y: 15, duration: 0.5 }, 0.3)
        .from('.cp-profile', {
          opacity: 0,
          y: 25,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }, 0.4)
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="coding-profiles"
      className="relative py-12 sm:py-16 md:py-24 lg:py-32"
    >
      <div className="page-frame">

        {/* ── Section Header ── */}
        <div className="mb-12 sm:mb-16 md:mb-24 lg:mb-28">
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
            <span
              className="cp-label text-sm md:text-[15px] uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              07 / Coding Profiles
            </span>
            <span
              className="cp-label hidden md:block text-sm uppercase tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              SYS / 007
            </span>
          </div>

          <h2
            className="cp-heading font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
              lineHeight: '0.92',
              letterSpacing: 'var(--tracking-tighter)',
              color: 'var(--color-text-primary)',
            }}
          >
            Coding
            <br />
            Profiles<span style={{ color: 'var(--color-accent)' }}>.</span>
          </h2>

          <p
            className="cp-support mt-4 sm:mt-6 max-w-lg text-sm md:text-base"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Competitive programming and problem-solving.
          </p>

          <div
            className="cp-support mt-6 h-px w-16"
            style={{ backgroundColor: 'var(--color-surface-border)' }}
          />
        </div>

        {/* ── Editorial Two-Profile Composition (12-Column Grid) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-12 w-full">
          {codingProfiles.map((profile, index) => (
            <a
              key={profile.id}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`cp-profile group block relative pt-6 sm:pt-8 pb-8 sm:pb-10 border-t border-[var(--color-surface-border)] hover:border-[var(--color-accent)] focus-visible:border-[var(--color-accent)] transition-colors duration-300 outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:rounded ${
                index === 0 ? 'lg:col-span-6' : 'lg:col-span-6'
              }`}
              aria-label={profile.ariaLabel}
            >
              {/* Profile Header Row: Number + Platform identifier + Cobalt marker */}
              <div className="flex items-center justify-between mb-5 sm:mb-8">
                <span
                  className="text-sm md:text-base font-mono tracking-wider uppercase transition-colors duration-200 group-hover:text-[var(--color-accent)] group-focus-visible:text-[var(--color-accent)]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {profile.number} / {profile.platform}
                </span>

                <div
                  className="h-2 w-2 rounded-full shrink-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Platform Name in Display Typography */}
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight transition-colors duration-300 group-hover:text-white group-focus-visible:text-white"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {profile.platform}
                <span style={{ color: 'var(--color-accent)' }}>.</span>
              </h3>

              {/* Username in JetBrains Mono with subtle shift on hover */}
              <p
                className="mt-4 text-base md:text-lg font-mono tracking-wide transition-all duration-300 group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {profile.username}
              </p>

              {/* Action Link Row */}
              <div
                className="mt-6 sm:mt-10 flex items-center gap-3 text-sm md:text-base font-mono uppercase tracking-[0.16em] font-medium transition-colors duration-200 min-h-[44px]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <span className="group-hover:text-[var(--color-text-primary)] group-focus-visible:text-[var(--color-text-primary)] transition-colors duration-200">
                  View Profile
                </span>
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-2 group-focus-visible:translate-x-2"
                  style={{ color: 'var(--color-accent)' }}
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
