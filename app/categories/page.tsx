"use client";
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
import { callFetchCategories, ICategory } from "@/lib/api-services";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await callFetchCategories();
        console.log("🚀 ~ fetchCategories ~ res:", res);
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const totalPosts = categories.reduce(
    (sum, cat) => sum + (cat.posts ? cat.posts.length : 0),
    0
  );

  return (
    <div className="min-h-screen   px-4 round bg-background">
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
      <section className={`py-20 mx-auto ${maxWidth} `}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <CardTitle className="text-xl capitalize group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
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
                    <CardDescription className="leading-relaxed text-sm flex-shrink-0">
                      {category.description}
                    </CardDescription>

                    <div className="space-y-2 flex-grow overflow-auto max-h-24">
                      <h4 className="font-semibold text-sm text-muted-foreground">
                        Bài viết nổi bật:
                      </h4>
                      <ul className="space-y-1">
                        {Array.isArray(category.posts) &&
                        category.posts.length > 0 ? (
                          category.posts.slice(0, 2).map((post, postIndex) => (
                            <li
                              key={postIndex}
                              className="text-xs text-muted-foreground flex items-center gap-2"
                            >
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              {post.title}
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-muted-foreground italic">
                            Chưa có bài viết nào
                          </li>
                        )}
                      </ul>
                    </div>

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
