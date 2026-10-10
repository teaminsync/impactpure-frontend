import type { Metadata } from "next"
import CancellationsContent from "./CancellationsContent"

export const metadata: Metadata = {
  title: "Cancellations and Refunds - IMPACTPURE",
  description: "Learn about IMPACTPURE's cancellation and refund policies.",
}

export default function CancellationsAndRefunds() {
  return <CancellationsContent />
}
