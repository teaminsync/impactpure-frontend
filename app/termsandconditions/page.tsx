import type { Metadata } from "next"
import TermsContent from "./TermsContent"

export const metadata: Metadata = {
  title: "Terms and Conditions - IMPACTPURE",
  description: "Read the terms and conditions for IMPACTPURE products and services.",
}

export default function TermsAndConditions() {
  return <TermsContent />
}
