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
import { ArrowRight } from "lucide-react";
import { maxWidth, textDefault } from "@/styles/classNames";
import { callFetchCategories, ICategory } from "@/lib/api-services";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await callFetchCategories();
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
    <div
      className={`min-h-screen ${maxWidth}  mx-auto px-4 py-8 round bg-background`}
    >
      <div className="text-center  mb-12">
        <h1 className={`text-4xl font-bold mb-1 ${textDefault}`}>
          Danh mục bài viết
        </h1>
        <p className="text-muted-foreground text-lg mb-3 mt-2 inline-block border-b border-green-800 max-w-2xl mx-auto">
          Khám phá{" "}
          <span className="font-bold text-green-600">{categories.length}</span>{" "}
          danh mục với{" "}
          <span className="font-bold text-green-600">{totalPosts}</span> bài
          viết chất lượng
        </p>
        <p className="text-lg text-gray-370 dark:text-gray-300 max-w-2xl mx-auto">
          Từ Frontend đến Backend, từ DevOps đến AI - tất cả kiến thức bạn cần
          để trở thành developer toàn diện
        </p>
      </div>

      <section className={` mx-auto ${maxWidth} `}>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group animate-fade-in-up rounded-md bg-gradient-to-br from-card to-muted/50 dark:border-gray-700 hover:scale-105 transform transition duration-500 hover:shadow-xl dark:hover:shadow-green-900"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="flex flex-col h-full hover:border-green-400 dark:hover:border-green-600 transition-colors duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-24 h-24 border border-green-300 dark:border-green-700 rounded-2xl object-cover shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
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

                  <CardContent className="flex flex-col flex-grow  space-y-4 p-5">
                    <CardDescription className="leading-relaxed line-clamp-2 min-h-[2.5rem]  text-sm flex-shrink-0">
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

      <section className="py-8 border border-gray-200 dark:border-gray-800 bg-muted/40 rounded-lg">
        <div className="px-4">
          <div className={`${maxWidth} mx-auto`}>
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
