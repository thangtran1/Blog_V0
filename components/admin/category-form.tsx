"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X, Hash } from "lucide-react"

interface CategoryFormProps {
  category?: any
  onClose: () => void
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
]

const iconOptions = ["🎨", "⚙️", "🚀", "🤖", "📱", "💻", "🔧", "📊", "🌐", "🔒", "📝", "🎯"]

export default function CategoryForm({ category, onClose }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    icon: category?.icon || "📁",
    color: category?.color || "#3B82F6",
    parentId: category?.parentId || "0", // Updated default value to be a non-empty string
    isActive: category?.isActive ?? true,
    metaTitle: category?.metaTitle || "",
    metaDescription: category?.metaDescription || "",
    keywords: category?.keywords || "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from name
    if (field === "name" && !category) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Category data:", formData)
      alert(category ? "Cập nhật danh mục thành công!" : "Tạo danh mục thành công!")
      onClose()
    } catch (error) {
      alert("Có lỗi xảy ra!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
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
              <Label htmlFor="slug">Slug *</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="frontend-development"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">URL: /categories/{formData.slug}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Mô tả ngắn về danh mục này..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Danh mục cha</Label>
              <Select value={formData.parentId} onValueChange={(value) => handleInputChange("parentId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục cha (tùy chọn)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Không có danh mục cha</SelectItem> {/* Updated value prop */}
                  <SelectItem value="1">Frontend</SelectItem>
                  <SelectItem value="2">Backend</SelectItem>
                  <SelectItem value="3">DevOps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Giao diện</CardTitle>
            <CardDescription>Tùy chỉnh icon và màu sắc</CardDescription>
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
                      formData.icon === icon ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-border"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Màu chủ đề</Label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleInputChange("color", color.value)}
                    className={`flex items-center gap-2 p-2 rounded-lg border-2 hover:bg-muted transition-colors ${
                      formData.color === color.value
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : "border-border"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${color.bg}`}></div>
                    <span className="text-xs">{color.name}</span>
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
                    <h3 className="font-medium">{formData.name || "Tên danh mục"}</h3>
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

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cài đặt SEO</CardTitle>
          <CardDescription>Tối ưu hóa cho công cụ tìm kiếm</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle}
                onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                placeholder="Tiêu đề SEO..."
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground">{formData.metaTitle.length}/60 ký tự</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => handleInputChange("keywords", e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => handleInputChange("metaDescription", e.target.value)}
              placeholder="Mô tả SEO..."
              rows={2}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">{formData.metaDescription.length}/160 ký tự</p>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cài đặt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Trạng thái hoạt động</Label>
              <p className="text-sm text-muted-foreground">Danh mục có hiển thị trên website không</p>
            </div>
            <Switch checked={formData.isActive} onCheckedChange={(checked) => handleInputChange("isActive", checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          <X className="w-4 h-4 mr-2" />
          Hủy
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600">
          {isLoading ? <div className="loading-spinner w-4 h-4 mr-2"></div> : <Save className="w-4 h-4 mr-2" />}
          {category ? "Cập nhật" : "Tạo danh mục"}
        </Button>
      </div>
    </form>
  )
}
