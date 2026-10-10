"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Cursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile/tablet
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    // Only show custom cursor on desktop
    if (!isMobile) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
      }

      const handleMouseDown = () => setIsActive(true)
      const handleMouseUp = () => setIsActive(false)
      const handleMouseEnter = () => setIsVisible(true)
      const handleMouseLeave = () => setIsVisible(false)

      window.addEventListener("mousemove", updatePosition)
      window.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("mouseenter", handleMouseEnter)
      window.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        window.removeEventListener("mousemove", updatePosition)
        window.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener("mouseenter", handleMouseEnter)
        window.removeEventListener("mouseleave", handleMouseLeave)
        window.removeEventListener("resize", checkDevice)
      }
    }

    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, [isMobile])

  // Don't render on mobile
  if (isMobile) return null

  return (
    <motion.div
      className={`cursor-dot ${!isVisible ? "hidden" : ""} ${isActive ? "active" : ""}`}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.5,
      }}
    />
  )
}

export default Cursor
