import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsap'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { GridBackground } from '@/components/ui/GridBackground'
import { Hero } from '@/sections/Hero'
import { Work } from '@/sections/Work'
import { Research } from '@/sections/Research'
import { About } from '@/sections/About'
import { ExperienceSection } from '@/sections/Experience'
import { Skills } from '@/sections/Skills'
import { CodingProfiles } from '@/sections/CodingProfiles'
import { setLenisInstance } from '@/lib/scroll'
import { Contact } from '@/sections/Contact'

export function App() {
  useEffect(() => {
    // Respect reduced-motion preference — skip smooth scroll hijacking
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    setLenisInstance(lenis)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Animation frame loop — store ID for cleanup
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])

  return (
    <>
      <GridBackground />
      <ScrollProgress />
      <Navbar />

      <main className="flex flex-col">
        <Hero />
        <Work />
        <Research />
        <About />
        <ExperienceSection />
        <Skills />
        <CodingProfiles />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
