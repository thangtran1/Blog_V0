"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Hash } from "lucide-react";
import { buttonDefault } from "@/styles/classNames";

interface TagFormProps {
  tag?: any;
  onClose: () => void;
}

const colorOptions = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
  "#F97316",
  "#84CC16",
];

export default function TagForm({ tag, onClose }: TagFormProps) {
  const [formData, setFormData] = useState({
    name: tag?.name || "",
    slug: tag?.slug || "",
    description: tag?.description || "",
    color: tag?.color || "#3B82F6",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from name
    if (field === "name" && !tag) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Tag data:", formData);
      alert(tag ? "Cập nhật tag thành công!" : "Tạo tag thành công!");
      onClose();
    } catch (error) {
      alert("Có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Tên tag *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Ví dụ: React"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug *</Label>
        <div className="relative">
          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => handleInputChange("slug", e.target.value)}
            placeholder="react"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Mô tả ngắn về tag này..."
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label>Màu sắc</Label>
        <div className="flex gap-2 flex-wrap">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleInputChange("color", color)}
              className={`w-8 h-8 rounded-full border-2 ${
                formData.color === color ? "border-foreground" : "border-border"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label>Xem trước</Label>
        <div className="flex items-center gap-2 p-2 border rounded">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: formData.color }}
          ></div>
          <span className="font-medium">{formData.name || "Tên tag"}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t">
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
          {tag ? "Cập nhật" : "Tạo tag"}
        </Button>
      </div>
    </form>
  );
}
