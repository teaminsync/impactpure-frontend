"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useShopContext } from "@/contexts/ShopContext"
import { Menu, X, ShoppingCart, User } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
import type { User as UserType } from "@/types"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [profileData, setProfileData] = useState<UserType | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { getCartCount, token, navigate, setToken, setCartItems, backendUrl } = useShopContext()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProfileDropdownOpen(false)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
        setShowProfile(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const isActive = (path: string) => pathname === path

  const fetchUserProfile = async () => {
    setIsProfileLoading(true)
    try {
      if (token) {
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        })
        if (response.data.success) {
          setProfileData(response.data.user)
          setShowProfile(true)
        } else {
          toast.error("Failed to load profile")
        }
      }
    } catch (error: any) {
      console.error("Error fetching profile data", error)
      toast.error(error.response?.data?.message || "Failed to load profile")
    } finally {
      setIsProfileLoading(false)
    }
  }

  const logout = () => {
    setIsProfileDropdownOpen(false)
    setShowProfile(false)
    toast.success("Successfully logged out!")

    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
      }
      setToken("")
      setCartItems({})
      navigate("/")
    }, 200)
  }

  const handleProfileClick = () => {
    if (token) {
      setIsProfileDropdownOpen(!isProfileDropdownOpen)
      if (!profileData && !showProfile && !isProfileLoading) {
        fetchUserProfile()
      }
    } else {
      navigate("/login")
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <Image
                src="/assets/logo.png"
                alt="IMPACTPURE Logo"
                width={144}
                height={40}
                className="h-8 md:h-10 w-auto transition-all duration-300 hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive(link.path) ? "text-primary-600" : "text-neutral-700 hover:text-primary-600"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* User profile */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={handleProfileClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors duration-300"
                  aria-label={token ? "User profile" : "Login"}
                >
                  <User size={20} className="text-neutral-700" />
                </motion.button>

                {/* Profile dropdown */}
                <AnimatePresence>
                  {isProfileDropdownOpen && token && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -right-8 md:right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50 border border-neutral-100"
                    >
                      {showProfile && profileData ? (
                        <div className="px-4 py-3">
                          <button
                            onClick={() => setShowProfile(false)}
                            className="flex items-center text-sm text-neutral-500 hover:text-neutral-700 mb-3"
                          >
                            ← Back
                          </button>
                          <div className="space-y-2">
                            <p className="font-medium text-neutral-900">{profileData.name}</p>
                            <p className="text-sm text-neutral-600 break-words">{profileData.email}</p>
                            <p className="text-sm text-neutral-600">{profileData.phoneNumber}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-1">
                          <button
                            onClick={fetchUserProfile}
                            disabled={isProfileLoading}
                            className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-50"
                          >
                            {isProfileLoading ? "Loading..." : "My Profile"}
                          </button>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Orders
                          </Link>
                          <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors duration-300 group"
                aria-label="Shopping cart"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <ShoppingCart size={20} className="text-neutral-700 group-hover:text-primary-600 transition-colors" />
                  {getCartCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-xs font-medium rounded-full"
                    >
                      {getCartCount()}
                    </motion.span>
                  )}
                </motion.div>
              </Link>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} className="text-neutral-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} className="text-neutral-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 "></div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-12">
                  <div className="space-y-6">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.path}
                          className={`block text-lg font-medium py-2 transition-colors ${
                            isActive(link.path) ? "text-primary-600" : "text-neutral-700"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-neutral-100">
                  <p className="text-sm text-neutral-500">© 2025 IMPACTPURE</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
