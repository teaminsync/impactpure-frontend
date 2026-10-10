import type { Metadata } from "next"
import PlaceOrderContent from "./PlaceOrderContent"

export const metadata: Metadata = {
  title: "Place Order - IMPACTPURE",
  description: "Complete your IMPACTPURE order with secure payment options.",
}

export default function PlaceOrder() {
  return <PlaceOrderContent />
}
