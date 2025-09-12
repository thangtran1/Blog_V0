import { maxWidth, textDefault } from "@/styles/classNames";
import { useI18n } from "@/i18n/i18n-provider";
import CategorySection from "@/app/categories/categorySection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { callFetchCategories, ICategory } from "@/lib/api-services";
import { callFetchLikedCategories } from "@/lib/api-services";
import { callUnlike } from "@/lib/api-services";
import { callLike } from "@/lib/api-services";
import toast from "react-hot-toast";

export default function CategoriesFeature() {
  const { t } = useI18n();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

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

    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const [res, likedRes] = await Promise.all([
          callFetchCategories(),
          callFetchLikedCategories(visitorId),
        ]);

        const likedIds = likedRes.data;

        const withLikeState = res.data.slice(0, 3).map((cat) => ({
          ...cat,
          liked: likedIds.includes(cat._id),
          totalLike: cat.totalLike ?? 0,
        }));

        setCategories(withLikeState || []);
      } catch (err) {
        console.error("Lỗi fetch categories hoặc liked:", err);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
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

  return (
    <section id="categories" className="py-6 bg-muted/40 rounded-lg">
      <div className="">
        <div className={`${maxWidth} mx-auto`}>
          <div
            className={`text-center mb-6 transition-all duration-1000 ${
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
          <CategorySection
            categories={categories || []}
            handleLike={handleLikeCategories}
            maxWidth={maxWidth}
            limit={4}
          />
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
  );
}
