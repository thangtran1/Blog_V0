"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, X, Hash } from "lucide-react";
import { buttonDefault } from "@/styles/classNames";
import { Select } from "antd";
import {
  callCreateCategories,
  callCreateCategory,
  callFetchCategories,
  callUpdateCategories,
} from "@/lib/api-services";
const { Option } = Select;

interface CategoryFormProps {
  category?: any;
  onClose: () => void;
  onSuccess?: () => void;
}

const colorOptions = [
  { name: "Blue", value: "#3B82F6", bg: "bg-blue-500" },
  { name: "Green", value: "#10B981", bg: "bg-green-500" },
  { name: "Purple", value: "#8B5CF6", bg: "bg-purple-500" },
  { name: "Orange", value: "#F59E0B", bg: "bg-orange-500" },
  { name: "Red", value: "#EF4444", bg: "bg-red-500" },
  { name: "Pink", value: "#EC4899", bg: "bg-pink-500" },
  { name: "Indigo", value: "#6366F1", bg: "bg-indigo-500" },
  { name: "Teal", value: "#14B8A6", bg: "bg-teal-500" },
];

const iconOptions = [
  "🎨",
  "⚙️",
  "🚀",
  "🤖",
  "📱",
  "💻",
  "🔧",
  "📊",
  "🌐",
  "🔒",
  "📝",
  "🎯",
];

export default function CategoryForm({
  category,
  onClose,
  onSuccess,
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    content: category?.content || "",
    totalPost: category?.totalPost || 0,
    description: category?.description || "",
    image: category?.icon,
    color: category?.color || "#3B82F6",
    isActive: category?.isActive ?? true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from name
    if (field === "name" && !category) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (category) {
        // Gọi API cập nhật
        await callUpdateCategories(category._id, formData);
      } else {
        // Gọi API tạo mới
        await callCreateCategories(formData);
        alert("Tạo danh mục thành công!");
      }

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
            <CardDescription>Thông tin chính của danh mục</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên danh mục *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ví dụ: Frontend Development"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Mô tả ngắn về danh mục này..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Mô tả ngắn về danh mục này..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalPost">Tổng số bài viết</Label>
              <Input
                id="totalPost"
                value={formData.totalPost}
                onChange={(e) => handleInputChange("totalPost", e.target.value)}
                placeholder="Ví dụ: 10"
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isActive">Trạng thái danh mục</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="isActive"
                  value={formData.isActive ? "Đang hoạt động" : "Tạm dừng"}
                  disabled
                />
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleInputChange("isActive", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Giao diện</CardTitle>
            <CardDescription>Tùy chỉnh Hình ảnh</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="grid grid-cols-6 gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => handleInputChange("icon", icon)}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg hover:bg-muted transition-colors ${
                      formData.image === icon
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : "border-border"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Xem trước</Label>
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${formData.color}20` }}
                  >
                    {formData.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {formData.name || "Tên danh mục"}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {formData.description || "Mô tả danh mục"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cài đặt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Trạng thái hoạt động</Label>
              <p className="text-sm text-muted-foreground">
                Danh mục có hiển thị trên website không
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                handleInputChange("isActive", checked)
              }
            />
          </div>
        </CardContent>
      </Card> */}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          <X className="w-4 h-4 mr-2" />
          Hủy
        </Button>
        <Button type="submit" disabled={isLoading} className={buttonDefault}>
          {isLoading ? (
            <div className="loading-spinner w-4 h-4 mr-2"></div>
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {category ? "Cập nhật" : "Tạo danh mục"}
        </Button>
      </div>
    </form>
  );
}
