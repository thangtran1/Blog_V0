"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { bgDefault2 } from "@/styles/classNames";

// Mock data
const posts = [
  {
    id: 1,
    title: "Hướng dẫn React Hooks cơ bản",
    excerpt:
      "Tìm hiểu về useState, useEffect và các hooks cơ bản trong React...",
    category: "React",
    author: "Admin",
    status: "published",
    views: 1234,
    comments: 12,
    date: "2024-01-15",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    title: "Next.js 14 - Những tính năng mới",
    excerpt: "Khám phá các tính năng mới trong Next.js 14 và cách sử dụng...",
    category: "Next.js",
    author: "Admin",
    status: "draft",
    views: 856,
    comments: 5,
    date: "2024-01-14",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 3,
    title: "TypeScript Tips & Tricks",
    excerpt: "Những mẹo và thủ thuật hữu ích khi làm việc với TypeScript...",
    category: "TypeScript",
    author: "Admin",
    status: "published",
    views: 2341,
    comments: 23,
    date: "2024-01-13",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 4,
    title: "CSS Grid Layout - Hướng dẫn chi tiết",
    excerpt: "Học cách sử dụng CSS Grid để tạo layout phức tạp...",
    category: "CSS",
    author: "Admin",
    status: "published",
    views: 1876,
    comments: 18,
    date: "2024-01-12",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 5,
    title: "JavaScript ES2024 - Tính năng mới",
    excerpt: "Tổng quan về các tính năng mới trong JavaScript ES2024...",
    category: "JavaScript",
    author: "Admin",
    status: "scheduled",
    views: 0,
    comments: 0,
    date: "2024-01-20",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 6,
    title: "Tailwind CSS - Best Practices",
    excerpt: "Những thực hành tốt nhất khi sử dụng Tailwind CSS...",
    category: "CSS",
    author: "Admin",
    status: "draft",
    views: 432,
    comments: 3,
    date: "2024-01-11",
    image: "/placeholder.svg?height=100&width=150",
  },
];

const stats = [
  { title: "Tổng bài viết", value: "24", color: "from-blue-500 to-blue-600" },
  { title: "Đã xuất bản", value: "18", color: "from-green-500 to-green-600" },
  { title: "Bản nháp", value: "4", color: "from-yellow-500 to-yellow-600" },
  { title: "Đã lên lịch", value: "2", color: "from-purple-500 to-purple-600" },
];

export default function AdminPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Đã xuất bản
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            Bản nháp
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
            Đã lên lịch
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Quản lý bài viết
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tạo, chỉnh sửa và quản lý tất cả bài viết của bạn
          </p>
        </div>
        <Button asChild className={bgDefault2}>
          <Link href="/admin/posts/new">
            <Plus className="w-4 h-4 mr-2" />
            Tạo bài viết mới
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} opacity-20`}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Filter className="w-4 h-4" />
                  Lọc theo trạng thái
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  Tất cả
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("published")}>
                  Đã xuất bản
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("draft")}>
                  Bản nháp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("scheduled")}>
                  Đã lên lịch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  {getStatusBadge(post.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem trước
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Không tìm thấy bài viết
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
            <Button asChild>
              <Link href="/admin/posts/new">Tạo bài viết đầu tiên</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
