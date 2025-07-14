"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { buttonDefault, maxWidth, textDefault } from "@/styles/classNames";
import {
  callFetchPostById,
  callFetchRecentPosts,
  IPost,
} from "@/lib/api-services"; // Hàm gọi API theo id
import { formatDateVN } from "@/lib/utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const tableOfContents = [
  {
    id: "1",
    title:
      "Search Engine là gì? Tại sao cần Search Engine trong ứng dụng hiện đại?",
  },
  { id: "1.1", title: "Search Engine (Công cụ tìm kiếm) là gì?" },
  { id: "1.2", title: "Tại sao ứng dụng đại cần Search Engine chuyên dụng?" },
  { id: "1.3", title: "Nhược điểm và thách thức" },
  { id: "2", title: "Elasticsearch là gì? Vì sao lại mạnh mẽ đến vậy?" },
  { id: "2.1", title: "Đặc điểm nổi bật của Elasticsearch" },
  { id: "2.2", title: "Lịch sử phát triển của Elasticsearch" },
  { id: "2.3", title: "Elasticsearch trong hệ sinh thái Elastic Stack" },
  { id: "3", title: "Kiến trúc cốt lõi của Elasticsearch" },
];

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // unwrap params promise
  const { id } = React.use(params);

  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const pathname = usePathname();
  const currentId = pathname?.split("/").pop();
  useEffect(() => {
    setLoading(true);
    setError(null);
    callFetchPostById(id)
      .then((res) => {
        setPost(res.data);
      })
      .catch(() => setError("Không tải được bài viết"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setLoadingRecent(true);
    callFetchRecentPosts()
      .then((res) => {
        setRecentPosts(res.data);
      })
      .catch(() => {
        setRecentPosts([]);
      })
      .finally(() => setLoadingRecent(false));
  }, []);

  if (loading) return <div>Đang tải bài viết...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Bài viết không tồn tại</div>;

  return (
    <div className="p-4">
      <div className={`${maxWidth} mx-auto `}>
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/posts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại tất cả bài viết
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar Left */}
          <div className="lg:col-span-3">
            <div className="sticky top-20 space-y-6">
              <Card className="border-green-200 dark:border-green-800 bg-card/50 backdrop-blur-sm shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    📚 Bài viết gần đây
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {loadingRecent && (
                    <div className="p-4 text-sm text-muted-foreground">
                      Đang tải bài viết gần đây...
                    </div>
                  )}

                  {!loadingRecent &&
                    recentPosts.map((recentPost) => {
                      const isActive = recentPost._id === currentId;
                      return (
                        <Link
                          key={recentPost._id}
                          href={`/posts/${recentPost._id}`}
                          className={clsx(
                            "block transition-all",
                            isActive
                              ? "bg-muted/80 border-l-4 border-green-500"
                              : "hover:bg-muted/50 border-l-4 border-transparent"
                          )}
                        >
                          <div className="px-5 py-4 border-b">
                            <p
                              className={clsx(
                                "font-semibold uppercase md:text-[14px] line-clamp-2 mb-1 transition-colors",
                                isActive
                                  ? "text-green-600 dark:text-green-400"
                                  : "group-hover:text-green-600 dark:group-hover:text-green-400"
                              )}
                            >
                              {recentPost.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDateVN(recentPost.createdAt)}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                  {!loadingRecent && recentPosts.length === 0 && (
                    <div className="p-4 text-sm text-muted-foreground">
                      Chưa có bài viết gần đây
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <article className="prose prose-gray max-w-none dark:prose-invert prose-lg">
              <div className="mb-8">
                <div className="flex items-center gap-2">
                  <Badge className={`${buttonDefault} text-white`}>
                    {post.category.name}
                  </Badge>
                </div>
                <h2>{post.title}</h2>
                <div className="italic font-medium text-sm md:text-base my-2  text-gray-500 dark:text-gray-400 opacity-80 leading-relaxed transition-colors duration-300 ">
                  {post.introduction}
                </div>
                <div className="flex items-center gap-6 text-muted-foreground mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} phút đọc
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-green-600"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>

              <div className="prose-lg prose-headings:text-foreground prose-p:text-foreground prose-strong:text-green-600 dark:prose-strong:text-green-400 prose-code:bg-muted prose-code:text-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-ul:text-foreground prose-li:text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </article>
          </div>

          {/* Table of Contents */}
          <div className="lg:col-span-3">
            <div className="sticky top-20">
              <Card className="border-green-200 dark:border-green-800 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle
                    className={`text-lg ${textDefault} flex items-center gap-2`}
                  >
                    📋 Trong bài này
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 px-3 rounded-md hover:bg-muted/50 border-l-2 border-transparent hover:border-green-500"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
