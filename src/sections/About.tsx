import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      /* Header reveal */
      gsap.from('.about-label', {
        opacity: 0, y: 18, duration: 0.6,
        scrollTrigger: { trigger: '.about-label', start: 'top 85%' },
      })

      gsap.from('.about-heading', {
        clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.about-heading', start: 'top 85%' },
      })

      gsap.from('.about-rule', {
        scaleX: 0, transformOrigin: 'left center', duration: 0.8,
        scrollTrigger: { trigger: '.about-rule', start: 'top 88%' },
      })

      gsap.from('.about-lead', {
        opacity: 0, y: 18, duration: 0.6,
        scrollTrigger: { trigger: '.about-heading', start: 'top 85%' },
      })

      /* Editorial keywords */
      gsap.from('.about-keyword', {
        opacity: 0, y: 25, duration: 0.7, stagger: 0.12,
        scrollTrigger: { trigger: '.about-keywords', start: 'top 80%' },
      })

      /* Bio paragraphs */
      gsap.from('.about-bio', {
        opacity: 0, y: 18, duration: 0.6, stagger: 0.15,
        scrollTrigger: { trigger: '.about-bio-wrap', start: 'top 82%' },
      })

      /* Metadata footer */
      gsap.from('.about-meta-foot', {
        opacity: 0, y: 12, duration: 0.5,
        scrollTrigger: { trigger: '.about-meta-foot', start: 'top 90%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-12 sm:py-16 md:py-18 lg:py-16"
    >
      <div className="page-frame">

        {/* ── Header & Intro Composition ── */}
        <div className="mb-12 sm:mb-16 md:mb-18 lg:mb-16 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 gap-8 sm:gap-10 lg:items-end">
          {/* Left: Section Header elements */}
          <div className="lg:col-span-5">
            <span
              className="about-label mb-3 sm:mb-4 block text-sm md:text-[15px] uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              04 / About
            </span>

            <h2
              className="about-heading uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
                lineHeight: '0.95',
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                clipPath: 'inset(0 0 0 0)',
              }}
            >
              <span className="font-light tracking-tight opacity-80 block text-[0.88em]">About</span>
              <span className="font-medium tracking-tighter block">Aditya</span>
              <span className="font-bold tracking-tighter">Sachan</span>
              <span style={{ color: 'var(--color-accent)' }}>.</span>
            </h2>

            <div
              className="about-rule mt-6 h-px w-16"
              style={{ backgroundColor: 'var(--color-surface-border)' }}
            />
          </div>

          {/* Right: Lead Introduction */}
          <div className="lg:col-span-7 lg:col-start-6 max-w-2xl">
            <p
              className="about-lead text-base md:text-lg"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-primary)',
                lineHeight: '1.75',
              }}
            >
              I am a Computer Science undergraduate at Vellore Institute of Technology, Chennai (B.Tech, Class of 2027), working at the intersection of machine learning research, distributed systems, and modern software engineering. My work focuses on designing intelligent architectures that are computationally efficient, mathematically principled, and built to solve high-impact operational problems.
            </p>
          </div>
        </div>

        {/* ── Editorial composition: Keywords + Bio ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 gap-10 sm:gap-12 lg:items-start">

          {/* Left / Center: Editorial keywords */}
          <div className="about-keywords lg:col-span-5">
            {[
              { text: 'AI / ML', outline: false },
              { text: 'Software', outline: true },
              { text: 'Intelligence', outline: false },
            ].map((kw) => (
              <span
                key={kw.text}
                className="about-keyword block font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  lineHeight: '1.05',
                  letterSpacing: 'var(--tracking-tight)',
                  marginBottom: 'var(--space-2)',
                  ...(kw.outline
                    ? {
                        color: 'transparent',
                        WebkitTextStroke: '1.5px var(--color-text-secondary)',
                      }
                    : {
                        color: kw.text === 'AI / ML' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      }),
                }}
              >
                {kw.text}
              </span>
            ))}

            {/* Coordinate detail */}
            <span
              className="about-keyword mt-6 block text-sm uppercase tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              SYS / 004 · PROFILE
            </span>
          </div>

          {/* Right: Biography */}
          <div className="about-bio-wrap lg:col-span-7 lg:col-start-6 space-y-7 md:space-y-6 lg:space-y-5 xl:space-y-5 max-w-2xl">
            <p
              className="about-bio text-base md:text-lg"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.75',
              }}
            >
              My research centers on Federated Learning (FedLLM), Large Language Models, and Privacy-Preserving AI—exploring how decentralized parameter aggregation and parameter-efficient fine-tuning (PEFT/LoRA) can power collaborative intelligence without compromising client data privacy. Concurrently, I develop practical AI applications across healthcare diagnostics, real-time contextual chat moderation, multilingual query handling, and predictive traffic forecasting.
            </p>

            <p
              className="about-bio text-base md:text-lg"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.75',
              }}
            >
              Through industry experience at SRF Limited, I contributed to enterprise-grade software platforms, developing business intelligence dashboards, real-time analytics pipelines, and AI-assisted information retrieval workflows. I value clean system design, rigorous debugging, and engineering resilient software in Python, Java, C++, and TypeScript.
            </p>

            {/* Key areas as inline tags */}
            <div className="about-bio flex flex-wrap gap-2.5 pt-4 sm:pt-6">
              {[
                'Computer Science',
                'AI / ML',
                'Federated Learning',
                'LLM Applications',
                'NLP',
                'Real-Time Systems',
                'Software Engineering',
                'Distributed Systems',
                'Intelligent Systems',
              ].map((area) => (
                <span
                  key={area}
                  className="inline-block border border-[var(--color-surface-border)] px-3 py-1.5 text-sm uppercase tracking-[0.05em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom metadata ── */}
        <div
          className="about-meta-foot mt-12 sm:mt-16 md:mt-14 lg:mt-12 flex items-center gap-4"
        >
          <div className="h-px flex-1 max-w-24" style={{ backgroundColor: 'var(--color-surface-border)' }} />
          <span
            className="text-sm uppercase tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            VIT Chennai · B.Tech CS · 2027
          </span>
        </div>

      </div>
    </section>
  )
}
