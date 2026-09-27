import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { gsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import {
  systemNodes,
  techNodes,
  computeConnections,
  getSystemGroups,
  getUnconnectedTechs,
} from '@/data/skills'

/* ═══════════════════════════════════════════════════
   Hover State Logic
   ═══════════════════════════════════════════════════ */

type NodeState = 'active' | 'connected' | 'dim' | 'default'

function useConstellationState() {
  const [activeId, setActiveId] = useState<string | null>(null)

  const getNodeState = useCallback(
    (nodeId: string): NodeState => {
      if (!activeId) return 'default'
      if (nodeId === activeId) return 'active'

      // Active node is a tech — check if this node is a connected system
      const activeTech = techNodes.find((t) => t.id === activeId)
      if (activeTech) {
        if (activeTech.connections.includes(nodeId)) return 'connected'
        // Also check if this is a tech connected to the same system
      }

      // Active node is a system — check if this tech connects to it
      const activeSystem = systemNodes.find((s) => s.id === activeId)
      if (activeSystem) {
        const asTech = techNodes.find((t) => t.id === nodeId)
        if (asTech && asTech.connections.includes(activeId)) return 'connected'
      }

      return 'dim'
    },
    [activeId]
  )

  const getLineState = useCallback(
    (techId: string, systemId: string): NodeState => {
      if (!activeId) return 'default'
      if (activeId === techId || activeId === systemId) return 'connected'
      // If a tech is active, highlight lines to its connected systems
      const activeTech = techNodes.find((t) => t.id === activeId)
      if (activeTech && activeTech.id === techId) return 'connected'
      // If a system is active, highlight lines from connected techs
      const activeSystem = systemNodes.find((s) => s.id === activeId)
      if (activeSystem && activeSystem.id === systemId) {
        const tech = techNodes.find((t) => t.id === techId)
        if (tech && tech.connections.includes(systemId)) return 'connected'
      }
      return 'dim'
    },
    [activeId]
  )

  const activate = useCallback((id: string) => setActiveId(id), [])
  const deactivate = useCallback(() => setActiveId(null), [])

  return { activeId, getNodeState, getLineState, activate, deactivate }
}

/* ═══════════════════════════════════════════════════
   Desktop Constellation
   ═══════════════════════════════════════════════════ */

function DesktopConstellation({
  getNodeState,
  getLineState,
  activate,
  deactivate,
}: {
  getNodeState: (id: string) => NodeState
  getLineState: (techId: string, systemId: string) => NodeState
  activate: (id: string) => void
  deactivate: () => void
}) {
  const connections = useMemo(() => computeConnections(), [])

  const opacityMap: Record<NodeState, number> = {
    active: 1,
    connected: 1,
    dim: 0.15,
    default: 0.88,
  }

  const lineOpacityMap: Record<NodeState, number> = {
    active: 0.85,
    connected: 0.85,
    dim: 0.04,
    default: 0.32,
  }

  const interactionProps = (id: string) => ({
    onMouseEnter: () => activate(id),
    onMouseLeave: deactivate,
    onFocus: () => activate(id),
    onBlur: deactivate,
    tabIndex: 0,
    role: 'button' as const,
  })

  return (
    <div className="skills-constellation relative w-full" style={{ height: 'clamp(480px, 55vw, 750px)' }}>
      {/* SVG connection lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {connections.map((conn) => {
          const state = getLineState(conn.techId, conn.systemId)
          return (
            <line
              key={`${conn.techId}-${conn.systemId}`}
              className="skill-line"
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke={state === 'connected' ? 'var(--color-accent)' : 'var(--color-surface-border)'}
              strokeWidth={state === 'connected' ? '0.22' : '0.12'}
              style={{
                opacity: lineOpacityMap[state],
                transition: 'opacity 0.3s ease, stroke 0.3s ease',
              }}
            />
          )
        })}
      </svg>

      {/* System nodes — Prominent Central Hubs */}
      {systemNodes.map((sys) => {
        const state = getNodeState(sys.id)
        const isAccent = state === 'active' || state === 'connected'
        return (
          <div
            key={sys.id}
            className="skill-system-node absolute flex items-center gap-2.5 cursor-pointer outline-none z-10"
            style={{
              left: `${sys.x}%`,
              top: `${sys.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: opacityMap[state],
              transition: 'opacity 0.3s ease',
            }}
            aria-label={`System Hub: ${sys.label}`}
            {...interactionProps(sys.id)}
          >
            <div
              className="shrink-0 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                width: 14,
                height: 14,
                backgroundColor: isAccent ? 'var(--color-accent)' : 'var(--color-surface-elevated)',
                border: isAccent ? '2px solid var(--color-accent)' : '2px solid var(--color-surface-border)',
                boxShadow: isAccent ? '0 0 14px var(--color-accent-glow)' : 'none',
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: isAccent ? 'var(--color-surface-primary)' : 'var(--color-accent)',
                }}
              />
            </div>
            <span
              className="whitespace-nowrap font-bold uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.25rem)',
                color: isAccent ? 'var(--color-text-primary)' : 'var(--color-text-primary)',
                transition: 'color 0.3s ease',
              }}
            >
              {sys.shortLabel}
            </span>
          </div>
        )
      })}

      {/* Tech nodes */}
      {techNodes.map((tech) => {
        const state = getNodeState(tech.id)
        const isAccent = state === 'active'
        const isHighlighted = state === 'active' || state === 'connected'
        const alignRight = tech.x > 72

        return (
          <div
            key={tech.id}
            className="skill-tech-node absolute cursor-pointer outline-none"
            style={{
              left: `${tech.x}%`,
              top: `${tech.y}%`,
              transform: alignRight ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
              opacity: opacityMap[state],
              transition: 'opacity 0.3s ease',
            }}
            aria-label={`${tech.label} — ${tech.category}${tech.connections.length > 0 ? ` — Connected to: ${tech.connections.map((c) => systemNodes.find((s) => s.id === c)?.shortLabel).join(', ')}` : ''}`}
            {...interactionProps(tech.id)}
          >
            <div className={`flex items-center gap-1.5 ${alignRight ? 'flex-row-reverse' : ''}`}>
              <div
                className="shrink-0 rounded-full"
                style={{
                  width: tech.connections.length > 0 ? 5 : 3,
                  height: tech.connections.length > 0 ? 5 : 3,
                  backgroundColor: isAccent
                    ? 'var(--color-accent)'
                    : isHighlighted
                    ? 'var(--color-text-secondary)'
                    : 'var(--color-text-muted)',
                  boxShadow: isAccent ? '0 0 8px var(--color-accent-glow)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              />
              <span
                className="whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.7rem, 1.1vw, 0.92rem)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: isAccent
                    ? 'var(--color-text-primary)'
                    : isHighlighted
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                  transition: 'color 0.3s ease',
                }}
              >
                {tech.label}
              </span>
            </div>

            {/* Category indicator — visible on active */}
            {isAccent && (
              <span
                className="block mt-0.5"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  paddingLeft: alignRight ? 0 : 14,
                  paddingRight: alignRight ? 14 : 0,
                  textAlign: alignRight ? 'right' : 'left',
                }}
              >
                {tech.category}
              </span>
            )}
          </div>
        )
      })}

      {/* Decorative coordinate markers */}
      <span
        className="skill-coord absolute top-3 right-4 text-[10px] tracking-wider"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', opacity: 0.3 }}
      >
        STACK / AI-ML
      </span>
      <span
        className="skill-coord absolute bottom-3 left-4 text-[10px] tracking-wider"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', opacity: 0.3 }}
      >
        SYS / 007
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Mobile Relationship View
   ═══════════════════════════════════════════════════ */

function MobileSkills() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null)
  const groups = useMemo(() => getSystemGroups(), [])
  const unconnected = useMemo(() => getUnconnectedTechs(), [])

  const toggle = (id: string) => {
    setActiveSystem((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-10">
      {groups.map((group) => {
        const isActive = activeSystem === null || activeSystem === group.system.id
        return (
          <div key={group.system.id} style={{ opacity: isActive ? 1 : 0.25, transition: 'opacity 0.3s ease' }}>
            {/* System header */}
            <button
              className="w-full text-left outline-none"
              onClick={() => toggle(group.system.id)}
              aria-expanded={activeSystem === group.system.id}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      activeSystem === group.system.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    transition: 'background-color 0.3s ease',
                  }}
                />
                <h3
                  className="font-bold uppercase"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-h3)',
                    lineHeight: 'var(--leading-tight)',
                    color:
                      activeSystem === group.system.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {group.system.shortLabel}
                </h3>
              </div>
            </button>

            {/* Connected technologies */}
            <div className="flex flex-wrap gap-2 pl-5">
              {group.techs.map((tech) => (
                <span
                  key={tech.id}
                  className="inline-block border border-[var(--color-surface-border)] px-2.5 py-1 text-[9px] uppercase tracking-[0.05em]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color:
                      activeSystem === group.system.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    borderColor:
                      activeSystem === group.system.id ? 'var(--color-text-muted)' : 'var(--color-surface-border)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {tech.label}
                </span>
              ))}
            </div>

            {/* Separator */}
            <div
              className="h-px mt-8"
              style={{ backgroundColor: 'var(--color-surface-border)' }}
            />
          </div>
        )
      })}

      {/* Unconnected / General */}
      <div style={{ opacity: activeSystem === null ? 1 : 0.25, transition: 'opacity 0.3s ease' }}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ backgroundColor: 'var(--color-text-muted)' }}
          />
          <h3
            className="font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-h3)',
              lineHeight: 'var(--leading-tight)',
              color: 'var(--color-text-secondary)',
            }}
          >
            General
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 pl-5">
          {unconnected.map((tech) => (
            <span
              key={tech.id}
              className="inline-block border border-[var(--color-surface-border)] px-2.5 py-1 text-[9px] uppercase tracking-[0.05em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {tech.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════════ */

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { getNodeState, getLineState, activate, deactivate } = useConstellationState()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      /* Header */
      gsap.from('.skills-label', {
        opacity: 0, y: 18, duration: 0.6,
        scrollTrigger: { trigger: '.skills-label', start: 'top 85%' },
      })
      gsap.from('.skills-heading', {
        clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.skills-heading', start: 'top 85%' },
      })
      gsap.from('.skills-support', {
        opacity: 0, y: 12, duration: 0.5,
        scrollTrigger: { trigger: '.skills-support', start: 'top 88%' },
      })

      /* Desktop constellation */
      gsap.from('.skill-system-node', {
        opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.15,
        scrollTrigger: { trigger: '.skills-constellation', start: 'top 78%' },
      })
      gsap.from('.skill-line', {
        opacity: 0, duration: 0.8, stagger: 0.03,
        scrollTrigger: { trigger: '.skills-constellation', start: 'top 75%' },
      })
      gsap.from('.skill-tech-node', {
        opacity: 0, y: 8, duration: 0.5, stagger: 0.04,
        scrollTrigger: { trigger: '.skills-constellation', start: 'top 72%' },
      })
      gsap.from('.skill-coord', {
        opacity: 0, duration: 0.4, stagger: 0.1,
        scrollTrigger: { trigger: '.skills-constellation', start: 'top 70%' },
      })

      /* End statement */
      gsap.from('.skills-end', {
        opacity: 0, y: 18, duration: 0.6,
        scrollTrigger: { trigger: '.skills-end', start: 'top 88%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="page-frame">

        {/* ── Header ── */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <span
              className="skills-label text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              07 / Skills
            </span>
            <span
              className="skills-label hidden md:block text-[9px] uppercase tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              SYSTEM / 007
            </span>
          </div>

          <h2
            className="skills-heading font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 6.8vw, 6.2rem)',
              lineHeight: '0.88',
              letterSpacing: 'var(--tracking-tighter)',
              color: 'var(--color-text-primary)',
              clipPath: 'inset(0 0 0 0)',
            }}
          >
            Tools
            <br />
            I Work
            <br />
            With<span style={{ color: 'var(--color-accent)' }}>.</span>
          </h2>

          <p
            className="skills-support mt-6 max-w-lg text-[13px] md:text-[14px]"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Technologies and methods I use to build intelligent software systems.
          </p>
        </div>

        {/* ── Desktop: Constellation ── */}
        <div className="hidden md:block">
          <DesktopConstellation
            getNodeState={getNodeState}
            getLineState={getLineState}
            activate={activate}
            deactivate={deactivate}
          />
        </div>

        {/* ── Mobile: Relationship view ── */}
        <div className="md:hidden">
          <MobileSkills />
        </div>

        {/* ── End statement ── */}
        <div className="skills-end mt-16 md:mt-24 lg:mt-32 text-center">
          <p
            className="font-bold uppercase tracking-wide"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              lineHeight: 'var(--leading-normal)',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            Building at the intersection
            <br />
            of software, data and intelligence<span style={{ color: 'var(--color-accent)' }}>.</span>
          </p>
        </div>

      </div>
    </section>
  )
}
