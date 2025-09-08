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
import { ICategory } from "@/lib/api-services";
import { useI18n } from "@/i18n/i18n-provider";

interface Props {
  categories: ICategory[];
  handleLike: (id: string) => void;
  maxWidth: string;
  limit?: number;
}

export default function CategorySection({
  categories,
  handleLike,
  maxWidth,
  limit,
}: Props) {
  const { t } = useI18n();
  const displayed = limit ? categories.slice(0, limit) : categories;

  return (
    <section className={`mx-auto ${maxWidth}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {displayed.map((category, index) => (
          <div
            key={index}
            className="group animate-fade-in-up rounded-md bg-gradient-to-br from-card to-muted/50 
                       dark:border-gray-700 hover:scale-105 transform transition duration-500 
                       hover:shadow-xl dark:hover:shadow-green-900"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card className="flex flex-col h-full hover:border-green-400 dark:hover:border-green-600 transition-colors duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-24 h-24 border border-green-300 dark:border-green-700 
                               rounded-2xl object-cover shadow-lg group-hover:scale-110 
                               group-hover:rotate-12 transition-all duration-300"
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

              <CardContent className="flex flex-col flex-grow space-y-4 p-5">
                <CardDescription className="leading-relaxed line-clamp-2 min-h-[2.5rem] text-sm flex-shrink-0">
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
    </section>
  );
}
