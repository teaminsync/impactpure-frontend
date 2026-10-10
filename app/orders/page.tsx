import type { Metadata } from "next"
import OrdersContent from "./OrdersContent"

export const metadata: Metadata = {
  title: "My Orders - IMPACTPURE",
  description: "Track your IMPACTPURE orders and delivery status.",
}

export default function Orders() {
  return <OrdersContent />
}
