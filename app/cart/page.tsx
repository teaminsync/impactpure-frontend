import type { Metadata } from "next"
import CartContent from "./CartContent"

export const metadata: Metadata = {
  title: "Shopping Cart - IMPACTPURE",
  description: "Review your IMPACTPURE products before checkout.",
}

export default function Cart() {
  return <CartContent />
}
