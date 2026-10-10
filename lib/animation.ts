import type { AnimationVariant } from "@/types"

export const SlideUp = (delay = 0): AnimationVariant => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: delay,
      },
    },
  }
}

export const SlideLeft = (delay = 0): AnimationVariant => {
  return {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: delay,
      },
    },
  }
}

export const SlideRight = (delay = 0): AnimationVariant => {
  return {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: delay,
      },
    },
  }
}

export const SlideDownFade: AnimationVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

export const ZoomLeft: AnimationVariant = {
  hidden: { opacity: 0, scale: 0.8, x: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export const RotateUp: AnimationVariant = {
  hidden: { opacity: 0, rotate: -10, y: 50 },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export const FlipRight: AnimationVariant = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

export const textFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, delay: 0.3, ease: "easeOut" } },
}

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.3, ease: "easeOut" },
}
