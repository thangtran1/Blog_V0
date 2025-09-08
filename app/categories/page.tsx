"use client";
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
import CategorySection from "./categorySection";

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
        console.error(t("categories.error"), err);
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
                toast.success(t("categories.unlikedSuccess"));
              } else {
                await callLike({
                  visitorId,
                  targetId: categoryId,
                  type: "category",
                });
                toast.success(t("categories.likedSuccess"));
              }
            } catch (err) {
              console.error(t("categories.error"), err);
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
      console.error(t("categories.error"), err);
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

      <CategorySection
        categories={categories}
        handleLike={handleLike}
        maxWidth={maxWidth}
      />

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
