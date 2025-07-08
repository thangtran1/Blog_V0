"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, Code, Sparkles } from "lucide-react"
import TrendingCarousel from "@/components/trending-carousel"

const featuredPosts = [
  {
    id: 1,
    title: "Elasticsearch Toàn Tập: Search Engine Hiện Đại Cho Ứng Dụng Web",
    excerpt: "Tìm hiểu về Elasticsearch, một trong những search engine mạnh mẽ nhất hiện nay...",
    date: "23 tháng 6, 2025",
    readTime: "24 phút đọc",
    category: "Backend",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "API Gateway với Kong - Giải pháp toàn diện cho Microservices",
    excerpt: "Khám phá Kong API Gateway và cách triển khai trong kiến trúc microservices...",
    date: "21 tháng 6, 2025",
    readTime: "18 phút đọc",
    category: "DevOps",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Micro Frontend Architecture - Hướng dẫn toàn diện",
    excerpt: "Tìm hiểu về kiến trúc Micro Frontend và cách triển khai trong dự án thực tế...",
    date: "19 tháng 6, 2025",
    readTime: "22 phút đọc",
    category: "Frontend",
    image: "/placeholder.svg?height=200&width=400",
  },
]

const categories = [
  {
    name: "Frontend",
    icon: "🎨",
    description: "React, JavaScript, HTML, CSS và các công nghệ frontend khác",
    count: "8 bài viết",
    href: "/categories/frontend",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "Backend",
    icon: "⚙️",
    description: "Node.js, Express.js, API development và server-side programming",
    count: "5 bài viết",
    href: "/categories/backend",
    gradient: "from-green-500 to-teal-600",
  },
  {
    name: "DevOps",
    icon: "🚀",
    description: "Docker, CI/CD, cloud deployment và infrastructure",
    count: "4 bài viết",
    href: "/categories/devops",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "AI & Automation",
    icon: "🤖",
    description: "AI Automation, n8n, AI Agent và các công nghệ AI",
    count: "3 bài viết",
    href: "/categories/ai",
    gradient: "from-purple-500 to-pink-600",
  },
]

export default function HomePage() {
  // Thêm state cho animations:
  const [sectionsVisible, setSectionsVisible] = useState({
    hero: false,
    trending: false,
    categories: false,
    latest: false,
  })

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setSectionsVisible((prev) => ({
            ...prev,
            [sectionId]: true,
          }))
        }
      })
    }, observerOptions)

    // Observe sections
    const sections = ["hero", "trending", "categories", "latest"]
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 dark:from-green-600 dark:via-green-700 dark:to-green-800 text-white py-20 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Animated decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-full blur-md animate-bounce"></div>

        <div
          className={`container relative z-10 transition-all duration-1000 ${
            sectionsVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative animate-bounce-in-down">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Code className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent animate-slide-in-up stagger-1">
              Chào mừng đến với CodeEasy!
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-green-100 animate-slide-in-up stagger-2">
              Nơi chia sẻ kiến thức lập trình và công nghệ
            </p>
            <p className="text-lg mb-8 text-green-200 max-w-2xl mx-auto animate-slide-in-up stagger-3">
              Khám phá những bài viết chất lượng về Frontend, Backend, DevOps và AI. Từ cơ bản đến nâng cao, từ lý
              thuyết đến thực hành.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in stagger-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Link href="/posts">📚 Khám phá bài viết</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Link href="/categories">🚀 Xem danh mục</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Carousel */}
      <TrendingCarousel />

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                sectionsVisible.categories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl font-bold mb-4 text-green-600 dark:text-green-400">Danh mục bài viết</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Khám phá các chủ đề công nghệ được phân loại chi tiết, từ cơ bản đến nâng cao
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    sectionsVisible.categories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Link href={category.href}>
                    <Card className="group card-hover-lift border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 bg-gradient-to-br from-card to-muted/50 h-full relative overflow-hidden animate-glow-border">
                      {/* Animated border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                          >
                            {category.icon}
                          </div>
                          <div>
                            <CardTitle className="text-xl group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                              {category.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {category.count}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-muted-foreground leading-relaxed text-sm">{category.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-transform bg-transparent border-2 border-green-500/20 hover:border-green-500"
              >
                <Link href="/categories">
                  Xem tất cả danh mục
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section id="latest" className="py-16 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-12 transition-all duration-1000 ${
                sectionsVisible.latest ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Bài viết mới nhất</h2>
              <p className="text-muted-foreground text-lg">Cập nhật những kiến thức và công nghệ mới nhất</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`transition-all duration-700 ${
                    sectionsVisible.latest ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <Card className="group card-hover-lift border-green-100 dark:border-green-900 relative overflow-hidden">
                    {/* Animated border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-500 hover:bg-green-600">{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      <Button asChild className="w-full group">
                        <Link href={`/posts/${post.id}`}>
                          Đọc tiếp
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-transform bg-transparent border-2 border-green-500/20 hover:border-green-500"
              >
                <Link href="/posts">
                  Xem tất cả bài viết
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
