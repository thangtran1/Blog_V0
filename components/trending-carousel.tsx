"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const trendingPosts = [
  {
    id: 1,
    title: "Elasticsearch - Search Engine Toàn Diện",
    description:
      "Elasticsearch là gì? Các chức năng chính của Elasticsearch. Cách sử dụng Elasticsearch. Cách triển khai Elasticsearch.",
    date: "23 tháng 6, 2025",
    category: "Backend",
    trending: true,
  },
  {
    id: 2,
    title: "API Gateway với Kong - Microservices",
    description: "Tìm hiểu về Kong API Gateway, cách cấu hình và triển khai trong kiến trúc microservices hiện đại.",
    date: "21 tháng 6, 2025",
    category: "DevOps",
    trending: true,
  },
  {
    id: 3,
    title: "Micro Frontend Architecture 2025",
    description: "Hướng dẫn chi tiết về kiến trúc Micro Frontend, từ concept đến implementation trong dự án thực tế.",
    date: "19 tháng 6, 2025",
    category: "Frontend",
    trending: true,
  },
  {
    id: 4,
    title: "AI Automation với N8N Workflow",
    description: "Khám phá N8N - công cụ automation mạnh mẽ, tạo workflow tự động hóa với AI integration.",
    date: "17 tháng 6, 2025",
    category: "AI",
    trending: true,
  },
]

export default function TrendingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-slide effect
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % trendingPosts.length)
          setIsTransitioning(false)
        }, 300) // Transition duration
      }, 6000) // 6 giây

      return () => clearInterval(timer)
    }
  }, [isPaused])

  // Intersection observer for initial animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("trending-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const nextSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % trendingPosts.length)
      setIsTransitioning(false)
    }, 300)
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + trendingPosts.length) % trendingPosts.length)
      setIsTransitioning(false)
    }, 300)
  }

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const currentPost = trendingPosts[currentSlide]

  return (
    <section id="trending-section" className="py-20 bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-green-600 dark:text-green-400">Bài viết nổi bật</h2>
            <p className="text-muted-foreground text-lg">Những bài viết được quan tâm và chia sẻ nhiều nhất</p>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`}
          >
            {/* Main Carousel */}
            <div
              className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden border-2 border-green-500/20 shadow-2xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Animated background elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>

              {/* Content with transition */}
              <div
                className={`relative z-10 transition-all duration-500 ease-in-out ${
                  isTransitioning ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-white/20 text-white border-white/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {currentPost.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-green-100">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{currentPost.date}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{currentPost.title}</h3>

                <p className="text-green-100 text-lg mb-8 leading-relaxed max-w-3xl">{currentPost.description}</p>

                <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 font-semibold">
                  <Link href={`/posts/${currentPost.id}`}>Đọc ngay →</Link>
                </Button>
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 transition-all duration-300 hover:scale-110"
                onClick={prevSlide}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 transition-all duration-300 hover:scale-110"
                onClick={nextSlide}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-3">
              {trendingPosts.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSlide
                      ? "bg-green-500 scale-125 shadow-lg shadow-green-500/50"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            {!isPaused && (
              <div className="flex justify-center mt-4">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Tự động chuyển sau 6 giây
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
