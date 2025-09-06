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
import { useI18n } from "@/i18n/i18n-provider";

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
  const { t } = useI18n();
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
        message.success(t("admin.posts.updateSuccess"));
      }
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Lỗi:", error);
      alert(t("admin.posts.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t("admin.posts.basicInfo")}
            </CardTitle>
            <CardDescription>
              {t("admin.posts.basicInfoDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t("admin.posts.title2")}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ví dụ: Frontend Development"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="introduction">{t("admin.posts.summary")}</Label>
              <Textarea
                id="introduction"
                value={formData.introduction}
                onChange={(e) =>
                  handleInputChange("introduction", e.target.value)
                }
                placeholder={t("admin.posts.summaryDescription")}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isFeatured">{t("admin.posts.isFeatured")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="isFeatured"
                  value={
                    formData.isFeatured
                      ? t("admin.posts.featured")
                      : t("admin.posts.notFeatured")
                  }
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
              <Label htmlFor="status">{t("admin.posts.status")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="status"
                  value={
                    formData.status === "active"
                      ? t("admin.posts.active")
                      : t("admin.posts.inactive")
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
            <CardTitle className="text-lg">
              {t("admin.posts.interface")}
            </CardTitle>
            <CardDescription>
              {t("admin.posts.interfaceDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">{t("admin.posts.imageLink")}</Label>
              <Input
                id="image"
                type="url"
                value={formData.image || ""}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder={t("admin.posts.imageLinkPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label>{t("admin.posts.preview")}</Label>
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
                    {t("admin.posts.noImage")}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="categorytId">{t("admin.posts.category")}</Label>
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
          <CardTitle className="text-lg">{t("admin.posts.content")}</CardTitle>
          <CardDescription>
            {t("admin.posts.contentDescription")}
          </CardDescription>
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
          {t("admin.posts.cancel")}
        </Button>
        <Button type="submit" disabled={isLoading} className={buttonDefault}>
          {isLoading ? (
            <div className="loading-spinner w-4 h-4 mr-2"></div>
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {t("admin.posts.update")}
        </Button>
      </div>
    </form>
  );
}
