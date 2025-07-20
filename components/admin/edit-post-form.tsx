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
import { Save, X } from "lucide-react";
import { buttonDefault } from "@/styles/classNames";
import RichTextEditor from "./rich-text-editor";
import { callUpdatePosts } from "@/lib/api-services";
import { message } from "antd";

interface PostsFormProps {
  posts?: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditPostForm({
  posts,
  onClose,
  onSuccess,
}: PostsFormProps) {
  const [formData, setFormData] = useState({
    content: posts?.content || "",
    image: posts?.image,
    introduction: posts?.introduction || "",
    isFeatured: posts?.isFeatured ?? true,
    status: posts?.status || "active",
    title: posts?.title || "",
    categorytId: posts.category.name || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "name" && !posts) {
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
      if (posts) {
        await callUpdatePosts(posts._id, formData);
        message.success("Cập nhật thành công!");
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
            <CardDescription>Thông tin của bài viết</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề bài viết</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ví dụ: Frontend Development"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="introduction">Tóm tắt bài viết</Label>
              <Textarea
                id="introduction"
                value={formData.introduction}
                onChange={(e) =>
                  handleInputChange("introduction", e.target.value)
                }
                placeholder="Tóm tắt sơ lược về bài viết này..."
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isFeatured">Bài viết nổi bật</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="isFeatured"
                  value={formData.isFeatured ? "Nổi bật" : "Không nổi bật"}
                  disabled
                />
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    handleInputChange("isFeatured", checked)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái bài viết</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="status"
                  value={
                    formData.status === "active" ? "Hoạt động" : "Tạm dừng"
                  }
                  disabled
                />
                <Switch
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) =>
                    handleInputChange("status", checked ? "active" : "inactive")
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Giao diện</CardTitle>
            <CardDescription>Tùy chỉnh hình ảnh</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Link ảnh</Label>
              <Input
                id="image"
                type="url"
                value={formData.image || ""}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="Dán URL ảnh hoặc chọn ảnh từ thư viện..."
              />
            </div>

            <div className="space-y-2">
              <Label>Xem trước</Label>
              <div className="p-4 border rounded-lg bg-muted/50">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center text-gray-400 h-40">
                    Chưa có ảnh
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="categorytId">Danh mục</Label>
              <Input
                id="categorytId"
                value={formData.categorytId}
                onChange={(e) =>
                  handleInputChange("categorytId", e.target.value)
                }
                disabled
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Nội dung bài viết</CardTitle>
          <CardDescription>Soạn thảo nội dung chi tiết ở đây</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <RichTextEditor
              value={formData.content}
              onChange={(content) => handleInputChange("content", content)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 border-t pt-4">
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
          Cập nhật
        </Button>
      </div>
    </form>
  );
}
