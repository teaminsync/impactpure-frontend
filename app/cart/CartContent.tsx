"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useShopContext } from "@/contexts/ShopContext"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import FadeIn from "@/components/animations/FadeIn"

interface CartItemData {
  _id: string
  quantity: number
}

const CartContent = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    token,
    navigate,
    removeFromCart,
    getCartAmount,
    delivery_fee,
  } = useShopContext()
  const [cartData, setCartData] = useState<CartItemData[]>([])

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  useEffect(() => {
    if (products.length > 0) {
      const tempData: CartItemData[] = []
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          })
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  if (!token) {
    return null
  }

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center py-16">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-neutral-400" />
            </div>
            <h1 className="text-3xl font-medium text-neutral-900 mb-4">Your Cart is Empty</h1>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button onClick={() => navigate("/")} size="lg">
              Continue Shopping
            </Button>
          </FadeIn>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-medium text-neutral-900">Shopping Cart</h1>
            <span className="text-neutral-600 text-sm md:text-base">
              {cartData.length} item{cartData.length !== 1 ? "s" : ""}
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
              <AnimatePresence>
                {cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id)

                  if (!productData) return null

                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 md:p-6 border-b border-neutral-100 last:border-b-0"
                    >
                      {/* Mobile Layout */}
                      <div className="block md:hidden">
                        <div className="flex items-start space-x-3 mb-3">
                          {/* Product Image */}
                          <div className="relative w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={productData.image[0] || "/placeholder.svg"}
                              alt={productData.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-neutral-900 text-sm leading-tight mb-1">
                              {productData.name}
                            </h3>
                            <p className="text-primary-600 font-medium text-sm">
                              {currency}
                              {productData.price.toLocaleString()}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item._id)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>

                        {/* Quantity Controls and Total */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-neutral-200 rounded-lg">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item._id, Math.max(0, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                            >
                              <Minus size={14} />
                            </motion.button>
                            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                            >
                              <Plus size={14} />
                            </motion.button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="font-medium text-neutral-900 text-sm">
                              {currency}
                              {(productData.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="relative w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={productData.image[0] || "/placeholder.svg"}
                            alt={productData.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-neutral-900 truncate">{productData.name}</h3>
                          <p className="text-primary-600 font-medium mt-1">
                            {currency}
                            {productData.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-neutral-200 rounded-lg">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item._id, Math.max(0, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                            >
                              <Minus size={14} />
                            </motion.button>
                            <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                            >
                              <Plus size={14} />
                            </motion.button>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item._id)}
                            className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-0">
                          <p className="font-medium text-neutral-900">
                            {currency}
                            {(productData.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sticky top-32">
                <h2 className="text-xl font-medium text-neutral-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>
                      {currency}
                      {getCartAmount().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span>
                      {currency}
                      {delivery_fee}
                    </span>
                  </div>
                  <div className="border-t border-neutral-100 pt-4">
                    <div className="flex justify-between text-lg font-medium text-neutral-900">
                      <span>Total</span>
                      <span>
                        {currency}
                        {(getCartAmount() + delivery_fee).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/place-order")}
                  size="lg"
                  className="w-full"
                  disabled={cartData.length === 0}
                >
                  Proceed to Checkout
                  <ArrowRight size={16} className="ml-2" />
                </Button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-4 text-center text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartContent
