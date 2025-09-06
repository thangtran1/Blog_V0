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
import { callCreateCategories, callUpdateCategories } from "@/lib/api-services";
import { useI18n } from "@/i18n/i18n-provider";

interface CategoryFormProps {
  category?: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CategoryForm({
  category,
  onClose,
  onSuccess,
}: CategoryFormProps) {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: category?.name || "",
    content: category?.content || "",
    totalPost: category?.totalPost || 0,
    description: category?.description || "",
    image: category?.image,
    color: category?.color || "#3B82F6",
    isActive: category?.isActive ?? true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

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
        await callUpdateCategories(category._id, formData);
      } else {
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
            <CardTitle className="text-lg">
              {t("admin.categories.basicInfo")}
            </CardTitle>
            <CardDescription>
              {t("admin.categories.basicInfoDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("admin.categories.name")} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ví dụ: Frontend Development"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                {t("admin.categories.description")}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder={t("admin.categories.descriptionPlaceholder")}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">{t("admin.categories.content")}</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder={t("admin.categories.contentPlaceholder")}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalPost">
                {t("admin.categories.totalPost")}
              </Label>
              <Input
                id="totalPost"
                value={formData.totalPost}
                onChange={(e) => handleInputChange("totalPost", e.target.value)}
                placeholder={t("admin.categories.totalPostPlaceholder")}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="isActive">{t("admin.categories.isActive")}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="isActive"
                  value={
                    formData.isActive
                      ? t("admin.categories.active")
                      : t("admin.categories.inactive")
                  }
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t("admin.categories.interface")}
            </CardTitle>
            <CardDescription>
              {t("admin.categories.interfaceDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Nhập URL ảnh */}
            <div className="space-y-2">
              <Label htmlFor="image">{t("admin.categories.imageLink")}</Label>
              <Input
                id="image"
                type="url"
                value={formData.image || ""}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder={t("admin.categories.imageLinkPlaceholder")}
              />
            </div>

            {/* Xem trước ảnh */}
            <div className="space-y-2">
              <Label>{t("admin.categories.preview")}</Label>
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
                    {t("admin.categories.noImage")}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          <X className="w-4 h-4 mr-2" />
          {t("admin.categories.cancel")}
        </Button>
        <Button type="submit" disabled={isLoading} className={buttonDefault}>
          {isLoading ? (
            <div className="loading-spinner w-4 h-4 mr-2"></div>
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {category
            ? t("admin.categories.update")
            : t("admin.categories.createCategory")}
        </Button>
      </div>
    </form>
  );
}
