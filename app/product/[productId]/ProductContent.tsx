"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useShopContext } from "@/contexts/ShopContext"
import { Star, Shield, Truck, RefreshCw, Check, Award, Zap, Droplets } from "lucide-react"
import { Button } from "@/components/ui/Button"
import FadeIn from "@/components/animations/FadeIn"
import type { Product } from "@/types"

interface ProductContentProps {
  productId: string
}

const ProductContent = ({ productId }: ProductContentProps) => {
  const { products, currency, addToCart, navigate, token } = useShopContext()
  const [productData, setProductData] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const [quantity, setQuantity] = useState(1)

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId)
    if (product) {
      setProductData(product)
      setSelectedImage(product.image[0])
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  const handleAddToCart = () => {
    if (productData) {
      for (let i = 0; i < quantity; i++) {
        addToCart(productData._id)
      }
    }
  }

  const handleBuyNow = () => {
    if (!token) {
      navigate("/login")
      return
    }

    if (productData) {
      for (let i = 0; i < quantity; i++) {
        addToCart(productData._id)
      }
      setTimeout(() => {
        navigate("/cart")
      }, 500)
    }
  }

  const features = [
    "100% Original product",
    "Cash on delivery available",
    "6-month warranty included",
    "Hassle-free replacement guarantee",
    "Sold by : Kalki Ecosphere Pvt Ltd.",
  ]

  const specifications = [
    { label: "Model Name", value: "IMPACTPURE PL" },
    { label: "Type of Purifier", value: "Non-electric, Plug & Play" },
    { label: "Material of Construction", value: "High-Grade Stainless Steel and Food-Grade Plastic" },
    { label: "Cartridge Capacity", value: "3500 Liters" },
    { label: "Micron UF Membrane", value: "0.01 Micron" },
    { label: "Maximum Pressure", value: "6.5 PSI" },
    { label: "Warranty", value: "6 months from the date of purchase" },
    { label: "Maintenance", value: "DIY, Self-Maintainable" },
  ]

  const filtrationStages = [
    {
      stage: "1",
      title: "S.S 304 Strainer for Filtering Suspended Impurities",
      description: "Filters out larger particles, suspended impurities, and dirt from the water.",
    },
    {
      stage: "2",
      title: "Hi-IV Activated Carbon for Chlorine and Bad Odour Removal",
      description: "Removes chlorine, bad smells, and organic contaminants from the water.",
    },
    {
      stage: "3",
      title: "Silver Impregnation for Bacteria Removal and Sterilization",
      description: "Ensures the elimination of bacteria and prevents bacterial growth.",
    },
    {
      stage: "4",
      title: "Pyramid Energy of Life for Healing Effects",
      description:
        "Structured water enhances the hydration properties of water, making it easier for the body to absorb and utilize.",
    },
    {
      stage: "5",
      title: "KDF (Kinetic Degradation Fluxion) for Heavy Metals and Toxic Removal",
      description: "Removes harmful metals like lead, mercury, and other toxins from the water.",
    },
    {
      stage: "6",
      title: "Constant Sterilization & Traditionally Proven Copper Benefits",
      description: "Copper offers continuous sterilization and provides health benefits, ensuring clean, safe water.",
    },
    {
      stage: "7",
      title: "0.01 Micron UF Membrane for Effective Purification",
      description: "Guarantees 99.9999% removal of bacteria and viruses with a 0.01-micron ultrafiltration membrane.",
    },
    {
      stage: "8",
      title: "Magnetized Water",
      description: "Micro-clusters water for better absorption by the body, improving hydration and detoxification.",
    },
  ]

  const usps = [
    "Bacteria & Virus Removal: Up to 99.9999% bacteria and virus removal",
    "Retains Essential Minerals: Unlike other systems, IMPACTPURE ensures that essential minerals like calcium, magnesium, and potassium are retained in the water",
    "Zero Water Wastage: Unlike RO systems that waste water, IMPACTPURE has no water wastage",
    "Eco-Friendly: Made from food-grade, non-toxic materials, the product is an environmentally friendly choice",
    "Plug & Play: The system requires no installation, making it easy to set up and use",
    "Certified and Tested: Independently tested and certified by NABL laboratories for effectiveness",
    "Portable: Use it with any regular tap, narrow-mouth bottle, or sports sipper. It's designed for convenience",
    "Simple to Maintain: With DIY maintenance, IMPACTPURE is easy to clean and maintain, ensuring long-lasting performance",
  ]

  const keyFeatures = [
    "Magnetohydrodynamics (MHD) Technology: Utilizes advanced MHD technology to condition hard water naturally and enhance its structure, ensuring clean and healthy hydration",
    "No Electricity Needed: Operates without power, making it eco-friendly and versatile",
    "Mobile and Convenient: Suitable for home, work, or outdoor use",
    "Minimal Plastics: Uses eco-friendly materials to reduce the carbon footprint",
    "Long-Term Reliability: Enjoy peace of mind for up to 10 years with an average cost of just ₹80 per month",
    "Copper Infused: Enhances water quality with health benefits",
    "Nanosilver Sterilization: Replaces traditional UV sterilization, providing equally effective results",
    "Advanced Filtration Stages: Includes UF, nano-silver, copper infusion, high-UV carbon, and KDF technology to remove bacteria, viruses, heavy metals, and pesticides",
    "Chemical Removal: Effectively eliminates harmful chemicals such as PFOA, PFAS, BPA, and microplastics to ensure safe drinking water",
  ]

  const comparisonData = [
    { feature: "Certified & Independently Tested", impactpure: "Yes", others: "No" },
    { feature: "Water Wastage", impactpure: "None", others: "Yes" },
    { feature: "Water Quality", impactpure: "99.9999% Bacteria & Virus Removal", others: "Varies" },
    { feature: "Simple to Install", impactpure: "Yes", others: "No" },
    { feature: "Eco-Friendly", impactpure: "Yes", others: "No" },
    { feature: "Retains Essential Minerals", impactpure: "Yes", others: "No" },
    { feature: "Great Taste", impactpure: "Yes", others: "No" },
    { feature: "Magnet & Softening Effects", impactpure: "Yes", others: "No" },
  ]

  const usageInstructions = [
    "Use on Any Local Tap: Simply attach IMPACTPURE to any standard tap to start purifying the water",
    "Use on Any Fancy Faucet: Works seamlessly with fancy faucets",
    "Use on Any Sports Sipper: Perfect for outdoor or sports use, simply attach it to your sipper",
    "Use on Any Narrow Mouth Bottle: Compatible with narrow-mouth bottles, perfect for on-the-go hydration",
    "Use on Any Packaged Drinking Water Bottle: Use with packaged water bottles for instant purification",
  ]

  const awards = [
    "Green India Awards",
    "Most Innovative Healthcare Product of the Year",
    "Design Patent Certificate",
    "Best Green Innovation of the Year",
  ]

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    )
  }

  return (
    <section className="section bg-gradient-to-b from-neutral-50 to-white pt-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              layoutId="main-image"
              className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden"
            >
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={productData.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 overflow-x-auto">
              {productData.image.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === img ? "border-primary-600" : "border-transparent"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${productData.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-9">
            <FadeIn>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-medium text-neutral-900">{productData.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">(4.8 out of 5)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-medium text-primary-600">
                    {currency}
                    {productData.price.toLocaleString()}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                    Best Value Price
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-neutral-600 leading-relaxed">{productData.description}</p>
            </FadeIn>

            {/* Quantity and Add to Cart */}
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleAddToCart} size="lg" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button onClick={handleBuyNow} variant="outline" size="lg" className="flex-1">
                    Buy Now
                  </Button>
                </div>
              </div>
            </FadeIn>

            {/* Features */}
            <FadeIn delay={0.3}>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check size={16} className="text-green-600" />
                    <span className="text-sm text-neutral-600">{feature}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Trust Badges */}
            <FadeIn delay={0.4}>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-neutral-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-neutral-600">Doorstep Delivery Service</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-neutral-600">Free Replacement</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: "description", label: "Description" },
                { id: "filtration", label: "8-Stage Filtration" },
                { id: "features", label: "Key Features" },
                { id: "comparison", label: "Comparison" },
                { id: "specifications", label: "Specifications" },
                { id: "usage", label: "Usage & Maintenance" },
                { id: "warranty", label: "Warranty & Awards" },
                { id: "reviews", label: "Reviews" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="prose max-w-none"
                >
                  <h3 className="text-xl font-medium mb-4">Product Description</h3>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    IMPACTPURE is a highly advanced, eco-friendly water purification solution that
                    ensures safe and clean drinking water from any source. With its unique{" "}
                    8-stage filtration process, it guarantees{" "}
                    99.9999% bacteria and virus removal, retains essential minerals, and ensures zero
                    water wastage. The purifier is designed for ease of use, minimal maintenance, and maximum health
                    benefits.
                  </p>

                  <h4 className="text-lg font-medium mb-4">Unique Selling Propositions (USPs)</h4>
                  <ul className="space-y-2 text-neutral-600">
                    {usps.map((usp, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{usp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "filtration" && (
                <motion.div
                  key="filtration"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-6">8-Stage Purification Process</h3>
                  <div className="space-y-6">
                    {filtrationStages.map((stage, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-lg">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {stage.stage}
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900 mb-2">{stage.title}</h4>
                          <p className="text-neutral-600 text-sm">{stage.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-neutral-50 rounded-lg">
                        <Zap className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "comparison" && (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-6">Comparison Chart: IMPACTPURE vs. Others</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-neutral-200">
                      <thead>
                        <tr className="bg-neutral-50">
                          <th className="border border-neutral-200 px-4 py-3 text-left font-medium">Feature</th>
                          <th className="border border-neutral-200 px-4 py-3 text-left font-medium text-primary-600">
                            IMPACTPURE
                          </th>
                          <th className="border border-neutral-200 px-4 py-3 text-left font-medium">
                            Other Water Purifiers
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((row, index) => (
                          <tr key={index} className="hover:bg-neutral-50">
                            <td className="border border-neutral-200 px-4 py-3 font-medium">{row.feature}</td>
                            <td className="border border-neutral-200 px-4 py-3 text-green-600 font-medium">
                              {row.impactpure}
                            </td>
                            <td className="border border-neutral-200 px-4 py-3 text-red-600">{row.others}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-6">Technical Specifications</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-neutral-200">
                      <thead>
                        <tr className="bg-neutral-50">
                          <th className="border border-neutral-200 px-4 py-3 text-left font-medium">Feature</th>
                          <th className="border border-neutral-200 px-4 py-3 text-left font-medium">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {specifications.map((spec, index) => (
                          <tr key={index} className="hover:bg-neutral-50">
                            <td className="border border-neutral-200 px-4 py-3 font-medium">{spec.label}</td>
                            <td className="border border-neutral-200 px-4 py-3">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "usage" && (
                <motion.div
                  key="usage"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">How to Use IMPACTPURE</h3>
                      <div className="space-y-3">
                        {usageInstructions.map((instruction, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-neutral-600">{instruction}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-4">How to Maintain & Clean</h3>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">For Regular Cleaning</h4>
                          <p className="text-neutral-600">
                            Turn the product upside down and pass water through the outlet to backflush the dirt. Repeat
                            as necessary to maintain cleanliness.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">For Deep Cleaning</h4>
                          <ol className="list-decimal list-inside space-y-1 text-neutral-600">
                            <li>Open the unit by turning the threads in the middle of the two housings.</li>
                            <li>Push out the carbon block and clean it under running water.</li>
                            <li>Clean the stainless steel strainer by rinsing it.</li>
                            <li>Reverse the steps to restore the parts.</li>
                          </ol>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">For UF Membrane Cleaning</h4>
                          <p className="text-neutral-600">
                            Open the UF membrane by unscrewing the outlet nuts and other fixing parts. Shake and rinse
                            the membrane in water to remove accumulated dirt.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "warranty" && (
                <motion.div
                  key="warranty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-medium mb-4">Warranty & Terms</h3>
                      <div className="bg-neutral-50 p-6 rounded-lg space-y-4">
                        <p className="text-neutral-600">
                          The warranty covers material defects and workmanship under normal usage for{" "}
                          <strong>6 months</strong> from the date of purchase. It does not cover damages caused by
                          misuse or accidents.
                        </p>
                        <p className="text-neutral-600">
                          <strong>Exclusions:</strong> Misuse, accidents, unauthorized repairs, and any damage caused by
                          non-authorized services are not covered under the warranty.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium mb-4">Awards & Recognitions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {awards.map((award, index) => (
                          <div key={index} className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-lg">
                            <Award className="w-6 h-6 text-yellow-500" />
                            <span className="font-medium text-neutral-700">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-6">Customer Reviews</h3>
                  <div className="text-center py-12 text-neutral-500">
                    <p>Reviews will be displayed here once available.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductContent

