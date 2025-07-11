"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FolderOpen,
  MessageSquare,
  Eye,
  TrendingUp,
  Users,
  Calendar,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { bgDefault2 } from "@/styles/classNames";

// Mock data
const stats = [
  {
    title: "Tổng bài viết",
    value: "24",
    change: "+12%",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Danh mục",
    value: "8",
    change: "+2",
    icon: FolderOpen,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Comments",
    value: "156",
    change: "+23%",
    icon: MessageSquare,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    title: "Lượt xem",
    value: "12.5K",
    change: "+18%",
    icon: Eye,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
];

const recentPosts = [
  {
    id: 1,
    title: "Hướng dẫn React Hooks cơ bản",
    category: "React",
    status: "published",
    views: 1234,
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Next.js 14 - Những tính năng mới",
    category: "Next.js",
    status: "draft",
    views: 856,
    date: "2024-01-14",
  },
  {
    id: 3,
    title: "TypeScript Tips & Tricks",
    category: "TypeScript",
    status: "published",
    views: 2341,
    date: "2024-01-13",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className={`${bgDefault2} rounded-2xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Chào mừng trở lại! 👋</h1>
            <p className="text-green-100">
              Quản lý blog của bạn một cách hiệu quả
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            className="bg-white text-green-600 hover:bg-gray-100"
          >
            <Link href="/admin/posts/new">
              <Plus className="w-4 h-4 mr-2" />
              Tạo bài viết mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon
                    className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Bài viết gần đây
            </CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/posts">Xem tất cả</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-500">
                        {post.category}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        }`}
                      >
                        {post.status === "published"
                          ? "Đã xuất bản"
                          : "Bản nháp"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      {post.views}
                    </div>
                    <p className="text-xs text-gray-400">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Thống kê nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Bài viết tuần này</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      5 bài viết mới
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600">5</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Người đọc mới</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tăng 23% so với tuần trước
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">+23%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Comments chờ duyệt</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cần xem xét
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-purple-600">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
