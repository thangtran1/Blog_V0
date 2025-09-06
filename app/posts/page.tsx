"use client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Search, Filter, Heart } from "lucide-react";
import { maxWidth, textDefault } from "@/styles/classNames";
import {
  callFetchCategories,
  callFetchLikedCategories,
  callFetchPostAuthor,
  callFetchRecentPosts,
  callLike,
  callUnlike,
  IAllPost,
  ICategory,
  IPost,
} from "@/lib/api-services";
import { useEffect, useState } from "react";
import { formatDateVN } from "@/lib/utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useI18n } from "@/i18n/i18n-provider";

export default function PostsPage() {
  const { t } = useI18n();
  const [recentPosts, setRecentPosts] = useState<IPost[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [allPosts, setAllPosts] = useState<IAllPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IAllPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visitorId, setVisitorId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("visitorId") || crypto.randomUUID();
    localStorage.setItem("visitorId", id);
    setVisitorId(id);
  }, []);

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

  useEffect(() => {
    if (!visitorId) return;

    const fetchData = async () => {
      try {
        const [postRes, catRes, likedRes] = await Promise.all([
          callFetchPostAuthor(),
          callFetchCategories(),
          callFetchLikedCategories(visitorId), // 👈 thêm API này
        ]);

        const likedPostIds = likedRes.data; // mảng ID đã tym

        const postsWithLike = postRes.data.map((post: IAllPost) => ({
          ...post,
          liked: likedPostIds.includes(post._id) ? 1 : 0,
          totalLike: post.totalLike ?? 0,
        }));

        setAllPosts(postsWithLike);
        setFilteredPosts(postsWithLike);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Lỗi fetch post/cat/liked:", err);
      }
    };

    fetchData();
  }, [visitorId]);

  useEffect(() => {
    let filtered = allPosts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (post) => post.category?._id === selectedCategory
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [allPosts, selectedCategory, searchTerm]);
  const pathname = usePathname();
  const currentId = pathname?.split("/").pop();

  const handleLikePost = async (postId: string) => {
    try {
      const updatedPosts = await Promise.all(
        filteredPosts.map(async (post) => {
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
              liked: isLiked ? 0 : 1,
              totalLike: post.totalLike + (isLiked ? -1 : 1),
            };
          }
          return post;
        })
      );

      setFilteredPosts(updatedPosts);
    } catch (err) {
      console.error("Lỗi xử lý like bài viết:", err);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className={`${maxWidth} mx-auto `}>
        <div className="text-center  mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${textDefault}`}>
            {t("allPosts.title")}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("allPosts.description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <Card className="border-green-200 dark:border-green-800 bg-card/50 backdrop-blur-sm shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold  flex items-center gap-2">
                    📚 {t("allPosts.recentPosts")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {loadingRecent && (
                    <div className="p-4 text-sm text-muted-foreground">
                      {t("allPosts.loadingRecentPosts")}
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
                          <div className="px-5 py-4 border-b dark:border-green-900 border-green-200">
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
                      {t("allPosts.noRecentPosts")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={t("allPosts.searchPlaceholder")}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t("allPosts.allCategories")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("allPosts.allCategories")}
                  </SelectItem>
                  {categories
                    .filter((cat) => cat.isActive)
                    .map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
              >
                {t("allPosts.reset")}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredPosts.map((post) => (
                <Card
                  key={post._id}
                  className="group hover:shadow-xl transition-all duration-300 border-green-100 dark:border-green-900"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={
                        post.image ||
                        "/placeholder.svg?height=400&width=600?height=400&width=600"
                      }
                      alt="Ảnh đẹp"
                      width={400}
                      height={200}
                      className="w-full max-h-48 h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600 text-white">
                        {post.category.name}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 min-w-[2.5rem]   capitalize  group-hover:text-green-600 transition-colors">
                      <Link href={`/posts/${post._id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.introduction}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDateVN(post.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime < 60
                            ? `${post.readingTime} ${t("allPosts.readingTime")}`
                            : `${Math.floor(post.readingTime / 60)} giờ ${
                                post.readingTime % 60
                              } ${t("allPosts.readingTime")}`}
                        </div>
                      </div>
                      <div
                        key={post._id}
                        className="relative px-3 py-2 flex justify-center items-center border border-red-400 rounded-lg bg-transparent group"
                      >
                        <Heart
                          className={`w-5 h-5 cursor-pointer transition-transform group-hover:scale-125 ${
                            post.liked
                              ? "text-red-500 fill-current"
                              : "text-red-500"
                          }`}
                          fill={post.liked ? "currentColor" : "none"}
                          onClick={() => handleLikePost(post._id)}
                        />
                        <span className="absolute text-[10px] font-semibold text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-2 shadow-md">
                          {post.totalLike}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
