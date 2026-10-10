"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useShopContext } from "@/contexts/ShopContext"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  id: string
  image: string[]
  name: string
  price: number
  index?: number
}

const ProductCard = ({ id, image, name, price, index = 0 }: ProductCardProps) => {
  const { currency, addToCart } = useShopContext()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card group"
    >
      <Link href={`/product/${id}`}>
        <div className="product-card-image">
          <Image
            src={image[0] || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Add to cart button */}
          <motion.button
            onClick={handleAddToCart}
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} className="text-neutral-700" />
          </motion.button>
        </div>

        <div className="product-card-content">
          <h3 className="product-card-title">{name}</h3>
          <p className="product-card-price">
            {currency}
            {price.toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
