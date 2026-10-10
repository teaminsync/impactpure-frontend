"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useShopContext } from "@/contexts/ShopContext"
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react"
import { CONFIG } from "@/lib/constants"

const Footer = () => {
  const { navigate } = useShopContext()

  const handleNavigation = (path: string) => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  const handleProductClick = () => {
    const productId = CONFIG.DEFAULT_PRODUCT_ID
    navigate(`/product/${productId}`)
  }

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "Home", action: () => handleNavigation("/") },
        { name: "About us", action: () => handleNavigation("/about") },
        { name: "Contact us", action: () => handleNavigation("/contact") },
        { name: "Product", action: handleProductClick },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms & Conditions", action: () => handleNavigation("/termsandconditions") },
        { name: "Privacy Policy", action: () => handleNavigation("/privacypolicy") },
        { name: "Cancellations & Refunds", action: () => handleNavigation("/cancellationsandrefunds") },
        { name: "Shipping & Delivery", action: () => handleNavigation("/shippinganddelivery") },
      ],
    },
  ]

  const staggerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-1"
          >
            <Image src="/assets/logo.png" alt="IMPACTPURE Logo" width={144} height={40} className="h-10 w-auto mb-6" />
            <p className="text-neutral-600 text-sm mb-6">
              IMPACTPURE® combines advanced technology and eco-friendly design to deliver pure, mineral-rich water for
              every need. Join us in creating a sustainable future with zero electricity, no water wastage, and reliable
              hydration.
            </p>
          </motion.div>

          {/* Navigation columns */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="col-span-1"
            >
              <h3 className="text-lg font-medium text-neutral-900 mb-6">{section.title}</h3>
              <motion.ul
                variants={staggerAnimation}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {section.links.map((link) => (
                  <motion.li key={link.name} variants={itemAnimation}>
                    <button
                      onClick={link.action}
                      className="text-neutral-600 hover:text-primary-600 text-sm transition-colors"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}

          {/* Newsletter column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1"
          >
            <h3 className="text-lg font-medium text-neutral-900 mb-6">Get in Touch</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center text-sm text-neutral-600">
                <Phone size={16} className="mr-2 text-primary-600" />
                +91 9322275124
              </li>
              <li className="flex items-center text-sm text-neutral-600">
                <Mail size={16} className="mr-2 text-primary-600" />
                <a href="mailto:rohit@kalkiecosphere.com" className="hover:text-primary-600 transition-colors">
                  rohit@kalkiecosphere.com
                </a>
              </li>
            </ul>

            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/impactpure.purifier/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/kalkiecospherellp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com/kalkiecosphere"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar with proper company credit placement */}
        <div className="mt-16 pt-8 border-t border-neutral-100">
          <div className="flex flex-col space-y-3">
            {/* Main copyright and trademark line */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-neutral-500 mb-2 md:mb-0 text-center">
                &copy; {new Date().getFullYear()} Kalki Ecosphere Pvt Ltd. All rights reserved.
              </p>
              <p className="text-sm text-neutral-500 text-center">
                IMPACTPURE is a registered trademark of Kalki Ecosphere LLP.
              </p>
            </div>

            {/* Company credit line */}
            <div className="text-center">
              <p className="text-xs text-neutral-400">
                Designed & Developed by{" "}
                <a
                  href="https://letsinsync.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
                >
                  InSync Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer