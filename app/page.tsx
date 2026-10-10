import Hero from "@/components/sections/Hero"
import Features from "@/components/sections/Features"
import LatestProducts from "@/components/sections/LatestProducts"
import Testimonials from "@/components/sections/Testimonials"
import Newsletter from "@/components/sections/Newsletter"
import PremiumBanners from "@/components/sections/PremiumBanners"

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <LatestProducts />
      <PremiumBanners />
      <Testimonials />
      <Newsletter />
    </>
  )
}
