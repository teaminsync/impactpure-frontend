"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import FadeIn from "@/components/animations/FadeIn"

// Unique banner content with strategic messaging
const bannerContent = [
  {
    id: "mhd-technology",
    image: "/assets/1.png",
    category: "INNOVATION",
    title: "Magnetohydrodynamics",
    subtitle: "Revolutionary MHD Technology",
    description:
      "The first water purifier to harness electromagnetic fields for natural water conditioning, preserving essential minerals while eliminating contaminants.",
    features: ["Zero Electricity", "Mineral Retention", "Electromagnetic Conditioning"],
    cta: "Discover the Science",
    variant: "overlay-dark",
  },
  {
    id: "filtration-system",
    image: "/assets/picture2.png",
    category: "PURIFICATION",
    title: "Multi-Stage Defense",
    subtitle: "Advanced Filtration Matrix",
    description:
      "UF, nano-silver, copper infusion, and KDF technologies work in harmony to eliminate bacteria, viruses, heavy metals, and microplastics.",
    features: ["99.9% Pathogen Removal", "Heavy Metal Elimination", "Chemical-Free Process"],
    cta: "View Technology",
    variant: "hero-split",
  },
  {
    id: "certification",
    image: "/assets/3.png",
    category: "TRUST",
    title: "NABL Certified",
    subtitle: "Himalayan-Level Purity",
    description:
      "Backed by NABL certification and five registered patents, delivering water purity that matches the pristine Himalayan sources.",
    features: ["NABL Certified", "5 Patents", "Himalayan Purity"],
    cta: "View Certifications",
    variant: "premium-showcase",
  },
  {
    id: "portability",
    image: "/assets/4.png",
    category: "MOBILITY",
    title: "Plug & Pure",
    subtitle: "Instant Water Transformation",
    description:
      "Transform any tap into a source of pure water. Lightweight, compact, and ready for travel, outdoor adventures, or emergency situations.",
    features: ["Instant Setup", "Travel Ready", "Emergency Prepared"],
    cta: "Explore Portability",
    variant: "overlay-dark",
  },
  {
    id: "sustainability",
    image: "/assets/picture3.png",
    category: "SUSTAINABILITY",
    title: "Zero Waste Design",
    subtitle: "Eco-Conscious Engineering",
    description:
      "Crafted with high-grade metals and clay components, operating without electricity while eliminating water wastage entirely.",
    features: ["Carbon Neutral", "Plastic-Free Design", "10-Year Lifespan"],
    cta: "Environmental Impact",
    variant: "hero-split",
  },
  {
    id: "affordability",
    image: "/assets/5.png",
    category: "VALUE",
    title: "₹80 Per Month",
    subtitle: "Premium Water, Accessible Price",
    description:
      "High-quality hydration at an unbeatable cost. DIY maintenance and annual filter replacement make it the most economical choice.",
    features: ["Cost Effective", "DIY Maintenance", "Annual Filter Change"],
    cta: "Calculate Savings",
    variant: "asymmetric-left",
  },
]

interface BannerProps {
  content: (typeof bannerContent)[0]
  index: number
}

