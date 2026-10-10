"use client"

import { type ReactNode, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

interface SmoothScrollProps {
  children: ReactNode
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<any>(null)
  const rafRef = useRef<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const initLenis = async () => {
      try {
        // Use the correct, latest Lenis package
        const Lenis = (await import("lenis")).default

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        })

        lenisRef.current = lenis

        // Proper RAF loop
        const raf = (time: number) => {
          lenis.raf(time)
          rafRef.current = requestAnimationFrame(raf)
        }
        rafRef.current = requestAnimationFrame(raf)

        // Proper GSAP ScrollTrigger integration
        if (typeof window !== "undefined") {
          const { ScrollTrigger } = await import("gsap/ScrollTrigger")
          const { gsap } = await import("gsap")

          gsap.registerPlugin(ScrollTrigger)

          // Update ScrollTrigger on Lenis scroll
          lenis.on("scroll", ScrollTrigger.update)

          // Configure scrollerProxy for GSAP
          ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
              if (value !== undefined) {
                lenis.scrollTo(value, { immediate: true })
              }
              return lenis.scroll
            },
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              }
            },
            pinType: document.body.style.transform ? "transform" : "fixed",
          })

          // Refresh ScrollTrigger after setup
          ScrollTrigger.addEventListener("refresh", () => lenis.resize())
          ScrollTrigger.refresh()
        }

        return lenis
      } catch (error) {
        console.error("Failed to initialize Lenis:", error)
        return null
      }
    }

    initLenis().then((lenis) => {
      if (lenis) {
        lenisRef.current = lenis
      }
    })

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  // Handle route changes - scroll to top on navigation
  useEffect(() => {
    if (lenisRef.current) {
      // Immediate scroll to top on route change
      lenisRef.current.scrollTo(0, { immediate: true })

      // Refresh ScrollTrigger after route change
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.refresh()
      }
    }
  }, [pathname])

  return <>{children}</>
}

export default SmoothScroll
