"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Code, Sparkles } from "lucide-react";
import TrendingCarousel from "@/components/trending-carousel";
import {
  titleName,
  maxWidth,
  textDefault,
  bgWelcome,
  buttonDefault,
} from "../styles/classNames";
import {
  callFetchCategories,
  callFetchRecentPosts,
  ICategory,
  IPost,
} from "@/lib/api-services";
import { formatDateVN } from "@/lib/utils";

export default function HomePage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const [sectionsVisible, setSectionsVisible] = useState({
    hero: false,
    trending: false,
    categories: false,
    latest: false,
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setSectionsVisible((prev) => ({
            ...prev,
            [sectionId]: true,
          }));
        }
      });
    }, observerOptions);

    const sections = ["hero", "trending", "categories", "latest"];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await callFetchCategories();
        const sortedByPostCount = res.data
          .sort((a, b) => (b.totalPost || 0) - (a.totalPost || 0))
          .slice(0, 4);

        setCategories(sortedByPostCount);
      } catch (err) {
        console.error("Lỗi fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setLoadingRecent(true);
    callFetchRecentPosts()
      .then((res) => {
        setRecentPosts(res.data.slice(0, 3));
      })
      .catch(() => {
        setRecentPosts([]);
      })
      .finally(() => setLoadingRecent(false));
  }, []);

  return (
    <div className="flex flex-col px-4 min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className={`relative px-2 rounded-lg ${bgWelcome} text-white py-20 lg:py-32 overflow-hidden`}
      >
        {/* <div className="absolute inset-0 bg-black/10"></div> */}
        {/* Animated decorative elements */}
        <div
          className={`relative z-10 transition-all duration-1000 ${
            sectionsVisible.hero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className={`${maxWidth} mx-auto text-center`}>
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
              Chào mừng đến với {titleName}!
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-green-100 animate-slide-in-up stagger-2">
              Nơi chia sẻ kiến thức lập trình và công nghệ
            </p>
            <p className="text-lg mb-8 text-green-200 max-w-2xl mx-auto animate-slide-in-up stagger-3">
              Khám phá những bài viết chất lượng về Frontend, Backend, DevOps và
              AI. Từ cơ bản đến nâng cao, từ lý thuyết đến thực hành.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in stagger-4">
              <Button
                asChild
                size="lg"
                className=" hover:bg-green-50 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
        <div className="">
          <div className={`${maxWidth} mx-auto`}>
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                sectionsVisible.categories
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className={`text-4xl ${textDefault} font-bold mb-4 `}>
                Danh mục bài viết
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Khám phá các chủ đề công nghệ được phân loại chi tiết, từ cơ bản
                đến nâng cao
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group animate-fade-in-up rounded-md bg-gradient-to-br from-card to-muted/50 border border-gray-200 dark:border-gray-700 hover:scale-105 transform transition duration-500 hover:shadow-xl dark:hover:shadow-green-900"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="flex flex-col h-full border border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-600 transition-colors duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-24 h-24 border border-gray-300 dark:border-gray-600 rounded-2xl object-cover shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                        />
                        <div className="flex-1">
                          <CardTitle className="text-xl group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                            {category.name}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {category.posts ? category.posts.length : 0} bài
                              viết
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-grow space-y-4 p-5">
                      <CardDescription className="leading-relaxed text-sm line-clamp-3 min-h-[4rem]">
                        {category.description}
                      </CardDescription>

                      <Button asChild className="w-full group mt-auto">
                        <Link href={`/categories/${category.slug}`}>
                          Khám phá {category.name}
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
        <div className="">
          <div className={`${maxWidth} mx-auto `}>
            <div
              className={`text-center mb-12 transition-all duration-1000 ${
                sectionsVisible.latest
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className={`text-3xl font-bold mb-4 ${textDefault}`}>
                Bài viết mới nhất
              </h2>
              <p className="text-muted-foreground text-lg">
                Cập nhật những kiến thức và công nghệ mới nhất
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <div
                  key={post._id}
                  className={`transition-all duration-700 ${
                    sectionsVisible.latest
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-10 scale-95"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <Card className="group card-hover-lift border-green-100 dark:border-green-900 relative overflow-hidden">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={post.category.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={buttonDefault}>
                          {post.category.name}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1 min-h-[1.5rem] group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors capitalize">
                        {post.title}
                      </CardTitle>

                      <CardDescription className="text-sm text-muted-foreground line-clamp-2 overflow-hidden">
                        {post.introduction}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDateVN(post.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} phút đọc
                          </div>
                        </div>
                      </div>
                      <Button asChild className="w-full group">
                        <Link href={`/posts/${post._id}`}>
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
  );
}
