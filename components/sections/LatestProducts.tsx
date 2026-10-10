"use client"

import { useEffect, useState } from "react"
import { useShopContext } from "@/contexts/ShopContext"
import ProductCard from "@/components/ui/ProductCard"
import FadeIn from "@/components/animations/FadeIn"
import type { Product } from "@/types"

const LatestProducts = () => {
  const { products } = useShopContext()
  const [latestProducts, setLatestProducts] = useState<Product[]>([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8))
  }, [products])

  if (latestProducts.length === 0) {
    return null
  }

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle mx-auto">
            Explore IMPACTPURE®: Pure water, anytime, anywhere.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {latestProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestProducts
