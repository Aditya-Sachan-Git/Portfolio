import type Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance
}

export function getLenisInstance(): Lenis | null {
  return lenisInstance
}

/**
 * Smoothly scrolls to a target element by its ID,
 * offsetting the scroll position by the height of the fixed top navigation bar
 * so the target element is fully visible and not overlapped by the navbar.
 */
export function scrollToTarget(targetId: string) {
  const element = document.getElementById(targetId)
  if (!element) return

  // Measure dynamic navbar height from DOM, fallback to CSS variable 4.5rem (72px)
  const nav = document.querySelector('nav')
  const navHeight = nav ? nav.getBoundingClientRect().height : 72

  // Calculate the element's position relative to the document
  const rect = element.getBoundingClientRect()
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const elementTop = rect.top + scrollTop

  // Reduce the scroll Y by the height of the top nav
  const offsetPosition = Math.max(0, Math.round(elementTop - navHeight))

  // Ensure body scroll is not locked (e.g. from mobile menu)
  document.body.style.overflow = ''

  if (lenisInstance) {
    lenisInstance.scrollTo(offsetPosition, {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }
}

/**
 * Smoothly scrolls to the top of the page.
 */
export function scrollToTop() {
  document.body.style.overflow = ''

  if (lenisInstance) {
    lenisInstance.scrollTo(0, {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
  } else {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }
}
