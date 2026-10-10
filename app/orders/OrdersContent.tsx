"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useShopContext } from "@/contexts/ShopContext"
import Image from "next/image"
import axios from "axios"
import { Package, Truck, CheckCircle, Clock, ExternalLink, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/Button"
import FadeIn from "@/components/animations/FadeIn"
import type { Order, OrderItem } from "@/types"

interface OrderDisplayItem extends OrderItem {
  name: string
  price: number | string
  image: string[]
  status: string
  payment: boolean
  paymentMethod: string
  date: string
}

const OrdersContent = () => {
  const { backendUrl, token, currency, navigate } = useShopContext()
  const [orderData, setOrderData] = useState<OrderDisplayItem[]>([])
  const [loading, setLoading] = useState(true)

  const loadOrderData = async () => {
    try {
      if (!token) {
        navigate("/login")
        return
      }

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } })

      if (response.data.success && Array.isArray(response.data.orders)) {
        const allOrdersItem: OrderDisplayItem[] = []

        response.data.orders.forEach((order: Order) => {
          if (Array.isArray(order.items)) {
            order.items.forEach((item: OrderItem) => {
              if (!item.product) {
                console.warn("Missing product details in order item:", item)
                return
              }

              allOrdersItem.push({
                _id: item.product?._id || "Unknown ID",
                product: item.product,
                quantity: item.quantity || 1,
                name: item.product?.name || "Unknown Item",
                price: item.product?.price || "N/A",
                image: Array.isArray(item.product?.image) ? item.product.image : [],
                status: order.status || "Unknown",
                payment: order.payment || false,
                paymentMethod: order.paymentMethod || "Not specified",
                date: order.date ? new Date(order.date).toDateString() : "N/A",
              })
            })
          }
        })

        setOrderData(allOrdersItem.reverse())
      } else {
        setOrderData([])
      }
    } catch (error: any) {
      console.error("Error fetching orders:", error.response?.data || error.message)
      if (error.response?.status === 401) {
        navigate("/login")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "shipped":
      case "out for delivery":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "processing":
        return <Package className="w-5 h-5 text-orange-600" />
      default:
        return <Clock className="w-5 h-5 text-neutral-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "shipped":
      case "out for delivery":
        return "text-blue-600 bg-blue-50"
      case "processing":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-neutral-600 bg-neutral-50"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (orderData.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FadeIn className="text-center py-16">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-neutral-400" />
            </div>
            <h1 className="text-3xl font-medium text-neutral-900 mb-4">No Orders Yet</h1>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Button onClick={() => navigate("/")} size="lg">
              Start Shopping
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
            <h1 className="text-3xl font-medium text-neutral-900">My Orders</h1>
            <span className="text-neutral-600">
              {orderData.length} order{orderData.length !== 1 ? "s" : ""}
            </span>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {orderData.map((item, index) => (
            <motion.div
              key={`${item._id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </span>
                      <p className="text-sm text-neutral-500 mt-1">Ordered on {item.date}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://www.shiprocket.in/shipment-tracking/", "_blank")}
                  >
                    <ExternalLink size={14} className="mr-2" />
                    Track Order
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image.length > 0 ? item.image[0] : "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-neutral-900 truncate">{item.name}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-neutral-600">
                      <span>
                        {currency}
                        {item.price}
                      </span>
                      <span>Qty: {item.quantity}</span>
                      <span>Payment: {item.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.payment ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${item.payment ? "bg-green-500" : "bg-red-500"}`} />
                      {item.payment ? "Paid" : "Pending"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrdersContent
