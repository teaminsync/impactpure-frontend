"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import type { BannerData } from "@/types"
import Title from "@/components/Title"

interface BannerProps {
  data: BannerData
  variant: "left" | "right" | "center" | "overlay" | "split" | "fullwidth"
  index: number
}

const Banner = ({ data, variant, index }: BannerProps) => {
  const { image, title, subtitle, link } = data
  const containerRef = useRef<HTMLDivElement>(null)
  const [inViewRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  // Determine background color based on index
  const getBgColor = () => {
    if (index % 3 === 0) return "bg-gradient-to-br from-white via-primary-50/30 to-white"
    if (index % 3 === 1) return "bg-gradient-to-br from-white via-secondary-50/30 to-white"
    return "bg-gradient-to-br from-white via-neutral-50 to-white"
  }

  // Render different banner layouts based on variant
  const renderBanner = () => {
    switch (variant) {
      case "left":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 items-center py-20 gap-12 md:gap-16">
            <div className="flex justify-center items-center order-2 md:order-1">
              <motion.div
                style={{ scale, opacity }}
                className="relative w-full aspect-square md:aspect-[4/3] max-w-lg overflow-hidden rounded-2xl"
              >
                <Image
                  src={image || "/placeholder.svg?height=600&width=600"}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>

            <motion.div style={{ y }} className="flex flex-col justify-center space-y-6 order-1 md:order-2">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900"
              >
                {title}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-neutral-600 text-lg space-y-4"
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a
                  href={link || "#"}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors group"
                >
                  <span>Explore More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        )

      case "right":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 items-center py-20 gap-12 md:gap-16">
            <motion.div style={{ y }} className="flex flex-col justify-center space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900"
              >
                {title}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-neutral-600 text-lg space-y-4"
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <a
                  href={link || "#"}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors group"
                >
                  <span>Explore More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            <div className="flex justify-center items-center">
              <motion.div
                style={{ scale, opacity }}
                className="relative w-full aspect-square md:aspect-[4/3] max-w-lg overflow-hidden rounded-2xl"
              >
                <Image
                  src={image || "/placeholder.svg?height=600&width=600"}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        )

      case "center":
        return (
          <div className="flex flex-col items-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 max-w-3xl mx-auto px-4"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">{title}</h3>
              <div className="text-neutral-600 text-lg space-y-4" dangerouslySetInnerHTML={{ __html: subtitle }} />
            </motion.div>

            <motion.div
              style={{ scale, opacity }}
              className="relative w-full max-w-4xl aspect-[16/9] overflow-hidden rounded-2xl mx-auto"
            >
              <Image
                src={image || "/placeholder.svg?height=600&width=1200"}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <a
                href={link || "#"}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors group"
              >
                <span>Explore More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        )

      case "overlay":
        return (
          <div className="py-20">
            <motion.div
              style={{ scale, opacity }}
              className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl"
            >
              <Image
                src={image || "/placeholder.svg?height=600&width=1400"}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                  <div className="max-w-xl text-white">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                    >
                      {title}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-white/90 text-lg space-y-4 mb-8"
                      dangerouslySetInnerHTML={{ __html: subtitle }}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <a
                        href={link || "#"}
                        className="inline-flex items-center px-6 py-3 bg-white text-primary-900 rounded-full font-medium hover:bg-neutral-100 transition-colors group"
                      >
                        <span>Explore More</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )

      case "split":
        return (
          <div className="py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <motion.div style={{ y }} className="bg-primary-900 text-white p-8 md:p-12 lg:p-16 flex items-center">
                <div className="max-w-lg">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                  >
                    {title}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-white/80 text-lg space-y-4 mb-8"
                    dangerouslySetInnerHTML={{ __html: subtitle }}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <a
                      href={link || "#"}
                      className="inline-flex items-center px-6 py-3 bg-white text-primary-900 rounded-full font-medium hover:bg-neutral-100 transition-colors group"
                    >
                      <span>Explore More</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div style={{ scale, opacity }} className="relative aspect-square md:aspect-auto">
                <Image
                  src={image || "/placeholder.svg?height=800&width=800"}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
              </motion.div>
            </div>
          </div>
        )

      case "fullwidth":
        return (
          <div className="py-20">
            <div className="text-center mb-16">
              <Title text1="PRODUCT" text2="FEATURES" />
              <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
                Discover the innovative design and technology behind IMPACTPURE water purifiers
              </p>
            </div>

            <motion.div style={{ scale, opacity }} className="relative w-full aspect-[21/9] overflow-hidden">
              <Image
                src={image || "/placeholder.svg?height=600&width=1400"}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-end">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                  <div className="max-w-3xl mx-auto text-center text-white">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                    >
                      {title}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-white/90 text-lg space-y-4 mb-8"
                      dangerouslySetInnerHTML={{ __html: subtitle }}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex justify-center"
                    >
                      <a
                        href={link || "#"}
                        className="inline-flex items-center px-8 py-4 bg-white text-primary-900 rounded-full font-medium hover:bg-neutral-100 transition-colors group"
                      >
                        <span>Learn More About {title}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section
      ref={(el) => {
        // Combine refs
        if (el) {
          containerRef.current = el
          inViewRef(el)
        }
      }}
      className={cn("w-full overflow-hidden", getBgColor())}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">{renderBanner()}</div>
    </section>
  )
}

// Main component that renders all banners
const Banners = ({ bannerData }: { bannerData: BannerData[] }) => {
  // Define banner variants in order
  const variants: ("left" | "right" | "center" | "overlay" | "split" | "fullwidth")[] = [
    "overlay",
    "left",
    "right",
    "split",
    "center",
    "fullwidth",
  ]

  return (
    <div className="w-full">
      {bannerData.map((banner, index) => (
        <Banner key={index} data={banner} variant={variants[index % variants.length]} index={index} />
      ))}
    </div>
  )
}

export default Banners
