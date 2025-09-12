"use client";
import BannerCarousel from "@/components/homePage/bannerCarousel";
import CategoriesFeature from "@/components/homePage/categories-feature";
import CategoriesNew from "@/components/homePage/categories-new";
import MarqueeScroll from "@/components/homePage/marquee-scroll";
import TrendingCarousel from "@/components/trending-carousel";
export default function HomePage() {
  return (
    <>
      <BannerCarousel />
      <MarqueeScroll />
      <div className="flex flex-col px-4 min-h-screen">
        <TrendingCarousel />
        <CategoriesFeature />
        <CategoriesNew />
      </div>
    </>
  );
}
