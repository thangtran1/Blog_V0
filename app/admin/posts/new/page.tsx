"use client";

import { useEffect, useState } from "react";
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
import {
  Save,
  Eye,
  Upload,
  X,
  FileText,
  ImageIcon,
  Settings,
  Filter,
} from "lucide-react";
import RichTextEditor from "@/components/admin/rich-text-editor";
import { bgDefault, bgDefault2, maxWidth } from "@/styles/classNames";
import {
  callCreatePost,
  callFetchCategories,
  callFetchPostAuthor,
  ICategory,
} from "@/lib/api-services";

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
  const [formData, setFormData] = useState({
    title: "",
    introduction: "",
    status: "active",
    content: "",
    image: "",
    categoryId: "",
    isFeatured: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (status: "active" | "inactive") => {
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        status,
      };

      const response = await callCreatePost(payload);
      console.log("Danh sách bài viết đã tạo :", response.data);

      router.push("/admin/posts");
    } catch (error) {
      alert("Có lỗi xảy ra!");
      console.error(error);
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
              <div
                className={`text-3xl lg:text-4xl text-green-500 font-bold ${bgDefault} bg-clip-text `}
              >
                Tạo bài viết mới
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Viết và xuất bản bài viết mới cho blog của bạn
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="outline"
                onClick={() => handleSubmit("active")}
                disabled={isLoading}
                className="flex-1 sm:flex-none border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Xuất bản ngay
              </Button>
              <Button
                onClick={() => handleSubmit("inactive")}
                disabled={isLoading}
                className={`flex-1 sm:flex-none ${bgDefault2} hover:from-green-600 hover:to-green-700 shadow-lg`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Lưu tạm thời
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
                  <Label htmlFor="introduction" className="text-sm font-medium">
                    Tóm tắt bài viết
                  </Label>
                  <Textarea
                    id="introduction"
                    value={formData.introduction}
                    onChange={(e) =>
                      handleInputChange("introduction", e.target.value)
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
                        formData.introduction.length > 300
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.introduction.length}/300
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
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          Hoạt động
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Tạm dừng
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Danh mục</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      handleInputChange("categoryId", value)
                    }
                  >
                    <SelectTrigger className="border-gray-300 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((cat) => cat.isActive)
                        .map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

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
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) =>
                        handleInputChange("isFeatured", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* isFeatured Image */}
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
                  {formData.image ? (
                    <div className="relative group">
                      <img
                        src={
                          formData.image ||
                          "/placeholder.svg?height=200&width=400"
                        }
                        alt="Featured"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleInputChange("image", "")}
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
                            Dán link ảnh PNG, JPG, GIF - tối đa 5MB
                          </p>
                          <p className="text-xs text-gray-500">
                            Ảnh sẽ hiển thị khi nhập đúng đường dẫn
                          </p>
                        </div>

                        {/* Input để nhập link ảnh */}
                        <input
                          type="text"
                          placeholder="Dán link ảnh vào đây..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-green-500"
                          onBlur={(e) => {
                            const url = e.target.value.trim();
                            if (url && url.startsWith("http")) {
                              handleInputChange("image", url);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
