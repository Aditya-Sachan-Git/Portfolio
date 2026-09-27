import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 right-0"
      style={{
        height: '2px',
        zIndex: 'calc(var(--z-nav) + 1)',
      }}
    >
      <div
        className="h-full origin-left"
        style={{
          backgroundColor: 'var(--color-accent)',
          transform: `scaleX(${progress})`,
          transition: 'transform 100ms linear',
        }}
      />
    </div>
  )
}
