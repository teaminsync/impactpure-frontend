import type { Metadata } from "next"
import LoginContent from "./LoginContent"

export const metadata: Metadata = {
  title: "Login - IMPACTPURE",
  description: "Login to your IMPACTPURE account to access your orders and cart.",
}

export default function Login() {
  return <LoginContent />
}
