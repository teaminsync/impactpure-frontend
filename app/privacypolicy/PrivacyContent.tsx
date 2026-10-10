"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users } from "lucide-react"
import FadeIn from "@/components/animations/FadeIn"

const PrivacyContent = () => {
  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Internal record keeping and improving our products and services",
        "Sending promotional emails about new products, special offers, or other information which we think you may find interesting",
        "Contacting you for market research purposes via email, phone, fax, or mail",
        "Customizing the website according to your interests",
      ],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "You can opt out of direct marketing by indicating your preference when filling forms",
        "You may change your mind about direct marketing at any time by contacting us",
        "We will not sell, distribute or lease your personal information to third parties unless required by law",
        "You can request correction of any incorrect or incomplete information we hold about you",
      ],
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Name and contact information including email address",
        "Demographic information such as postcode, preferences and interests, if required",
        "Other information relevant to customer surveys and/or offers",
      ],
    },
    
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "We are committed to ensuring that your information is secure",
        "We have put in suitable measures to prevent unauthorized access or disclosure",
      ],
    },
    
  ]

  return (
    <div className="overflow-hidden pt-12 md:pt-16 lg:pt-12 pb-0">
      {/* Hero Section */}
      <section className="section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="section-title">Privacy Policy</h1>
            <p className="section-subtitle mx-auto">
              Learn how Kalki Ecosphere Pvt Ltd protects your privacy and handles your personal information.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-4 md:py-6 lg:py-4">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-primary-50 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-medium text-neutral-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-neutral-600 leading-relaxed">
                This privacy policy sets out how <strong>Kalki Ecosphere Pvt Ltd</strong> uses and protects any
                information that you give us when you visit our website and/or agree to purchase from us. We are
                committed to ensuring that your privacy is protected and will only use your information in accordance
                with this privacy statement. Kalki Ecosphere Pvt Ltd may change this policy from time to time by
                updating this page.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="section bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <FadeIn key={section.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3 text-primary-600">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-medium text-neutral-900">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-neutral-600 text-sm">{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cookies Information */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-neutral-50 rounded-2xl p-8">
              <h2 className="text-2xl font-medium text-neutral-900 mb-6">How We Use Cookies</h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you
                  agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a
                  particular site. Cookies allow web applications to respond to you as an individual. The web
                  application can tailor its operations to your needs, likes, and dislikes by gathering and remembering
                  information about your preferences.
                </p>
                <p>
                  We use traffic log cookies to identify which pages are being used. This helps us analyze data about
                  webpage traffic and improve our website in order to tailor it to customer needs. We only use this
                  information for statistical analysis purposes and then the data is removed from the system.
                </p>
                <p>
                  Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you
                  find useful and which you do not. A cookie in no way gives us access to your computer or any
                  information about you, other than the data you choose to share with us. You can choose to accept or
                  decline cookies. Most web browsers automatically accept cookies, but you can usually modify your
                  browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of
                  the website.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Controlling Personal Information */}
      <section className="section bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-medium text-neutral-900 mb-6">Controlling Your Personal Information</h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  You may choose to restrict the collection or use of your personal information in the following ways:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                    <p>
                      Whenever you are asked to fill in a form on the website, look for the box that you can click to
                      indicate that you do not want the information to be used by anybody for direct marketing purposes.
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                    <p>
                      If you have previously agreed to us using your personal information for direct marketing purposes,
                      you may change your mind at any time by writing to or emailing us at{" "}
                      <strong>rohit@kalkiecosphere.com</strong>
                    </p>
                  </li>
                </ul>
                <p>
                  We will not sell, distribute or lease your personal information to third parties unless we have your
                  permission or are required by law to do so. We may use your personal information to send you
                  promotional information about third parties which we think you may find interesting if you tell us
                  that you wish this to happen.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-primary-600 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-medium mb-4">Questions About Privacy?</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              If you believe that any information we are holding on you is incorrect or incomplete, or if you have any
              questions about our privacy policy, please contact us.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/10 rounded-lg px-6 py-3">
              <span className="text-primary-100">Email us at:</span>
              <a href="mailto:rohit@kalkiecosphere.com" className="font-medium hover:underline">
                rohit@kalkiecosphere.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default PrivacyContent
