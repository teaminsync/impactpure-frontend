import type { Metadata } from "next"
import AboutContent from "./AboutContent"

export const metadata: Metadata = {
  title: "About Us - IMPACTPURE",
  description:
    "Learn about IMPACTPURE's mission to revolutionize water purification with eco-friendly, sustainable solutions.",
}

export default function About() {
  return <AboutContent />
}
