import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const categoryData = {
  frontend: {
    name: "Frontend",
    description: "Các bài viết về phát triển giao diện người dùng, React, Next.js và các công nghệ frontend hiện đại",
    posts: [
      {
        id: 3,
        title: "Micro Frontend Architecture - Hướng dẫn toàn diện về kiến trúc Frontend hiện đại 2025",
        excerpt: "Tìm hiểu chi tiết về Micro Frontend Architecture - từ khái niệm cơ bản, các kỹ thuật triển khai...",
        date: "19 tháng 6, 2025",
        readTime: "43 phút đọc",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
  },
  backend: {
    name: "Backend",
    description: "Các bài viết về phát triển server-side, database, API và kiến trúc hệ thống",
    posts: [
      {
        id: 1,
        title: "Elasticsearch Toàn Tập: Search Engine Hiện Đại Cho Ứng Dụng Web",
        excerpt: "Tìm hiểu về Elasticsearch, một trong những search engine mạnh mẽ nhất hiện nay...",
        date: "23 tháng 6, 2025",
        readTime: "24 phút đọc",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 4,
        title: "SQL vs NoSQL - So Sánh Chi Tiết Các Loại Database Hiện Đại",
        excerpt: "So sánh chi tiết giữa SQL và NoSQL database, ưu nhược điểm của từng loại...",
        date: "17 tháng 6, 2025",
        readTime: "25 phút đọc",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
  },
  devops: {
    name: "DevOps",
    description: "Các bài viết về CI/CD, containerization, cloud computing và vận hành hệ thống",
    posts: [
      {
        id: 2,
        title: "API Gateway với Kong - Giải pháp toàn diện cho Microservices",
        excerpt: "Tìm hiểu về API Gateway, Kong và cách triển khai trong kiến trúc microservices...",
        date: "21 tháng 6, 2025",
        readTime: "28 phút đọc",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
  },
  ai: {
    name: "AI & Automation",
    description: "Các bài viết về trí tuệ nhân tạo, machine learning và tự động hóa quy trình",
    posts: [
      {
        id: 5,
        title: "NocoBase - Nền Tảng Low-Code Cho Doanh Nghiệp Hiện Đại",
        excerpt: "Khám phá NocoBase, một nền tảng low-code mạnh mẽ giúp xây dựng ứng dụng...",
        date: "15 tháng 6, 2025",
        readTime: "20 phút đọc",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: 6,
        title: "AI Automation với N8N và hướng dẫn cài đặt chi tiết",
        excerpt: "Hướng dẫn chi tiết về N8N - công cụ automation mạnh mẽ, cách cài đặt...",
        date: "13 tháng 6, 2025",
        readTime: "32 phút đọc",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
  },
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryData[params.category as keyof typeof categoryData]

  if (!category) {
    return <div>Danh mục không tồn tại</div>
  }

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-600 dark:text-green-400">{category.name}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{category.description}</p>
          <div className="mt-6">
            <Badge variant="secondary" className="text-sm">
              {category.posts.length} bài viết
            </Badge>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.posts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300 border-green-100 dark:border-green-900"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 hover:bg-green-600">{category.name}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