const PremiumBanner = ({ content, index }: BannerProps) => {
  const containerRef = useRef<HTMLElement>(null)
  const [inViewRef, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  // Combine refs function
  const setRefs = (el: HTMLElement | null) => {
    containerRef.current = el
    inViewRef(el)
  }

  const renderBanner = () => {
    switch (content.variant) {
      case "hero-split":
        return (
          <div className="min-h-screen flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
              <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white p-8 lg:p-16 flex items-center">
                <div className="max-w-lg">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-primary-200 text-sm font-medium tracking-wider mb-4"
                  >
                    {content.category}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl lg:text-6xl font-bold mb-4"
                  >
                    {content.title}
                  </motion.h2>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl lg:text-2xl text-primary-100 mb-6"
                  >
                    {content.subtitle}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-primary-100 text-lg mb-8 leading-relaxed"
                  >
                    {content.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-3 mb-8"
                  >
                    {content.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-secondary-400 rounded-full" />
                        <span className="text-primary-100">{feature}</span>
                      </div>
                    ))}
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white text-primary-900 px-8 py-4 rounded-full font-semibold hover:bg-primary-50 transition-colors"
                  >
                    {content.cta}
                  </motion.button>
                </div>
              </div>

              <motion.div style={{ scale, opacity }} className="relative min-h-[50vh] md:min-h-[60vh] lg:min-h-full">
                <Image
                  src={content.image || "/placeholder.svg"}
                  alt={content.title}
                  fill
                  className="object-cover md:object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            </div>
          </div>
        )

      case "asymmetric-left":
        return (
          <div className="pt-24 pb-8 lg:pt-32 lg:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <motion.div style={{ y }} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                </motion.div>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6 }}
                  className="text-secondary-600 text-sm font-medium tracking-wider"
                >
                  {content.category}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-3xl lg:text-5xl font-bold text-neutral-900"
                >
                  {content.title}
                </motion.h2>

                <motion.h3
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-neutral-600"
                >
                  {content.subtitle}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-neutral-600 text-lg leading-relaxed"
                >
                  {content.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-1 gap-3"
                >
                  {content.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full" />
                      <span className="text-neutral-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                >
                  {content.cta}
                </motion.button>
              </div>
            </div>
          </div>
        )

      case "minimal-center":
        return (
          <div className="py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-secondary-600 text-sm font-medium tracking-wider mb-4"
              >
                {content.category}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-4"
              >
                {content.title}
              </motion.h2>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl lg:text-2xl text-neutral-600 mb-8"
              >
                {content.subtitle}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-neutral-600 text-lg leading-relaxed max-w-3xl mx-auto"
              >
                {content.description}
              </motion.p>
            </div>

            <motion.div
              style={{ scale, opacity }}
              className="relative aspect-[21/9] max-w-6xl mx-auto overflow-hidden rounded-3xl mb-12"
            >
              <Image
                src={content.image || "/placeholder.svg"}
                alt={content.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {content.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                  className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-neutral-200"
                >
                  <span className="text-neutral-800 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center"
            >
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors"
              >
                {content.cta}
              </motion.button>
            </motion.div>
          </div>
        )

      case "overlay-dark":
        return (
          <div className="py-8 md:py-16 lg:py-24">
            <motion.div
              style={{ scale, opacity }}
              className="relative min-h-[420px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-2xl md:rounded-3xl"
            >
              <Image
                src={content.image || "/placeholder.svg"}
                alt={content.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />

              <div className="absolute inset-0 flex items-center justify-start">
                <div className="w-full max-w-lg text-white p-6 md:p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-secondary-300 text-xs md:text-sm font-medium tracking-wider mb-3 md:mb-4"
                  >
                    {content.category}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 leading-tight"
                  >
                    {content.title}
                  </motion.h2>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6 leading-relaxed"
                  >
                    {content.subtitle}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8"
                  >
                    {content.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8"
                  >
                    {content.features.map((feature, idx) => (
                      <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-1.5 md:py-2">
                        <span className="text-white text-xs md:text-sm font-medium whitespace-nowrap">{feature}</span>
                      </div>
                    ))}
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white text-neutral-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-neutral-100 transition-colors text-sm md:text-base"
                  >
                    {content.cta}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )

      case "asymmetric-right":
        return (
          <div className="py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="text-secondary-600 text-sm font-medium tracking-wider"
                >
                  {content.category}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-bold text-neutral-900"
                >
                  {content.title}
                </motion.h2>

                <motion.h3
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-neutral-600"
                >
                  {content.subtitle}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-neutral-600 text-lg leading-relaxed"
                >
                  {content.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-1 gap-3"
                >
                  {content.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full" />
                      <span className="text-neutral-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                >
                  {content.cta}
                </motion.button>
              </div>

              <div className="lg:col-span-7">
                <motion.div style={{ y }} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-black/20" />
                </motion.div>
              </div>
            </div>
          </div>
        )

      case "premium-showcase":
        return (
          // <div className="py-24 lg:py-32 bg-gradient-to-b from-white to-neutral-50">
          <div className="pt-12 pb-4 lg:pt-20 lg:pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div style={{ y }} className="relative">
                <div className="aspect-square overflow-hidden rounded-3xl">
                  <Image
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary-500 rounded-full opacity-20" />
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary-500 rounded-full opacity-20" />
              </motion.div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                  className="text-secondary-600 text-sm font-medium tracking-wider"
                >
                  {content.category}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-bold text-neutral-900"
                >
                  {content.title}
                </motion.h2>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl lg:text-2xl text-neutral-600"
                >
                  {content.subtitle}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-neutral-600 text-lg leading-relaxed"
                >
                  {content.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {content.features.map((feature, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200 text-center">
                      <span className="text-neutral-800 font-semibold text-sm">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                >
                  {content.cta}
                </motion.button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section ref={setRefs} className="w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">{renderBanner()}</div>
    </section>
  )
}

const PremiumBanners = () => {
  return (
    <section className="section w-full">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <FadeIn className="text-center ">
          <h2 className="section-title">Product Innovation</h2>
          <p className="section-subtitle mx-auto">
            Discover the technology and design principles that make IMPACTPURE the ultimate water purification solution.
          </p>
        </FadeIn>
      </div>
      {bannerContent.map((content, index) => (
        <PremiumBanner key={content.id} content={content} index={index} />
      ))}
    </section>
  )
}

export default PremiumBanners
