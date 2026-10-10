"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import type { Product, CartItems, ShopContextType } from "@/types"
import { CONFIG } from "@/lib/constants"
import { useNavigation } from "@/hooks/use-navigation"

const ShopContext = createContext<ShopContextType | undefined>(undefined)

interface ShopContextProviderProps {
  children: ReactNode
}

const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const [search, setSearch] = useState<string>("")
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItems>({})
  const [products, setProducts] = useState<Product[]>([])
  const [token, setToken] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation()
  const currency = CONFIG.CURRENCY
  const delivery_fee = CONFIG.DELIVERY_FEE
  const backendUrl = CONFIG.BACKEND_URL

  const handleExpiredToken = useCallback(() => {
    toast.error("Your session has expired. Please log in again.")
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
    setToken("")
    setCartItems({})
    navigate("/login")
  }, [navigate])

  const getUserCart = useCallback(
    async (userToken: string) => {
      if (!userToken || !backendUrl) return

      setIsLoading(true)
      try {
        const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token: userToken } })
        if (response.data.success) {
          setCartItems(response.data.cartData)
        }
      } catch (error: any) {
        console.error("Error fetching cart:", error)

        // Check for expired token
        if (
          error.response?.data?.message === "Session expired. Please log in again." ||
          error.response?.status === 401
        ) {
          handleExpiredToken()
          return
        }

        toast.error(error.response?.data?.message || "Failed to load cart")
      } finally {
        setIsLoading(false)
      }
    },
    [backendUrl, handleExpiredToken],
  )

  const getProductsData = useCallback(async () => {
    if (!backendUrl) return

    setIsLoading(true)
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setProducts(response.data.products.reverse())
      } else {
        toast.error(response.data.message || "Failed to load products")
      }
    } catch (error: any) {
      console.error("Error fetching products:", error)
      toast.error(error.response?.data?.message || "Failed to load products")
    } finally {
      setIsLoading(false)
    }
  }, [backendUrl])

  const addToCart = async (itemId: string, size?: string) => {
    if (!token) {
      toast.error("Please login to add items to cart")
      navigate("/login")
      return
    }

    setIsLoading(true)
    const cartData = structuredClone(cartItems)
    cartData[itemId] = (cartData[itemId] || 0) + 1
    setCartItems(cartData)

    try {
      await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } })
      toast.success("Item added to cart successfully!")
    } catch (error: any) {
      console.error("Error adding to cart:", error)

      // Check for expired token
      if (error.response?.data?.message === "Session expired. Please log in again." || error.response?.status === 401) {
        handleExpiredToken()
        return
      }

      toast.error(error.response?.data?.message || "Failed to add item to cart")
      // Revert the cart state on error
      const revertedCart = structuredClone(cartItems)
      setCartItems(revertedCart)
    } finally {
      setIsLoading(false)
    }
  }

  const getCartCount = (): number => {
    let totalCount = 0
    for (const items in cartItems) {
      try {
        if (cartItems[items] > 0) {
          totalCount += cartItems[items]
        }
      } catch (error) {
        console.error("Error calculating cart count:", error)
      }
    }
    return totalCount
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    setIsLoading(true)
    const cartData = structuredClone(cartItems)
    const previousQuantity = cartData[itemId] || 0
    cartData[itemId] = quantity
    setCartItems(cartData)

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, quantity }, { headers: { token } })
        toast.success("Cart updated successfully!")
      } catch (error: any) {
        console.error("Error updating quantity:", error)

        // Check for expired token
        if (
          error.response?.data?.message === "Session expired. Please log in again." ||
          error.response?.status === 401
        ) {
          handleExpiredToken()
          return
        }

        toast.error(error.response?.data?.message || "Failed to update quantity")
        // Revert the cart state on error
        const revertedCart = structuredClone(cartItems)
        revertedCart[itemId] = previousQuantity
        setCartItems(revertedCart)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const removeFromCart = async (itemId: string) => {
    setIsLoading(true)
    const cartData = structuredClone(cartItems)
    const removedItem = cartData[itemId]
    delete cartData[itemId]
    setCartItems(cartData)

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/remove`, { itemId }, { headers: { token } })
        toast.success("Item removed from cart successfully!")
      } catch (error: any) {
        console.error("Error removing from cart:", error)

        if (
          error.response?.data?.message === "Session expired. Please log in again." ||
          error.response?.status === 401
        ) {
          handleExpiredToken()
          return
        }

        toast.error(error.response?.data?.message || "Failed to remove item from cart")
        // Revert the cart state on error
        const revertedCart = structuredClone(cartItems)
        revertedCart[itemId] = removedItem
        setCartItems(revertedCart)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const getCartAmount = (): number => {
    let totalAmount = 0
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items)
      try {
        if (cartItems[items] > 0 && itemInfo) {
          totalAmount += itemInfo.price * cartItems[items]
        }
      } catch (error) {
        console.error("Error calculating cart amount:", error)
      }
    }
    return totalAmount
  }

  // Load products on mount
  useEffect(() => {
    getProductsData()
  }, [getProductsData])

  // Handle token initialization and cart loading
  useEffect(() => {
    if (!token && typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token")
      if (storedToken) {
        setToken(storedToken)
      }
    }
  }, [])

  // Load cart when token changes
  useEffect(() => {
    if (token) {
      getUserCart(token)
    }
  }, [token, getUserCart])

  const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    cartItems,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setShowSearch,
    removeFromCart,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShopContext = (): ShopContextType => {
  const context = useContext(ShopContext)
  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopContextProvider")
  }
  return context
}

export { ShopContext, ShopContextProvider }
