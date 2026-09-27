import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { researchTopics, type ResearchTopic } from '@/data/research'

interface LayoutConfig {
  topic: ResearchTopic
  type: 'solid' | 'outline' | 'accent'
  align: string
  sizeClasses: string
  indicatorPos: 'left' | 'right'
  multiline?: boolean
}

function ResearchItem({ config }: { config: LayoutConfig }) {
  const { topic, type, align, sizeClasses, indicatorPos, multiline } = config

  const typeClass =
    type === 'outline' ? 'research-outline' :
    type === 'accent' ? 'research-accent' :
    'research-solid'

  return (
    <div className={`research-item group w-full ${align}`}>
      <div className="relative inline-block text-left max-w-full">
        <h3
          className={`font-bold uppercase leading-[0.85] tracking-tighter break-words ${sizeClasses} ${typeClass}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {multiline ? (
            topic.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))
          ) : (
            topic.title
          )}
        </h3>

        {/* Desktop Indicator */}
        {topic.connectsToFedLLM && (
          <div
            className={`fedllm-indicator hidden md:flex items-center gap-3 absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${
              indicatorPos === 'left' ? 'right-full mr-6 flex-row-reverse' : 'left-full ml-6'
            }`}
          >
            <div className="h-px w-12 bg-[var(--color-surface-border)] indicator-line" />
            <span className="text-[10px] uppercase tracking-widest font-mono text-[var(--color-text-muted)] indicator-text">
              {indicatorPos === 'left' ? '(FEDLLM) SYS/001 ↲' : '↳ SYS/001 (FEDLLM)'}
            </span>
          </div>
        )}
      </div>

      {/* Mobile Indicator */}
      {topic.connectsToFedLLM && (
        <div
          className={`md:hidden mt-2 flex items-center gap-2 ${
            align.includes('text-right')
              ? 'justify-end'
              : align.includes('text-center')
              ? 'justify-center'
              : 'justify-start'
          }`}
        >
          <div className="h-px w-4 bg-[var(--color-surface-border)] indicator-line" />
          <span className="text-[8px] uppercase tracking-widest font-mono text-[var(--color-text-muted)] indicator-text">
            ↳ FedLLM
          </span>
        </div>
      )}
    </div>
  )
}

export function Research() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      tl.from('.rs-header-el', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 })
        .from('.rs-grid-line-v', { scaleY: 0, duration: 1.5, ease: 'power4.out', transformOrigin: 'top' }, 0.2)
        .from('.rs-grid-line-h', { scaleX: 0, duration: 1.5, ease: 'power4.out', transformOrigin: 'left' }, 0.2)
        .from(
          '.research-item-anim',
          { opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          0.4
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const configs: LayoutConfig[] = [
    { topic: researchTopics[0], type: 'solid', align: 'text-left', sizeClasses: 'text-[clamp(2.5rem,8vw,7rem)]', indicatorPos: 'right' },
    { topic: researchTopics[1], type: 'outline', align: 'text-right md:pr-[5%]', sizeClasses: 'text-[clamp(2rem,6vw,5.5rem)]', indicatorPos: 'left' },
    { topic: researchTopics[2], type: 'accent', align: 'text-center md:pl-[10%]', sizeClasses: 'text-[clamp(1.5rem,4vw,3.5rem)]', indicatorPos: 'right' },
    { topic: researchTopics[3], type: 'solid', align: 'text-left md:pl-[15%]', sizeClasses: 'text-[clamp(2rem,6vw,5.5rem)]', indicatorPos: 'right' },
    { topic: researchTopics[4], type: 'outline', align: 'text-right', sizeClasses: 'text-[clamp(2.5rem,8vw,7rem)]', indicatorPos: 'left' },
    { topic: researchTopics[5], type: 'solid', align: 'text-center md:pr-[15%]', sizeClasses: 'text-[clamp(1.5rem,4vw,3.5rem)]', indicatorPos: 'right', multiline: true },
  ]

  return (
    <section
      ref={sectionRef}
      id="research"
      className="relative py-24 md:py-32 lg:py-40 px-[var(--content-padding)] overflow-hidden"
    >
      {/* Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="rs-grid-line-v absolute left-[15%] top-0 bottom-0 w-px bg-[var(--color-surface-border)] opacity-30" />
        <div className="rs-grid-line-v absolute right-[25%] top-0 bottom-0 w-px bg-[var(--color-surface-border)] opacity-30" />
        <div className="rs-grid-line-h absolute left-0 right-0 top-[25%] h-px bg-[var(--color-surface-border)] opacity-30" />
        <div className="rs-grid-line-h absolute left-0 right-0 top-[75%] h-px bg-[var(--color-surface-border)] opacity-30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[var(--max-width)]">
        {/* Header */}
        <div className="mb-16 md:mb-24 lg:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="rs-header-el flex items-center gap-4 mb-4">
              <span
                className="text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                03 / Research
              </span>
              <div className="h-px w-12 bg-[var(--color-surface-border)]" />
              <span
                className="text-[9px] uppercase tracking-[0.15em]"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                FIELD / AI-ML
              </span>
            </div>

            <h2
              className="rs-header-el font-bold uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h1)',
                lineHeight: 'var(--leading-tight)',
                color: 'var(--color-text-primary)',
              }}
            >
              Research
              <br />
              Interests<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h2>

            <p
              className="rs-header-el mt-6 text-[13px] md:text-[14px]"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              I explore intelligent, privacy-preserving systems at the intersection of large language models, machine learning, explainability and real-world forecasting.
            </p>
          </div>

          <div className="rs-header-el hidden lg:block pb-2">
            <span
              className="text-[9px] uppercase tracking-[0.1em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              SYSTEM / 003
            </span>
          </div>
        </div>

        {/* Typographic Canvas */}
        <div className="flex flex-col gap-10 md:gap-14 lg:gap-16 w-full">
          {configs.map((config) => (
            <div key={config.topic.id} className="research-item-anim w-full">
              <ResearchItem config={config} />
            </div>
          ))}

          {/* Last Row: NLP and ML */}
          <div className="research-item-anim flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-4 md:mt-8 gap-10 md:gap-4">
            <div className="w-full md:w-1/2">
              <ResearchItem
                config={{
                  topic: researchTopics[6], // NLP
                  type: 'accent',
                  align: 'text-left',
                  sizeClasses: 'text-[clamp(1.5rem,4vw,3.5rem)]',
                  indicatorPos: 'right',
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <ResearchItem
                config={{
                  topic: researchTopics[7], // ML
                  type: 'solid',
                  align: 'text-left md:text-right',
                  sizeClasses: 'text-[clamp(2rem,6vw,5.5rem)]',
                  indicatorPos: 'left',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
