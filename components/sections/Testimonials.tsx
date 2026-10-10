"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { TestimonialsData } from "@/lib/mockData"
import FadeIn from "@/components/animations/FadeIn"

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const startAutoplay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(TestimonialsData.length / slidesToShow))
      }, 5000)
    }

    startAutoplay()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [slidesToShow])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(TestimonialsData.length / slidesToShow))
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(TestimonialsData.length / slidesToShow)) %
        Math.ceil(TestimonialsData.length / slidesToShow),
    )
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const getVisibleTestimonials = () => {
    const startIndex = currentSlide * slidesToShow
    return TestimonialsData.slice(startIndex, startIndex + slidesToShow)
  }

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Real experiences from people who trust IMPACTPURE for their daily hydration needs.
          </p>
        </FadeIn>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`grid gap-8 ${
                  slidesToShow === 1 ? "grid-cols-1" : slidesToShow === 2 ? "grid-cols-2" : "grid-cols-3"
                }`}
              >
                {getVisibleTestimonials().map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-neutral-600 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>

                    {/* Author */}
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 mr-4">
                        <Image
                          src={testimonial.img || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{testimonial.name}</p>
                        <p className="text-sm text-neutral-500">{testimonial.position || "Verified Customer"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} className="text-neutral-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} className="text-neutral-700" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(TestimonialsData.length / slidesToShow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary-600" : "bg-neutral-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
