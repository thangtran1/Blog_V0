import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Search, Filter } from "lucide-react";
import { buttonDefault, maxWidth, textDefault } from "@/styles/classNames";

const allPosts = [
  {
    id: 1,
    title: "Elasticsearch Toàn Tập: Search Engine Hiện Đại Cho Ứng Dụng Web",
    excerpt:
      "Tìm hiểu về Elasticsearch, một trong những search engine mạnh mẽ nhất hiện nay, từ những khái niệm cơ bản về search engine, kiến trúc phân tán, so sánh với các công nghệ khác...",
    date: "23 tháng 6, 2025",
    readTime: "24 phút đọc",
    category: "Backend",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "API Gateway với Kong - Giải pháp toàn diện cho Microservices",
    excerpt:
      "Tìm hiểu về API Gateway, Kong và cách triển khai trong kiến trúc microservices. Plugin, lợi ích và hướng dẫn triển khai chi tiết...",
    date: "21 tháng 6, 2025",
    readTime: "28 phút đọc",
    category: "DevOps",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title:
      "Micro Frontend Architecture - Hướng dẫn toàn diện về kiến trúc Frontend hiện đại 2025",
    excerpt:
      "Tìm hiểu chi tiết về Micro Frontend Architecture - từ khái niệm cơ bản, các kỹ thuật triển khai, cho đến hướng dẫn triển khai thực tế trong dự án...",
    date: "19 tháng 6, 2025",
    readTime: "43 phút đọc",
    category: "Frontend",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "SQL vs NoSQL - So Sánh Chi Tiết Các Loại Database Hiện Đại",
    excerpt:
      "So sánh chi tiết giữa SQL và NoSQL database, ưu nhược điểm của từng loại và khi nào nên sử dụng MySQL, PostgreSQL, MongoDB và các...",
    date: "17 tháng 6, 2025",
    readTime: "25 phút đọc",
    category: "Backend",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "NocoBase - Nền Tảng Low-Code Cho Doanh Nghiệp Hiện Đại",
    excerpt:
      "Khám phá NocoBase, một nền tảng low-code mạnh mẽ giúp xây dựng ứng dụng doanh nghiệp nhanh chóng và hiệu quả...",
    date: "15 tháng 6, 2025",
    readTime: "20 phút đọc",
    category: "AI",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "AI Automation với N8N và hướng dẫn cài đặt chi tiết",
    excerpt:
      "Hướng dẫn chi tiết về N8N - công cụ automation mạnh mẽ, cách cài đặt và tạo workflow tự động hóa công việc...",
    date: "13 tháng 6, 2025",
    readTime: "32 phút đọc",
    category: "AI",
    image: "/placeholder.svg?height=200&width=400",
  },
];

export default function PostsPage() {
  return (
    <div className="px-4 py-8">
      <div className={`${maxWidth} mx-auto `}>
        {/* Header */}
        <div className="text-center  mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${textDefault}`}>
            Tất cả bài viết
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Khám phá tất cả bài viết về lập trình, công nghệ và phát triển phần
            mềm
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bài viết gần đây</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {allPosts.slice(0, 5).map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="block group"
                    >
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-green-600 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {post.date}
                      </p>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Tìm kiếm bài viết..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tất cả danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="ai">AI & Automation</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Reset</Button>
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {allPosts.map((post) => (
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
                      <Badge className={buttonDefault}>{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
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
      </div>
    </div>
  );
}
