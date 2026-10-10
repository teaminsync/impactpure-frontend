import type { Metadata } from "next"
import ProductContent from "./ProductContent"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  return {
    title: `Product - IMPACTPURE`,
    description: "IMPACTPURE water purifier with advanced filtration technology",
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductContent productId={params.productId} />
}
