"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Droplets, Leaf, Zap, Shield } from "lucide-react"
import FadeIn from "@/components/animations/FadeIn"

const Features = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const features = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Advanced Filtration",
      description: "Removes bacteria, viruses, heavy metals, and pesticides while retaining essential minerals.",
      delay: 0.1,
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Eco-Friendly",
      description: "Zero electricity consumption and no water wastage. Sustainable design for a better future.",
      delay: 0.2,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Plug & Play",
      description: "Instant setup with any tap. Portable design perfect for home, office, or travel.",
      delay: 0.3,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Certified Quality",
      description: "NABL certified with 5 registered patents. Himalayan-level water purity guaranteed.",
      delay: 0.4,
    },
  ]

  return (
    <section ref={ref} className="section bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">What Makes IMPACTPURE Unique</h2>
          <p className="section-subtitle mx-auto">
            Combining innovation, sustainability, and efficiency in water purification technology.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="feature-card group"
            >
              <div className="feature-icon text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
