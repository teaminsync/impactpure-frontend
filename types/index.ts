import type React from "react"
// Core types for the IMPACTPURE e-commerce application

export interface User {
  _id: string
  name: string
  email: string
  phoneNumber: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string[]
  category?: string
  subCategory?: string
  bestseller?: boolean
  date?: number
}

export interface CartItem {
  _id: string
  quantity: number
}

export interface CartItems {
  [productId: string]: number
}

export interface OrderItem {
  _id: string
  product?: Product
  quantity: number
}

export interface Order {
  _id: string
  userId: string
  items: OrderItem[]
  amount: number
  address: Address
  status: string
  paymentMethod: string
  payment: boolean
  date: Date
}

export interface Address {
  firstName: string
  lastName: string
  email: string
  address_line1: string
  address_line2: string
  city: string
  state: string
  pincode: string
  country: string
  phone: string
  alt_phone?: string
}

export interface ShopContextType {
  products: Product[]
  currency: string
  delivery_fee: number
  search: string
  showSearch: boolean
  cartItems: CartItems
  navigate: (path: string) => void
  backendUrl: string | undefined // Updated to allow undefined
  token: string
  setToken: (token: string) => void
  setCartItems: (items: CartItems) => void
  addToCart: (itemId: string, size?: string) => void
  getCartCount: () => number
  updateQuantity: (itemId: string, quantity: number) => void
  getCartAmount: () => number
  setShowSearch: (show: boolean) => void
  removeFromCart: (itemId: string) => void
}

export interface TestimonialData {
  id: number
  name: string
  text: string
  img: string
  delay: number
  position?: string
}

export interface BannerData {
  image: string
  title: string
  subtitle: string
  link: string
}

export interface EquipmentData {
  id: number
  title: string
  desc: string
  icon: React.ReactNode
  delay: number
}

export interface AnimationVariant {
  hidden: {
    opacity: number
    x?: number
    y?: number
    scale?: number
    rotate?: number
    rotateY?: number
  }
  visible: {
    opacity: number
    x?: number
    y?: number
    scale?: number
    rotate?: number
    rotateY?: number
    transition: {
      duration: number
      delay?: number
      ease?: string
    }
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  token?: string
  orders?: Order[]
  order?: any
  user?: User
}

export interface NewsletterSubscription {
  email: string
}

export interface OTPVerification {
  phoneNumber: string
  otp: string
}

export interface LoginCredentials {
  identifier: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phoneNumber: string
}

export interface ResetPasswordData {
  phoneNumber: string
  newPassword: string
}
