"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useShopContext } from "@/contexts/ShopContext"
import { CONFIG } from "@/lib/constants"
import { Play, ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import HeroModel without SSR
const HeroModel = dynamic(() => import("../hero/HeroModel"), {
  ssr: false,
  loading: () => null,
})

const Hero = () => {
  const { navigate } = useShopContext()
  const containerRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Conditional parallax effects - disabled on mobile
  const opacity = useTransform(scrollYProgress, [0, 0.5], isMobile ? [1, 1] : [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], isMobile ? [1, 1] : [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], isMobile ? [0, 0] : [0, 100])

  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(true)
  const [startModelLoad, setStartModelLoad] = useState(false)
  const [modelLoaded, setModelLoaded] = useState(false)

  // Start model loading only after text animations are done (after 1 second delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartModelLoad(true)
    }, 1000) // Wait for text animations to complete

    return () => clearTimeout(timer)
  }, [])

  // This function is called when the model is loaded
  const handleModelLoaded = useCallback(() => {
    console.log("🎯 Model loaded")
    setModelLoaded(true)
  }, [])

  // Run the progress animation independently
  useEffect(() => {
    let frame: number | undefined
    const start = performance.now()

    const step = (time: number) => {
      const elapsed = time - start
      const duration = 2500
      const percent = Math.min(elapsed / duration, 1)
      const eased = percent < 0.5 ? 2 * percent * percent : 1 - Math.pow(-2 * percent + 2, 3) / 2
      const newProgress = Math.floor(eased * 100)
      setProgress(newProgress)

      if (percent < 1) {
        frame = requestAnimationFrame(step)
      } else {
        // When progress reaches 100%, wait a tiny moment then hide progress
        setTimeout(() => {
          setShowProgress(false)
        }, 200)
      }
    }

    frame = requestAnimationFrame(step)
    return () => {
      if (frame !== undefined) {
        cancelAnimationFrame(frame)
      }
    }
  }, [])

  const handleOrderNowClick = () => {
    navigate(`/product/${CONFIG.DEFAULT_PRODUCT_ID}`)
  }

  const handleLearnMoreClick = () => {
    window.open("https://youtu.be/u-fZGPfa5BQ?feature=shared", "_blank")
  }

  const getLoadingMessage = () => {
    if (progress < 30) return "Waking up the system"
    if (progress < 60) return "Booting the 3D experience"
    if (progress < 90) return "Finalizing textures & geometry"
    return "Almost ready..."
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white -z-10" />

      <motion.div
        style={{ opacity, scale, y }}
        className="container mx-auto px-4 md:px-6 lg:px-8 pt-28 pb-8 md:pt-24 md:pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Text content */}
          <div className="flex flex-col space-y-7 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block px-5 py-2 bg-primary-100 text-primary-700 rounded-full text-base font-medium">
                Revolutionary Water Purification
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight"
            >
              <span className="text-neutral-900">World&apos;s First</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                Plug & Play
              </span>
              <br />
              <span className="text-neutral-900">Water Purifier</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-neutral-700 text-base md:text-xl max-w-xl leading-relaxed"
            >
              IMPACTPURE® offers portable, sustainable water purification with zero electricity and no water wastage,
              while retaining essential minerals.
              <span className="block mt-3 text-base text-neutral-500">
                [Interact with the 3D model to explore the product]
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-5 mt-12"
            >
              <button onClick={handleOrderNowClick} className="btn-primary text-lg py-3 px-8">
                <span>Order Now</span>
              </button>

              <button onClick={handleLearnMoreClick} className="btn-outline group text-lg py-3 px-8">
                <span className="flex items-center">
                  <Play size={18} className="mr-2 group-hover:text-white" />
                  Learn More
                </span>
              </button>
            </motion.div>
          </div>

          {/* 3D Model Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full"
          >
            {/* Only render model after text animations are done AND when progress is complete */}
            {startModelLoad && !showProgress && (
              <div className="absolute inset-0 w-full h-full">
                <HeroModel onModelLoaded={handleModelLoaded} />
              </div>
            )}

            {/* Show progress animation until it completes */}
            <AnimatePresence>
              {showProgress && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-primary-600 font-bold"
                    style={{ fontSize: `${Math.max(3, progress / 20)}rem` }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {progress}%
                  </motion.div>
                  <motion.div
                    className="text-neutral-600 text-sm font-medium"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {getLoadingMessage()}
                  </motion.div>
                  <div className="w-48 h-0.5 bg-neutral-200">
                    <motion.div className="h-full bg-primary-600" style={{ width: `${progress}%` }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Show a brief loading state if model hasn't loaded yet after progress completes */}
            {!showProgress && startModelLoad && !modelLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="text-primary-600 text-2xl font-medium"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  Loading 3D Model...
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with mobile-specific positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className={`absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center text-neutral-400 ${
          isMobile ? "bottom-1" : "bottom-8"
        }`}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
