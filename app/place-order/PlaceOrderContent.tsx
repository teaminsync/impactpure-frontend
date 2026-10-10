"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useShopContext } from "@/contexts/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
import { CreditCard, Truck, Shield, MapPin } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import FadeIn from "@/components/animations/FadeIn"
import type { Address } from "@/types"

const PlaceOrderContent = () => {
  const [method, setMethod] = useState("cod")
  const [isProcessing, setIsProcessing] = useState(false)
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
    useShopContext()
  const [formData, setFormData] = useState<Address>({
    firstName: "",
    lastName: "",
    email: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
    alt_phone: "",
  })

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const initPay = async (order: any) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "IMPACTPURE Order",
      description: "Water Purifier Purchase",
      order_id: order.id,
      handler: async (response: any) => {
        try {
          const verifyResponse = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: Object.keys(cartItems).map((productId) => ({
                _id: productId,
                quantity: cartItems[productId],
              })),
              amount: getCartAmount() + delivery_fee,
              address: formData,
            },
            { headers: { token } },
          )

          if (verifyResponse.data.success) {
            toast.success("Payment Successful! Order Placed.")
            setCartItems({})
            navigate("/orders")
          } else {
            toast.error("Payment verification failed. Try again.")
          }
        } catch (error) {
          console.log(error)
          toast.error("Error verifying payment.")
        } finally {
          setIsProcessing(false)
        }
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false)
        },
      },
    }

    if (typeof window !== "undefined" && (window as any).Razorpay) {
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    }
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isProcessing) return

    setIsProcessing(true)
    try {
      const orderItems = Object.keys(cartItems).map((itemId) => ({
        _id: itemId,
        quantity: cartItems[itemId],
      }))

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case "cod":
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } })
          if (response.data.success) {
            toast.success("Order placed successfully!")
            setCartItems({})
            navigate("/orders")
          } else {
            toast.error(response.data.message)
          }
          break

        case "razorpay":
          const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, {
            headers: { token },
          })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          } else {
            toast.error("Failed to create Razorpay order.")
            setIsProcessing(false)
          }
          break
        default:
          toast.error("Please select a valid payment method.")
          setIsProcessing(false)
          break
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
      setIsProcessing(false)
    }
  }

  const cartTotal = getCartAmount()
  const orderTotal = cartTotal + delivery_fee

  return (
    <div className="min-h-screen bg-neutral-50 pt-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <FadeIn>
          <h1 className="text-3xl font-medium text-neutral-900 mb-8">Checkout</h1>
        </FadeIn>

        <form onSubmit={onSubmitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Information */}
          <div className="lg:col-span-2">
            <FadeIn>
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <MapPin size={20} className="text-primary-600" />
                  </div>
                  <h2 className="text-xl font-medium text-neutral-900">Delivery Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                    required
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={onChangeHandler}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={onChangeHandler}
                    required
                    className="md:col-span-2"
                  />
                  <Input
                    name="address_line1"
                    placeholder="Address Line 1"
                    value={formData.address_line1}
                    onChange={onChangeHandler}
                    required
                    className="md:col-span-2"
                  />
                  <Input
                    name="address_line2"
                    placeholder="Address Line 2 (Optional)"
                    value={formData.address_line2}
                    onChange={onChangeHandler}
                    className="md:col-span-2"
                  />
                  <Input name="city" placeholder="City" value={formData.city} onChange={onChangeHandler} required />
                  <Input name="state" placeholder="State" value={formData.state} onChange={onChangeHandler} required />
                  <Input
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={onChangeHandler}
                    required
                  />
                  <Input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={onChangeHandler}
                    required
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={onChangeHandler}
                    required
                  />
                  <Input
                    name="alt_phone"
                    type="tel"
                    placeholder="Alternate Phone (Optional)"
                    value={formData.alt_phone}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </FadeIn>

            {/* Payment Method */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard size={20} className="text-primary-600" />
                  </div>
                  <h2 className="text-xl font-medium text-neutral-900">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMethod("razorpay")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      method === "razorpay"
                        ? "border-primary-600 bg-primary-50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 ${
                            method === "razorpay" ? "border-primary-600 bg-primary-600" : "border-neutral-300"
                          }`}
                        >
                          {method === "razorpay" && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                        </div>
                        <span className="font-medium">Credit/Debit Card, UPI, Net Banking</span>
                      </div>
                      <Image src="/assets/razorpay_logo.png" alt="Razorpay" width={80} height={20} />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMethod("cod")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      method === "cod"
                        ? "border-primary-600 bg-primary-50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          method === "cod" ? "border-primary-600 bg-primary-600" : "border-neutral-300"
                        }`}
                      >
                        {method === "cod" && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                      </div>
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sticky top-32">
                <h2 className="text-xl font-medium text-neutral-900 mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {Object.keys(cartItems).map((itemId) => {
                    const product = products.find((p) => p._id === itemId)
                    if (!product || cartItems[itemId] === 0) return null

                    return (
                      <div key={itemId} className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden">
                          <Image
                            src={product.image[0] || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-900 truncate">{product.name}</p>
                          <p className="text-xs text-neutral-500">Qty: {cartItems[itemId]}</p>
                        </div>
                        <p className="text-sm font-medium text-neutral-900">
                          ₹{(product.price * cartItems[itemId]).toLocaleString()}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6 pt-4 border-t border-neutral-100">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span>₹{delivery_fee}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-neutral-900 pt-3 border-t border-neutral-100">
                    <span>Total</span>
                    <span>₹{orderTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                  <div className="text-xs text-neutral-500">
                    <Shield size={16} className="mx-auto mb-1 text-green-600" />
                    Secure
                  </div>
                  <div className="text-xs text-neutral-500">
                    <Truck size={16} className="mx-auto mb-1 text-blue-600" />
                    Fast Delivery
                  </div>
                  <div className="text-xs text-neutral-500">
                    <CreditCard size={16} className="mx-auto mb-1 text-purple-600" />
                    Safe Payment
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={!method || isProcessing}>
                  {isProcessing ? "Processing..." : `Place Order - ₹${orderTotal.toLocaleString()}`}
                </Button>
              </div>
            </FadeIn>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrderContent
