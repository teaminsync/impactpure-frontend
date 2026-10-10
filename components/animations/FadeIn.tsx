"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface FadeInProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

const FadeIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { x: 0, y: 40 }
      case "down":
        return { x: 0, y: -40 }
      case "left":
        return { x: 40, y: 0 }
      case "right":
        return { x: -40, y: 0 }
      case "none":
        return { x: 0, y: 0 }
      default:
        return { x: 0, y: 40 }
    }
  }

  const { x, y } = getDirectionValues()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
