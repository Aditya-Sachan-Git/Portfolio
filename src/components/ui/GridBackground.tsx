import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  showCoordinates?: boolean
}

export function GridBackground({ className, showCoordinates = true }: GridBackgroundProps) {
  return (
    <div
      className={cn('pointer-events-none fixed inset-0', className)}
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Dot grid pattern */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="var(--color-text-muted)" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Coordinate markers */}
      {showCoordinates && (
        <>
          <span
            className="hidden md:block absolute left-4 top-4 select-none opacity-20"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}
          >
            0,0
          </span>
          <span
            className="hidden md:block absolute right-4 top-4 select-none opacity-20"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}
          >
            1.0,0
          </span>
          <span
            className="hidden md:block absolute bottom-4 left-4 select-none opacity-20"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}
          >
            0,1.0
          </span>
          <span
            className="hidden md:block absolute bottom-4 right-4 select-none opacity-20"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}
          >
            1.0,1.0
          </span>
        </>
      )}
    </div>
  )
}
