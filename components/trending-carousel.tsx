"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bgWelcome, maxWidth, textDefault } from "@/styles/classNames";
import { callFetchPostAuthor, IAllPost } from "@/lib/api-services";
import { formatDateVN } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n-provider";

export default function TrendingCarousel() {
  const { t } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<IAllPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await callFetchPostAuthor();
        const posts = res.data;
        const featured = posts.filter((post) => post.isFeatured);
        setFeaturedPosts(featured);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết nổi bật:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!isPaused && featuredPosts.length > 0) {
      const timer = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
          setIsTransitioning(false);
        }, 300);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, featuredPosts.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("trending-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const nextSlide = () => {
    if (featuredPosts.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (featuredPosts.length === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length
      );
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (featuredPosts.length === 0) return;

    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const currentPost = featuredPosts[currentSlide];

  return (
    <section id="trending-section" className="py-6 bg-background">
      <div className="">
        <div className={`${maxWidth} mx-auto `}>
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className={`text-4xl font-bold mb-4 ${textDefault}`}>
              {t("homePage.featuredPostsTitle")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("homePage.featuredPostsDescription")}
            </p>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
            }`}
          >
            {/* Main Carousel */}
            <div
              className={`relative ${bgWelcome} rounded-3xl px-12 py-6  text-white overflow-hidden border-2 border-green-500/20 shadow-2xl`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className={`relative z-10 transition-all duration-500 ease-in-out ${
                  isTransitioning
                    ? "opacity-0 translate-y-4 scale-95"
                    : "opacity-100 translate-y-0 scale-100"
                }`}
              >
                {currentPost && (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-background/10 text-white border-white/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {currentPost.category.name || "Không có"}
                        </Badge>
                        <div className="flex items-center gap-2 text-green-100">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {formatDateVN(currentPost.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight line-clamp-1">
                      {currentPost.title}
                    </h3>

                    <p className="text-green-100 text-lg mb-8 leading-relaxed max-w-3xl line-clamp-2">
                      {currentPost.introduction}
                    </p>

                    <Button
                      asChild
                      size="sm"
                      className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold shadow transition duration-300"
                    >
                      <Link href={`/posts/${currentPost._id}`}>
                        {t("homePage.readMore")} →
                      </Link>
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-1 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 transition-all duration-300 hover:scale-110"
                onClick={prevSlide}
              >
                <ChevronLeft style={{ width: "28px", height: "28px" }} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 transition-all duration-300 hover:scale-110"
                onClick={nextSlide}
              >
                <ChevronRight style={{ width: "28px", height: "28px" }} />
              </Button>
            </div>

            {!isPaused && (
              <div className="flex justify-center mt-4">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {t("homePage.autoChange")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
