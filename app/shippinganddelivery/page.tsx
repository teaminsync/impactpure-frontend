import type { Metadata } from "next"
import ShippingContent from "./ShippingContent"

export const metadata: Metadata = {
  title: "Shipping and Delivery - IMPACTPURE",
  description: "Learn about IMPACTPURE's shipping and delivery policies.",
}

export default function ShippingAndDelivery() {
  return <ShippingContent />
}
