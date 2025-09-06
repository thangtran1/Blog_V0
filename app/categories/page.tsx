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
import { ArrowRight, Heart } from "lucide-react";
import { maxWidth, textDefault } from "@/styles/classNames";
import {
  callFetchCategories,
  callFetchLikedCategories,
  callLike,
  callUnlike,
  ICategory,
} from "@/lib/api-services";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useI18n } from "@/i18n/i18n-provider";

export default function CategoriesPage() {
  const { t } = useI18n();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [visitorId, setVisitorId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("visitorId") || crypto.randomUUID();
    localStorage.setItem("visitorId", id);
    setVisitorId(id);
  }, []);

  useEffect(() => {
    if (!visitorId) return;

    const fetchCategories = async () => {
      try {
        const [res, likedRes] = await Promise.all([
          callFetchCategories(),
          callFetchLikedCategories(visitorId),
        ]);

        const likedIds = likedRes.data;
        const sorted = res.data.sort(
          (a, b) => (b.totalPost || 0) - (a.totalPost || 0)
        );

        const withLikeState = sorted.map((cat) => ({
          ...cat,
          liked: likedIds.includes(cat._id),
          likes: cat.totalLike ?? 0,
        }));

        setCategories(withLikeState);
      } catch (err) {
        console.error("Lỗi fetch categories hoặc liked:", err);
      }
    };

    fetchCategories();
  }, [visitorId]);

  const totalPosts = categories.reduce(
    (sum, cat) => sum + (cat.posts ? cat.posts.length : 0),
    0
  );

  const handleLike = async (categoryId: string) => {
    try {
      const updatedCategories = await Promise.all(
        categories.map(async (cat) => {
          if (cat._id === categoryId) {
            const isLiked = cat.liked ?? false;

            try {
              if (isLiked) {
                await callUnlike({
                  visitorId,
                  targetId: categoryId,
                  type: "category",
                });
                toast.success("Đã bỏ tym thành công ❤️‍🔥");
              } else {
                await callLike({
                  visitorId,
                  targetId: categoryId,
                  type: "category",
                });
                toast.success("Đã tym bài viết thành công 💖");
              }
            } catch (err) {
              console.error("Gọi API like/unlike thất bại", err);
            }

            return {
              ...cat,
              liked: !isLiked,
              totalLike: cat.totalLike + (isLiked ? -1 : 1),
            };
          }
          return cat;
        })
      );

      setCategories(updatedCategories);
    } catch (err) {
      console.error("Lỗi xử lý like:", err);
    }
  };

  return (
    <div
      className={`min-h-screen ${maxWidth}  mx-auto px-4 py-8 round bg-background`}
    >
      <div className="text-center  mb-12">
        <h1 className={`text-4xl font-bold mb-1 ${textDefault}`}>
          {t("categories.title")}
        </h1>
        <p className="text-muted-foreground text-lg mb-3 mt-2 inline-block border-b border-green-800 max-w-2xl mx-auto">
          {t("categories.explore")}{" "}
          <span className="font-bold text-green-600">{categories.length}</span>{" "}
          {t("categories.categories")}{" "}
          <span className="font-bold text-green-600">{totalPosts}</span>{" "}
          {t("categories.postsQuality")}
        </p>
        <p className="text-lg text-gray-370 dark:text-gray-300 max-w-2xl mx-auto">
          {t("categories.description")}
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
                            {category.posts ? category.posts.length : 0}{" "}
                            {t("categories.posts")}
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
                        {t("categories.featuredPosts")}
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
                            {t("categories.noPosts")}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button asChild className="w-full group mt-auto">
                        <Link href={`/categories/${category.slug}`}>
                          {t("categories.explore")} {category.name}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <div
                        key={category._id}
                        className="relative px-3 py-2 flex justify-center items-center border border-red-400 rounded-lg bg-transparent group"
                      >
                        <Heart
                          className={`w-5 h-5 cursor-pointer transition-transform group-hover:scale-125 ${
                            category.liked
                              ? "fill-red-500 text-red-500"
                              : "text-red-500"
                          }`}
                          onClick={() => handleLike(category._id)}
                        />
                        <span className="absolute text-[10px] font-semibold text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-2 shadow-md">
                          {category.totalLike}
                        </span>
                      </div>
                    </div>
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
                <div className="text-muted-foreground">
                  {" "}
                  {t("categories.category")}
                </div>
              </div>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${textDefault}`}>
                  {totalPosts}
                </div>
                <div className="text-muted-foreground">
                  {t("categories.postsCategory")}
                </div>
              </div>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${textDefault}`}>5+</div>
                <div className="text-muted-foreground">
                  {t("categories.experience")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
