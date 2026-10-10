import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ShopContextProvider } from "@/contexts/ShopContext"
import SmoothScroll from "@/components/animations/SmoothScroll"
import PageTransition from "@/components/animations/PageTransition"
import ScrollRestoration from "@/components/ScrollRestoration"
import Cursor from "@/components/ui/Cursor"
import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Script from "next/script"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IMPACTPURE - Revolutionary Water Purification Technology",
  description:
    "Experience the future of water purification with IMPACTPURE's advanced MHD technology. Zero electricity, zero waste, maximum purity.",
  keywords: "water purifier, MHD technology, eco-friendly, sustainable, NABL certified",
  authors: [{ name: "IMPACTPURE" }],
  openGraph: {
    title: "IMPACTPURE - Revolutionary Water Purification",
    description: "Advanced MHD technology for pure, mineral-rich water without electricity or waste.",
    type: "website",
  },
  generator: "InSync Solutions",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <ShopContextProvider>
          <ScrollRestoration />
          <SmoothScroll>
            <Cursor />
            <Navbar />
            <PageTransition>
              <main className="min-h-screen">{children}</main>
            </PageTransition>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastClassName="!bg-white !text-neutral-900 !rounded-lg !shadow-lg !border !border-neutral-200"
              progressClassName="!bg-primary-600"
            />
          </SmoothScroll>
        </ShopContextProvider>

        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
