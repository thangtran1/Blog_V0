"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Eye,
  Upload,
  X,
  Hash,
  Tag,
  FileText,
  ImageIcon,
  Settings,
  Calendar,
  Globe,
} from "lucide-react";
import RichTextEditor from "@/components/admin/rich-text-editor";
import {
  bgDefault,
  bgDefault2,
  buttonDefault,
  maxWidth,
} from "@/styles/classNames";

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "",
    status: "draft",
    publishedAt: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    allowComments: true,
    featured: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (status: "draft" | "published") => {
    setIsLoading(true);

    try {
      const postData = {
        ...formData,
        status,
        tags,
        publishedAt:
          status === "published"
            ? new Date().toISOString()
            : formData.publishedAt,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Post data:", postData);
      alert(
        `${
          status === "published" ? "Xuất bản" : "Lưu nháp"
        } bài viết thành công!`
      );
      router.push("/admin/posts");
    } catch (error) {
      alert("Có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className={`${maxWidth} mx-auto p-4 lg:p-6 space-y-6`}>
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1
                className={`text-3xl lg:text-4xl font-bold ${bgDefault} bg-clip-text text-transparent`}
              >
                Tạo bài viết mới
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Viết và xuất bản bài viết mới cho blog của bạn
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="outline"
                onClick={() => handleSubmit("draft")}
                disabled={isLoading}
                className="flex-1 sm:flex-none border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Lưu nháp
              </Button>
              <Button
                onClick={() => handleSubmit("published")}
                disabled={isLoading}
                className={`flex-1 sm:flex-none ${bgDefault2} hover:from-green-600 hover:to-green-700 shadow-lg`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Xuất bản ngay
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  Thông tin cơ bản
                </CardTitle>
                <CardDescription>
                  Nhập thông tin chính của bài viết
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Tiêu đề bài viết *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                    className="text-lg h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-sm font-medium">
                    URL Slug *
                  </Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        handleInputChange("slug", e.target.value)
                      }
                      placeholder="url-bai-viet"
                      className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Globe className="w-3 h-3" />
                    <span>URL: /posts/{formData.slug || "url-bai-viet"}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-sm font-medium">
                    Tóm tắt bài viết
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    placeholder="Viết tóm tắt ngắn gọn và hấp dẫn về bài viết..."
                    rows={4}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      Tóm tắt giúp người đọc hiểu nhanh nội dung
                    </span>
                    <span
                      className={`${
                        formData.excerpt.length > 300
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.excerpt.length}/300
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  Nội dung bài viết
                </CardTitle>
                <CardDescription>
                  Viết nội dung chính của bài viết với Markdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => handleInputChange("content", content)}
                />
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  Tối ưu SEO
                </CardTitle>
                <CardDescription>
                  Cải thiện khả năng tìm kiếm của bài viết
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="seo" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="seo"
                      className="flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      SEO
                    </TabsTrigger>
                    <TabsTrigger
                      value="social"
                      className="flex items-center gap-2"
                    >
                      <Hash className="w-4 h-4" />
                      Social Media
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="seo" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        value={formData.metaTitle}
                        onChange={(e) =>
                          handleInputChange("metaTitle", e.target.value)
                        }
                        placeholder="Tiêu đề SEO tối ưu..."
                        maxLength={60}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">
                          Nên từ 50-60 ký tự
                        </span>
                        <span
                          className={`${
                            formData.metaTitle.length > 60
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {formData.metaTitle.length}/60
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) =>
                          handleInputChange("metaDescription", e.target.value)
                        }
                        placeholder="Mô tả ngắn gọn về bài viết cho search engine..."
                        rows={3}
                        maxLength={160}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
                      />
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">
                          Nên từ 150-160 ký tự
                        </span>
                        <span
                          className={`${
                            formData.metaDescription.length > 160
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {formData.metaDescription.length}/160
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        value={formData.keywords}
                        onChange={(e) =>
                          handleInputChange("keywords", e.target.value)
                        }
                        placeholder="javascript, react, nextjs, tutorial"
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                      <p className="text-xs text-gray-500">
                        Phân cách bằng dấu phẩy, tối đa 10 keywords
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="social" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Open Graph Title</Label>
                      <Input
                        placeholder="Tiêu đề khi chia sẻ trên Facebook, Twitter..."
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Open Graph Description</Label>
                      <Textarea
                        placeholder="Mô tả khi chia sẻ trên mạng xã hội..."
                        rows={3}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div
                    className={`w-7 h-7 ${bgDefault2} rounded-lg flex items-center justify-center`}
                  >
                    <Settings className="w-3.5 h-3.5 text-white" />
                  </div>
                  Cài đặt xuất bản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          Bản nháp
                        </div>
                      </SelectItem>
                      <SelectItem value="published">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Đã xuất bản
                        </div>
                      </SelectItem>
                      <SelectItem value="scheduled">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Lên lịch
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Danh mục</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">🎨 Frontend</SelectItem>
                      <SelectItem value="backend">⚙️ Backend</SelectItem>
                      <SelectItem value="devops">🚀 DevOps</SelectItem>
                      <SelectItem value="ai">🤖 AI & Automation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.status === "scheduled" && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="publishedAt"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Thời gian xuất bản
                    </Label>
                    <Input
                      id="publishedAt"
                      type="datetime-local"
                      value={formData.publishedAt}
                      onChange={(e) =>
                        handleInputChange("publishedAt", e.target.value)
                      }
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        Bài viết nổi bật
                      </Label>
                      <p className="text-xs text-gray-500">
                        Hiển thị trong slider trang chủ
                      </p>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        handleInputChange("featured", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        Cho phép bình luận
                      </Label>
                      <p className="text-xs text-gray-500">
                        Người dùng có thể comment
                      </p>
                    </div>
                    <Switch
                      checked={formData.allowComments}
                      onCheckedChange={(checked) =>
                        handleInputChange("allowComments", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-7 h-7 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  Ảnh đại diện
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.featuredImage ? (
                    <div className="relative group">
                      <img
                        src={
                          formData.featuredImage ||
                          "/placeholder.svg?height=200&width=400"
                        }
                        alt="Featured"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleInputChange("featuredImage", "")}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Xóa ảnh
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                            Tải ảnh lên
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF tối đa 5MB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 hover:border-green-400 bg-transparent"
                        >
                          Chọn ảnh
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-7 h-7 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Tag className="w-3.5 h-3.5 text-white" />
                  </div>
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Thêm tag..."
                    className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button onClick={addTag} size="sm" className={buttonDefault}>
                    Thêm
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tags đã thêm:</Label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="font-medium mb-1">💡 Gợi ý tags:</p>
                  <p>
                    javascript, react, nextjs, tutorial, frontend, backend, tips
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
