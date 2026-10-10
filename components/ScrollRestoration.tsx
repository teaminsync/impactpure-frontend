"use client"

import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

function ScrollRestorationContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Scroll to top on route changes
    window.scrollTo(0, 0)
  }, [pathname, searchParams])

  return null
}

export default function ScrollRestoration() {
  return (
    <Suspense fallback={null}>
      <ScrollRestorationContent />
    </Suspense>
  )
}
