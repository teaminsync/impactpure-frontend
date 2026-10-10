"use client"

import { motion } from "framer-motion"
import { Shield, FileText, AlertCircle, Scale, Heart, Wrench } from "lucide-react"
import FadeIn from "@/components/animations/FadeIn"

const TermsContent = () => {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Warranty Coverage",
      content: [
        "Kalki Ecosphere LLP warrants all new products manufactured by it to be free from defects in material and workmanship under normal usage from the date of purchase.",
        "The warranty period commences from the date of purchase by the first end-user. During this warranty period of 6 Months, Kalki Ecosphere will replace or repair any part of the IMPACTPURE water purifier that in the opinion of Kalki Ecosphere would be defective in operation due to faulty material or workmanship.",
        "The original purchaser of the unit can avail services under Warranty at the point of sale, by producing the damaged part along with the original invoice.",
      ],
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Warranty Conditions & Limitations",
      content: [
        "This Warranty is void if the unit is not operated under normal municipal water or well water conditions or subjected to the temperature above 35°C or Below 4°C.",
        "Product returned to Kalki Ecosphere for Warranty examination must be shipped freight prepaid.",
        "Kalki Ecosphere shall not be held liable for claims exceeding the cost of repair of the defects in workmanship.",
      ],
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Safety Disclaimer",
      content: [
        "Kalki Ecosphere cannot and shall not be held liable for any sickness or illness due to the consumption of drinking water from any water purifier supplied by Kalki Ecosphere, since Kalki Ecosphere does not have any control over the maintenance and usage of water purifier.",
      ],
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Service & Maintenance",
      content: [
        "This limited Warranty does not include service to diagnose a claimed malfunction in this unit.",
        "Kalki Ecosphere LLP will not be held liable for repair or alterations made without prior written approval; for products clogged by suspended matter, precipitates or biological growth or for failures resulting from the lack of proper maintenance.",
      ],
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Legal Terms & Liability",
      content: [
        "This Warranty Agreement shall not be interpreted to render Kalki Ecosphere LLP liable for injuries or damages of any kind direct or consequential or contingent to persons or property.",
        "Kalki Ecosphere shall not be held responsible by representative or any buyer for failure to abide by any of the obligations of this Warranty Agreement if such failures are the result of circumstances of Force Majeures such as, but not limited to, floods, earthquakes, transportation strikes, labour disputes with outside suppliers or any other condition beyond the control of Kalki Ecosphere.",
        "Any disagreement and obligations based upon the purchase of Kalki Ecosphere products and thereby imposed on Kalki Ecosphere shall be governed by and construed according to the laws of India and subject to the jurisdiction of Mumbai Courts only.",
      ],
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Warranty Assumptions & Authorization",
      content: [
        "Kalki Ecosphere assumes no Warranty liability in connection with this water purifier other than that specified herein. This Warranty is in lieu of all other warranties, expressed implied, including or warranties of fitness for a particular purpose.",
        "Kalki Ecosphere does not authorize any person or representative to assume for them any other obligations on the sale of this water purifier.",
        "Kalki Ecosphere reserves the right to alter or improve design and specifications at any time, without any contingent obligations to prospective buyers or owners of the products previously sold.",
      ],
    },
  ]

  const exclusions = [
    "Repair or alterations made without prior written approval",
    "Products clogged by suspended matter, precipitates or biological growth",
    "Failures resulting from the lack of proper maintenance",
    "Misuse, misapplication, negligence, alteration, or accident",
    "Operation contrary to our instructions",
    "Incompatibility with accessories not installed by Kalki Ecosphere",
    "Repairs with component parts other than those manufactured by or obtained from Kalki Ecosphere",
    "Damage caused by freezing, flood, fire or Act of God",
  ]

  return (
    <div className="overflow-hidden pt-12 md:pt-16 lg:pt-12 pb-0">
      {/* Hero Section */}
      <section className="section">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="section-title">Terms & Conditions</h1>
            <p className="section-subtitle mx-auto">
              Please read these terms and conditions carefully before using IMPACTPURE products and services.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <FadeIn key={section.title} delay={index * 0.1}>
                <div className="bg-neutral-50 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 text-primary-600">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-medium text-neutral-900">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-neutral-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Exclusions */}
      <section className="bg-neutral-50 py-16 md:py-20 lg:py-16 mt-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-medium text-neutral-900 mb-6">Warranty Exclusions</h2>
              <p className="text-neutral-600 mb-6">
                This warranty excludes all products/component parts or damage to any part of this water purifier which,
                in the opinion of Kalki Ecosphere, have been subjected to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exclusions.map((exclusion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-neutral-600">{exclusion}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-800 text-sm">
                  <strong>Note:</strong> In all such cases regular charges will apply.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final Notice */}
      <section className="section bg-primary-600 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h2 className="text-2xl font-medium mb-4">Important Notice</h2>
            <p className="text-primary-100 leading-relaxed max-w-3xl mx-auto">
              Under no circumstances are the terms mentioned above negotiable and no employee of Kalki Ecosphere LLP has
              the authority to supersede them.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default TermsContent
