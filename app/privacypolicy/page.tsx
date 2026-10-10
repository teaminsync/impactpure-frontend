import type { Metadata } from "next"
import PrivacyContent from "./PrivacyContent"

export const metadata: Metadata = {
  title: "Privacy Policy - IMPACTPURE",
  description: "Learn about how IMPACTPURE protects your privacy and handles your data.",
}

export default function PrivacyPolicy() {
  return <PrivacyContent />
}
