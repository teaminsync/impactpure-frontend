"use client"

import { motion } from "framer-motion"
import { Award, Users, Globe, Heart } from "lucide-react"
import FadeIn from "@/components/animations/FadeIn"
import ParallaxImage from "@/components/animations/ParallaxImage"

const AboutContent = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health First",
      description: "We prioritize your health by ensuring every drop of water is pure and mineral-rich.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Sustainability",
      description: "Our eco-friendly approach ensures zero electricity consumption and no water wastage.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Innovation",
      description: "Cutting-edge technology meets traditional wisdom in our advanced filtration systems.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Building a healthier future for communities worldwide through accessible clean water.",
    },
  ]

  const stats = [
  { number: "10 Years", label: "Lifespan" },
  { number: "8", label: "Stage Filtration" },
  { number: "5", label: "Registered Patents" },
  { number: "99.99%", label: "Purification Rate" },
]


  return (
    <section className="overflow-hidden pt-12 md:pt-16 lg:pt-12 pb-0"
>
      {/* Hero Section */}
      <section className="section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="section-title">About IMPACTPURE</h1>
            <p className="section-subtitle mx-auto">
              Revolutionizing water purification with innovation, sustainability, and care.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* IMAGE FIRST ON MOBILE */}
            <FadeIn direction="right" className="order-1 lg:order-2">
              <ParallaxImage
                src="/assets/about_img.png"
                alt="About IMPACTPURE"
                className="aspect-[4/3] rounded-2xl"
                speed={0.3}
              />
            </FadeIn>

            {/* TEXT SECOND ON MOBILE */}
            <FadeIn direction="left" className="order-2 lg:order-1">
              <div className="space-y-6">
                <h2 className="text-3xl font-medium text-neutral-900">Our Mission</h2>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  At IMPACTPURE, our mission is to empower people with access to clean water through innovative,
                  sustainable, and affordable solutions. We are dedicated to preserving the environment for future
                  generations while ensuring reliability and convenience.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Founded with a vision to create innovative, eco-friendly solutions that prioritize sustainability
                  without compromising quality, we set a new standard in water purification technology.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-4xl md:text-5xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                <p className="text-primary-100">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle mx-auto">The principles that guide everything we do at IMPACTPURE.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.1}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto text-primary-600">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-medium text-neutral-900">{value.title}</h3>
                  <p className="text-neutral-600">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="section-title">Why Choose IMPACTPURE</h2>
            <p className="section-subtitle mx-auto">
              Discover what makes us the preferred choice for water purification solutions.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-xl font-medium text-neutral-900 mb-4">Eco-Friendly Solutions</h3>
                <p className="text-neutral-600">
                  Designed with sustainability in mind, our purifiers require no electricity and eliminate water
                  wastage, contributing to a greener planet.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-xl font-medium text-neutral-900 mb-4">Convenience</h3>
                <p className="text-neutral-600">
                  Plug-and-play technology ensures ease of use, whether at home, work, or on the go. No complex
                  installation required.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-xl font-medium text-neutral-900 mb-4">Uncompromised Quality</h3>
                <p className="text-neutral-600">
                  Retains essential minerals while ensuring 99.99% sterilization with advanced multi-stage filtration
                  technology.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </section>
  )
}

export default AboutContent
