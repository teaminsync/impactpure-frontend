import type { Metadata } from "next"
import ContactContent from "./ContactContent"

export const metadata: Metadata = {
  title: "Contact Us - IMPACTPURE",
  description: "Get in touch with IMPACTPURE for any queries about our water purification solutions.",
}

export default function Contact() {
  return <ContactContent />
}
