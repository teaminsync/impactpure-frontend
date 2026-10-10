import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format phone number to ensure it starts with +91
export const formatPhoneNumber = (number: string): string => {
  if (!number.startsWith("+91 ")) {
    return `+91 ${number.replace("+91", "").trim()}`
  }
  return number
}

// Scroll to top utility
export const scrollToTop = (): void => {
  window.scrollTo(0, 0)
}

// Format currency
export const formatCurrency = (amount: number, currency = "₹"): string => {
  return `${currency}${amount}`
}

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+91\s\d{10}$/
  return phoneRegex.test(phone)
}

// Generate placeholder image URL
export const getPlaceholderImage = (width: number, height: number): string => {
  return `/placeholder.svg?height=${height}&width=${width}`
}
