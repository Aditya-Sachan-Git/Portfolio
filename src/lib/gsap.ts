import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Default GSAP configuration
gsap.defaults({
  ease: 'power3.out',
  duration: 1,
})

export { gsap, ScrollTrigger }
