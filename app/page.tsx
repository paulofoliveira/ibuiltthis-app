import FeaturedProducts from "@/components/landing-page/featured-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Suspense fallback={<div className="wrapper flex items-center gap-2">Loading Recently Launched Products...</div>}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}
