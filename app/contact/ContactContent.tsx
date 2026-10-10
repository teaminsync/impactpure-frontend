"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import FadeIn from "@/components/animations/FadeIn"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { toast } from "react-toastify"
import { CONFIG } from "@/lib/constants"

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {

      const GOOGLE_SCRIPT_URL = CONFIG.SHEETS


      // Create form data object
      const formDataObj = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Not provided",
        subject: formData.subject,
        message: formData.message,
      }

      // Method 1: Using URL parameters (more reliable for Google Apps Script)
      const queryString = new URLSearchParams({
        name: formDataObj.name,
        email: formDataObj.email,
        phone: formDataObj.phone,
        subject: formDataObj.subject,
        message: formDataObj.message,
      }).toString()

      const response = await fetch(`${GOOGLE_SCRIPT_URL}?${queryString}`, {
        method: "GET",
        mode: "no-cors", // This is important for CORS issues
      })

      // Since we're using no-cors, we can't actually read the response
      // So we'll just assume success if no error is thrown
      toast.success("Message sent successfully! We'll get back to you soon.")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to send message. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: [
        "Kalki Ecosphere Pvt Ltd.",
        "Unit no. 5, Friends' Co-op Hsg. Soc Ltd,",
        "Dhobighat Road, Vakola, Santacruz East,",
        "Mumbai-400055",
      ],
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+91 9322275124"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["rohit@kalkiecosphere.com"],
    },
  ]

  return (
    <section className="overflow-hidden pt-12 md:pt-16 lg:pt-12 pb-0">
      {/* Hero Section */}
      <section className="pt-16 pb-0 md:pt-20 md:pb-0 lg:pt-16 lg:pb-0">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="section-title">Get in Touch</h1>
            <p className="section-subtitle mx-auto">Questions about IMPACTPURE? We're here to help.</p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col-reverse gap-16 lg:grid lg:grid-cols-2">
            {/* Contact Form */}
            <FadeIn direction="left">
              <div className="bg-neutral-50 rounded-2xl p-8">
                <h2 className="text-2xl font-medium text-neutral-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </FadeIn>

            {/* Contact Information */}
            <FadeIn direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-medium text-neutral-900 mb-6">Contact Information</h2>
                  <p className="text-neutral-600 mb-8">
                    Ready to transform your water experience? Reach out to us through any of the channels below.
                  </p>
                </div>

                <div className="space-y-2">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900 mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-neutral-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-medium text-neutral-900 mb-4">Find Us</h2>
            <p className="text-neutral-600">Visit our office in Mumbai for product demonstrations and consultations.</p>
          </FadeIn>

          <FadeIn>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.5507744867427!2d72.84570517520562!3d19.083478882122616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9aa613a5719%3A0xbe5d9a6387063bb2!2sKALKI%20ECOSPHERE%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1791291842221!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </section>
  )
}

export default ContactContent
