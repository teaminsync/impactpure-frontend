"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { toast } from "react-toastify"
import { Mail, ArrowRight } from "lucide-react"
import { CONFIG } from "@/lib/constants"
import FadeIn from "@/components/animations/FadeIn"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(`${CONFIG.BACKEND_URL}/api/newsletter/subscribe`, { email })
      toast.success(response.data.message || "Successfully subscribed to newsletter!")
      setEmail("")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="section bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Mail size={32} className="text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-medium mb-4">Stay Updated with IMPACTPURE</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Get the latest updates on our products, exclusive offers, and water purification insights delivered to
              your inbox.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary-600 rounded-lg font-medium hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </motion.button>
              </div>
              <p className="text-sm text-primary-100 mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
