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
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { bgDefault2 } from "@/styles/classNames";
import { useEffect, useState } from "react";
import {
  callFetchCategories,
  callFetchPostAuthor,
  callFetchRecentPosts,
  IPost,
} from "@/lib/api-services";
import { formatDateVN } from "@/lib/utils";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}
export default function AdminDashboard() {
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    callFetchRecentPosts()
      .then((res) => {
        setRecentPosts(res.data.slice(0, 4));
      })
      .catch(() => {
        setRecentPosts([]);
      });
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postRes, categoryRes] = await Promise.all([
          callFetchPostAuthor(),
          callFetchCategories(),
        ]);

        const posts = postRes.data || [];
        const categories = categoryRes.data || [];

        const totalPosts = posts.length;
        const totalCategories = categories.length;

        setStats([
          {
            title: "Tổng bài viết",
            value: totalPosts.toString(),
            change: "+12%",
            icon: FileText,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
          },
          {
            title: "Danh mục",
            value: totalCategories.toString(),
            change: "+2",
            icon: FolderOpen,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20",
          },
          {
            title: "Lượt xem",
            value: "12.5K",
            change: "+18%",
            icon: Eye,
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50 dark:bg-orange-900/20",
          },
        ]);
      } catch (error) {
        console.error("Lỗi khi fetch thống kê:", error);
      }
    };

    fetchStats();
  }, []);

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
                  key={post._id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-[140px] md:w-[160px] lg-w-[180px] line-clamp-1 md:line-clamp-none lg:line-clamp-none text-sm border border-green-400 rounded-lg w px-2 text-gray-500">
                        {post.category.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          post.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        }`}
                      >
                        {post.status === "published"
                          ? "Đã xuất bản"
                          : "Tạm ngừng"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 border-b text-sm text-green-500">
                      Ngày xuất bản
                    </div>
                    <p className="text-xs text-gray-400">
                      {formatDateVN(post.createdAt)} {}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
