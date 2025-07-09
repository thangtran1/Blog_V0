import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { bgWelcome, maxWidth, textDefault } from "@/styles/classNames";

const categories = [
  {
    name: "Frontend",
    icon: "🎨",
    description:
      "React, JavaScript, HTML, CSS và các công nghệ frontend khác. Tìm hiểu về UI/UX, responsive design và performance optimization.",
    count: 8,
    href: "/categories/frontend",
    gradient: "from-blue-500 to-purple-600",
    posts: [
      "Micro Frontend Architecture - Hướng dẫn toàn diện",
      "React Performance Optimization",
      "Next.js 15 - Những tính năng mới",
    ],
  },
  {
    name: "Backend",
    icon: "⚙️",
    description:
      "Node.js, Express.js, API development và server-side programming. Khám phá kiến trúc microservices và database design.",
    count: 5,
    href: "/categories/backend",
    gradient: "from-green-500 to-teal-600",
    posts: [
      "Elasticsearch Toàn Tập: Search Engine Hiện Đại",
      "SQL vs NoSQL - So Sánh Chi Tiết",
      "RESTful API Design Best Practices",
    ],
  },
  {
    name: "DevOps",
    icon: "🚀",
    description:
      "Docker, CI/CD, cloud deployment và infrastructure. Tự động hóa quy trình phát triển và triển khai ứng dụng.",
    count: 4,
    href: "/categories/devops",
    gradient: "from-orange-500 to-red-600",
    posts: [
      "API Gateway với Kong",
      "Kubernetes cho người mới bắt đầu",
      "CI/CD Pipeline với GitHub Actions",
    ],
  },
  {
    name: "AI & Automation",
    icon: "🤖",
    description:
      "AI Automation, n8n, AI Agent và các công nghệ AI. Khám phá machine learning và automation workflows.",
    count: 3,
    href: "/categories/ai",
    gradient: "from-purple-500 to-pink-600",
    posts: [
      "NocoBase - Nền Tảng Low-Code",
      "AI Automation với N8N",
      "RAG Systems với LangChain",
    ],
  },
  {
    name: "Database",
    icon: "🗄️",
    description:
      "SQL, NoSQL, MongoDB, PostgreSQL và database design. Tối ưu hóa truy vấn và thiết kế schema hiệu quả.",
    count: 6,
    href: "/categories/database",
    gradient: "from-indigo-500 to-blue-600",
    posts: [
      "PostgreSQL Advanced Techniques",
      "MongoDB Aggregation Pipeline",
      "Database Indexing Strategies",
    ],
  },
  {
    name: "Tools & OpenSource",
    icon: "🛠️",
    description:
      "OpenSource tools, development tools, productivity và utilities. Công cụ hỗ trợ phát triển và tăng năng suất.",
    count: 7,
    href: "/categories/tools",
    gradient: "from-teal-500 to-green-600",
    posts: [
      "VS Code Extensions Must-Have",
      "Git Workflow Best Practices",
      "Docker Development Environment",
    ],
  },
];

export default function CategoriesPage() {
  const totalPosts = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="min-h-screen px-4 round bg-background">
      {/* Hero Section */}
      <section
        className={`relative rounded-lg ${bgWelcome} text-white py-20 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500"></div>

        <div className=" relative z-10">
          <div className="max-w-4xl px-4 mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 animate-bounce">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                  <span className="text-sm">📚</span>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Danh mục bài viết
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-green-100">
              Khám phá {categories.length} danh mục với {totalPosts} bài viết
              chất lượng
            </p>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">
              Từ Frontend đến Backend, từ DevOps đến AI - tất cả kiến thức bạn
              cần để trở thành developer toàn diện
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="">
          <div className={`${maxWidth} mx-auto`}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group animate-fade-in-up  border border-gray-200 rounded-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 bg-gradient-to-br from-card to-muted/50 hover:scale-105 transform">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                        >
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                            {category.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {category.count} bài viết
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="leading-relaxed text-sm">
                        {category.description}
                      </CardDescription>

                      {/* Popular posts preview */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">
                          Bài viết nổi bật:
                        </h4>
                        <ul className="space-y-1">
                          {category.posts.slice(0, 2).map((post, postIndex) => (
                            <li
                              key={postIndex}
                              className="text-xs text-muted-foreground flex items-center gap-2"
                            >
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              {post}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild className="w-full group mt-4">
                        <Link href={category.href}>
                          Khám phá {category.name}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="px-4">
          <div className={`${maxWidth} mx-auto `}>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${textDefault}`}>
                  {categories.length}
                </div>
                <div className="text-muted-foreground">Danh mục</div>
              </div>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${textDefault}`}>
                  {totalPosts}
                </div>
                <div className="text-muted-foreground">Bài viết</div>
              </div>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${textDefault}`}>5+</div>
                <div className="text-muted-foreground">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
