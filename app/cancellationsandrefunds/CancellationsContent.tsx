"use client"

import { motion } from "framer-motion"
import { RotateCcw, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import FadeIn from "@/components/animations/FadeIn"

const CancellationsContent = () => {
  const policies = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Cancellation Timeline",
      content: [
        "Cancellations will be considered only if the request is made within 1-2 days of placing the order",
        "Cancellation requests may not be entertained if orders have been communicated to vendors and shipping has been initiated",
        "Kalki Ecosphere Pvt Ltd does not accept cancellation requests for perishable items like flowers, eatables, etc.",
      ],
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Refund Conditions",
      content: [
        "Refund/replacement can be made if the customer establishes that the quality of the product delivered is not good",
        "Damaged or defective items must be reported within 1-2 days of receipt",
        "The request will be entertained once the merchant has checked and determined the issue at their own end",
        "If you feel the product received is not as shown on the site or as per expectations, notify within 1-2 days",
      ],
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Quality Issues & Warranty",
      content: [
        "Our team will take appropriate decision after looking into your complaint",
        "For complaints regarding products with manufacturer warranty, please refer the issue to them directly",
        "All quality claims must be supported with proper documentation and evidence",
      ],
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Refund Processing",
      content: [
        "Approved refunds will take 9-15 days to be processed to the end customer",
        "Refunds will be processed to the original payment method used during purchase",
        "You will receive email confirmation once the refund has been initiated",
        "All refund approvals are subject to Kalki Ecosphere Pvt Ltd's verification process",
      ],
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Contact Support",
      description: "Reach out to our team within the specified timeframe",
    },
    {
      step: "02",
      title: "Provide Details",
      description: "Share order details, reason for cancellation/refund, and supporting documentation",
    },
    {
      step: "03",
      title: "Review Process",
      description: "Our team will review your request and verify the eligibility criteria",
    },
    {
      step: "04",
      title: "Resolution",
      description: "Approved requests will be processed and you'll receive confirmation",
    },
  ]

  return (
    <div className="overflow-hidden pt-12 md:pt-16 lg:pt-12 pb-0">
      {/* Hero Section */}
      <section className="section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="section-title">Cancellations & Refunds</h1>
            <p className="section-subtitle mx-auto">
              Kalki Ecosphere Pvt Ltd believes in helping customers and maintains a liberal cancellation policy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Policy Overview */}
      <section className="bg-white pt-4 pb-16 md:pt-6 md:pb-20 lg:pt-4 lg:pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((policy, index) => (
              <FadeIn key={policy.title} delay={index * 0.1}>
                <div className="bg-neutral-50 rounded-2xl p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3 text-primary-600">
                      {policy.icon}
                    </div>
                    <h3 className="text-xl font-medium text-neutral-900">{policy.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {policy.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-neutral-600 text-sm leading-relaxed">{item}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-medium text-neutral-900 mb-4">Cancellation & Refund Process</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Follow these simple steps to request a cancellation or refund for your IMPACTPURE order.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <FadeIn key={step.step} delay={index * 0.1}>
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                      {step.step}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-neutral-200 -translate-x-8" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
              <div className="flex items-start space-x-4">
                <AlertTriangle size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-medium mb-3">Important Notice</h2>
                  <p className="text-orange-100 leading-relaxed">
                    Please ensure you read and understand our cancellation and refund policy before placing an order.
                    All requests are subject to verification and approval based on the terms outlined above. For any
                    clarifications, please contact our customer support team.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section bg-primary-600 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-medium mb-4">Need Help?</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Our customer support team is here to assist you with any cancellation or refund requests.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-primary-100">Email:</span>
                <a href="mailto:rohit@kalkiecosphere.com" className="font-medium hover:underline">
                  rohit@kalkiecosphere.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary-100">Phone:</span>
                <a href="tel:+919322275124" className="font-medium hover:underline">
                  +91 9322275124
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default CancellationsContent
