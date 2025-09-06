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
import {
  Calendar,
  Clock,
  ArrowRight,
  Code,
  Sparkles,
  Heart,
} from "lucide-react";
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
  callFetchLikedCategories,
  callFetchRecentPosts,
  callLike,
  callUnlike,
  ICategory,
  IPost,
} from "@/lib/api-services";
import { formatDateVN } from "@/lib/utils";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";
import { useI18n } from "@/i18n/i18n-provider";

export default function HomePage() {
  const { t } = useI18n();
  const texts = [
    `${t("homePage.title")} ${titleName}. ${t("homePage.description")}`,
  ];
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const [visitorId, setVisitorId] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("visitorId") || crypto.randomUUID();
      localStorage.setItem("visitorId", id);
      setVisitorId(id);
    }
  }, []);

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
    if (!visitorId) return;

    const fetchCategories = async () => {
      try {
        const [res, likedRes] = await Promise.all([
          callFetchCategories(),
          callFetchLikedCategories(visitorId),
        ]);

        const likedIds = likedRes.data;

        const sorted = res.data
          .sort((a, b) => (b.totalPost || 0) - (a.totalPost || 0))
          .slice(0, 4);

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

  useEffect(() => {
    if (!visitorId) return;

    const fetchRecent = async () => {
      setLoadingRecent(true);
      try {
        const [res, likedRes] = await Promise.all([
          callFetchRecentPosts(),
          callFetchLikedCategories(visitorId),
        ]);

        const likedPostIds = likedRes.data;

        const withLikeState = res.data.slice(0, 3).map((post) => ({
          ...post,
          liked: likedPostIds.includes(post._id),
          totalLike: post.totalLike ?? 0,
        }));

        setRecentPosts(withLikeState);
      } catch (err) {
        console.error("Lỗi fetch bài viết hoặc liked:", err);
        setRecentPosts([]);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchRecent();
  }, [visitorId]);

  const handleLikeCategories = async (categoryId: string) => {
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

  const handleLikePost = async (postId: string) => {
    try {
      const updatedPosts = await Promise.all(
        recentPosts.map(async (post) => {
          if (post._id === postId) {
            const isLiked = post.liked ?? false;

            try {
              if (isLiked) {
                await callUnlike({
                  visitorId,
                  targetId: postId,
                  type: "post",
                });
                toast.success("Đã bỏ tym bài viết thành công ❤️‍🔥");
              } else {
                await callLike({
                  visitorId,
                  targetId: postId,
                  type: "post",
                });
                toast.success("Đã tym bài viết thành công 💖");
              }
            } catch (err) {
              console.error("Gọi API like/unlike thất bại", err);
            }

            return {
              ...post,
              liked: !isLiked,
              totalLike: post.totalLike + (isLiked ? -1 : 1),
            };
          }
          return post;
        })
      );

      setRecentPosts(updatedPosts);
    } catch (err) {
      console.error("Lỗi xử lý like bài viết:", err);
    }
  };

  return (
    <>
      <section
        id="hero"
        className={`relative px-2 border border-b-green-500/20 ${bgWelcome} text-white py-5 md:py-5 lg:py-5 `}
      >
        <div
          className={`relative z-10 transition-all duration-1000 ${
            sectionsVisible.hero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mx-auto text-center">
            <div className="flex justify-center lg:mb-8 mb-4">
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
            <div className="text-4xl lg:text-6xl font-bold mb-1 leading-tight bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent animate-slide-in-up stagger-1">
              {t("homePage.title")} {titleName}!
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 text-green-100/70 italic animate-slide-in-up stagger-2">
              {t("homePage.description")}
            </p>
            <div className="flex  gap-2 justify-center animate-scale-in stagger-4">
              <Button
                asChild
                size="sm"
                className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold shadow transition duration-300"
              >
                <Link href="/posts">{t("homePage.explorePosts")} →</Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold shadow transition duration-300"
              >
                <Link href="/categories">
                  {t("homePage.exploreCategories")} →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#0c3055] text-[#ECF0F1] p-1.5">
        <Marquee speed={50} pauseOnHover={true} gradient={false}>
          {texts.map((text, idx) => (
            <span key={idx} className="mr-4">
              {text}
            </span>
          ))}
        </Marquee>
      </div>
      <div className="flex flex-col px-4 min-h-screen">
        <TrendingCarousel />

        <section id="categories" className="py-6 bg-muted/40 rounded-lg">
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
                  {t("homePage.categoriesTitle")}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {t("homePage.categoriesDescription")}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="group animate-fade-in-up rounded-md bg-gradient-to-br from-card to-muted/50  dark:border-gray-700 hover:scale-105 transform transition duration-500 hover:shadow-xl dark:hover:shadow-green-900"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="flex flex-col h-full hover:border-green-400 dark:hover:border-green-600 transition-colors duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-24 h-24 border border-green-200 dark:border-green-400 rounded-2xl object-cover shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                          />
                          <div className="flex-1">
                            <CardTitle className="text-xl group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-2">
                              {category.name}
                            </CardTitle>

                            <div className="flex items-center gap-1">
                              <Badge variant="destructive" className="text-xs">
                                {category.posts ? category.posts.length : 0}{" "}
                                {t("homePage.posts")}
                              </Badge>
                              <Badge variant="destructive" className="text-xs">
                                {category.totalLike} {t("homePage.likes")}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex flex-col flex-grow space-y-4 p-5">
                        <CardDescription className="leading-relaxed text-sm line-clamp-2 min-h-[2.5rem]">
                          {category.description}
                        </CardDescription>

                        <div className="flex gap-4">
                          <Button asChild className="w-full mt-auto">
                            <Link href={`/categories/${category.slug}`}>
                              {t("homePage.explore")} {category.name}
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
                              onClick={() => handleLikeCategories(category._id)}
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
              <div className="text-center mt-6">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="hover:scale-105 transition-transform bg-transparent border-2 border-green-500/20 hover:border-green-500"
                >
                  <Link href="/categories">
                    {t("homePage.exploreCategories")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section id="latest" className="py-6 bg-background">
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
                  {t("homePage.latestPostsTitle")}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {t("homePage.latestPostsDescription")}
                </p>
              </div>

              <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post, index) => (
                  <div
                    key={post._id}
                    className={`transition-all duration-700  ${
                      sectionsVisible.latest
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-10 scale-95"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <Card className="group card-hover-lift border-green-100 dark:border-green-900 hover:border-green-400 dark:hover:border-green-600 relative overflow-hidden">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={
                            post.image ||
                            "/placeholder.svg?height=400&width=600"
                          }
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

                        <CardDescription className="text-sm text-muted-foreground min-h-[2.5rem] line-clamp-2 overflow-hidden">
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
                              {post.readingTime < 60
                                ? `${post.readingTime} ${t(
                                    "homePage.readingTime"
                                  )}`
                                : `${Math.floor(post.readingTime / 60)} giờ ${
                                    post.readingTime % 60
                                  } ${t("homePage.readingTime")}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button asChild className="w-full group">
                            <Link href={`/posts/${post._id}`}>
                              {t("homePage.readMore")}
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                          <div
                            key={post._id}
                            className="relative px-3 py-2 flex justify-center items-center border border-red-400 rounded-lg bg-transparent group"
                          >
                            <Heart
                              className={`w-5 h-5 cursor-pointer transition-transform group-hover:scale-125 ${
                                post.liked
                                  ? "fill-red-500 text-red-500"
                                  : "text-red-500"
                              }`}
                              onClick={() => handleLikePost(post._id)}
                            />
                            <span className="absolute text-[10px] font-semibold text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-2 shadow-md">
                              {post.totalLike}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="hover:scale-105 transition-transform bg-transparent border-2 border-green-500/20 hover:border-green-500"
                >
                  <Link href="/posts">
                    {t("homePage.exploreAllPosts")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
