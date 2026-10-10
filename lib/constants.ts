// Constants for the IMPACTPURE application
export const APP_NAME = "IMPACTPURE"
export const APP_DESCRIPTION =
  "World's First Plug & Play Water Purifier - Portable, sustainable water purification with zero electricity and no water wastage"

// API endpoints
export const API_ENDPOINTS = {
  USER: {
    LOGIN: "/api/user/login",
    REGISTER: "/api/user/register",
    PROFILE: "/api/user/profile",
    SEND_OTP: "/api/user/send-otp",
    VERIFY_OTP: "/api/user/verify-otp",
    RESET_PASSWORD: "/api/user/reset-password",
  },
  ORDER: {
    PLACE: "/api/order/place",
    USER_ORDERS: "/api/order/userorders",
    RAZORPAY: "/api/order/razorpay",
    VERIFY_RAZORPAY: "/api/order/verifyRazorpay",
  },
  NEWSLETTER: {
    SUBSCRIBE: "/api/newsletter/subscribe",
  },
} as const

// Configuration
export const CONFIG = {
  CURRENCY: "₹",
  DELIVERY_FEE: 249,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  DEFAULT_PRODUCT_ID: "67dd79e5366d9c007a9545a0",
  SHEETS: process.env.NEXT_PUBLIC_SHEETS,
} as const

// Animation delays
export const ANIMATION_DELAYS = {
  FAST: 0.2,
  MEDIUM: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1.1,
} as const

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const
