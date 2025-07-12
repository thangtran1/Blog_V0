"use client";

import React, { useEffect, useState } from "react";
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
import { Calendar, Clock, ArrowLeft, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonDefault, maxWidth, textDefault } from "@/styles/classNames";
import {
  callFetchPostBySlugCategory,
  IPostByCategory,
} from "@/lib/api-services";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const categoryParams = React.use(params);
  const categorySlug = categoryParams.category;

  const [posts, setPosts] = useState<IPostByCategory[]>([]);
  console.log("🚀 ~ posts:", posts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    callFetchPostBySlugCategory(categorySlug)
      .then((res) => {
        setPosts(res.data);
      })
      .catch(() => {
        setError("Không tải được dữ liệu bài viết");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categorySlug]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (posts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
        <Folder className="w-16 h-16 mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          Chưa có bài viết nào trong danh mục này
        </h2>
        <p className="text-gray-500 mb-6">
          Hiện tại chưa có nội dung bài viết nào thuộc danh mục{" "}
          <strong>{categorySlug}</strong>.
        </p>
        <Link href="/categories">
          <Button variant="outline">Quay lại danh mục</Button>
        </Link>
      </div>
    );

  // Lấy thông tin category từ bài viết đầu tiên (bài nào cũng có embedded category)
  const category = posts[0].category;

  return (
    <div className="p-4">
      <div className={`${maxWidth} mx-auto`}>
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/categories">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh mục
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${textDefault}`}>
            {category.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {category.description}
          </p>
          <div className="mt-6">
            <Badge
              variant="secondary"
              className="text-sm border border-green-200 px-3"
            >
              {posts.length} bài viết
            </Badge>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post._id}
              className="group hover:shadow-xl transition-all duration-300 border-green-100 dark:border-green-900"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={buttonDefault}>{category.name}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1 min-h-[1rem] capitalize  group-hover:text-green-600 transition-colors">
                  <Link href={`/posts/${post._id}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-[2.5rem] ">
                  {post.introduction}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} phút đọc
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
