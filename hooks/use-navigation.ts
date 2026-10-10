"use client"

import { useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"

export function useNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  /**
   * Navigate to a new route with proper scroll restoration
   * @param path - The path to navigate to
   * @param options - Navigation options
   */
  const navigate = useCallback(
    (
      path: string,
      options?: {
        replace?: boolean
        scroll?: boolean
        external?: boolean
      },
    ) => {
      // Handle external links that should open in a new tab
      if (options?.external) {
        window.open(path, "_blank")
        return
      }

      // Use replace for same-page navigation, push for different pages
      if (options?.replace || path === pathname) {
        router.replace(path)
      } else {
        router.push(path)
      }
    },
    [router, pathname],
  )

  return {
    navigate,
    pathname,
  }
}
