"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/i18n/i18n-provider";
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
import { ArrowRight, Calendar, Clock, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { buttonDefault, maxWidth, textDefault } from "@/styles/classNames";

export default function CategoriesNew() {
  const { t } = useI18n();
  const [, setCategories] = useState<ICategory[]>([]);
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
          callFetchRecentPosts(4),
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
        console.error("Lỗi fetch bài viết:", err);
        setRecentPosts([]);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchRecent();
  }, [visitorId]);

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
    <section id="latest" className="py-6 bg-background">
      <div className="">
        <div className={`${maxWidth} mx-auto `}>
          <div
            className={`text-center mb-6 transition-all duration-1000 ${
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
                        post.image || "/placeholder.svg?height=400&width=600"
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
                            ? `${post.readingTime} ${t("homePage.readingTime")}`
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
  );
}
