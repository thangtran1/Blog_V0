"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Eye, ArrowLeft, Upload, X, Hash, Tag, FileText, ImageIcon, Settings } from "lucide-react"
import Link from "next/link"
import RichTextEditor from "@/components/admin/rich-text-editor"

export default function CreatePostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

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
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (status: "draft" | "published") => {
    setIsLoading(true)

    try {
      const postData = {
        ...formData,
        status,
        tags,
        publishedAt: status === "published" ? new Date().toISOString() : formData.publishedAt,
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Post data:", postData)
      alert(`${status === "published" ? "Xuất bản" : "Lưu nháp"} bài viết thành công!`)
      router.push("/admin/posts")
    } catch (error) {
      alert("Có lỗi xảy ra!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/posts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Tạo bài viết mới</h1>
            <p className="text-muted-foreground mt-2">Viết và xuất bản bài viết mới</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            Lưu nháp
          </Button>
          <Button
            onClick={() => handleSubmit("published")}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600"
          >
            <Eye className="w-4 h-4 mr-2" />
            Xuất bản
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề bài viết *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Nhập tiêu đề bài viết..."
                  className="text-lg"
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
                    placeholder="url-bai-viet"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">URL: /posts/{formData.slug}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Tóm tắt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Tóm tắt ngắn gọn về bài viết..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">{formData.excerpt.length}/300 ký tự</p>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Nội dung bài viết</CardTitle>
              <CardDescription>Viết nội dung chính của bài viết</CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor value={formData.content} onChange={(content) => handleInputChange("content", content)} />
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt SEO</CardTitle>
              <CardDescription>Tối ưu hóa cho công cụ tìm kiếm</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="seo" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                </TabsList>
                <TabsContent value="seo" className="space-y-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      value={formData.keywords}
                      onChange={(e) => handleInputChange("keywords", e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="social" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Open Graph Title</Label>
                    <Input placeholder="Tiêu đề khi chia sẻ trên mạng xã hội..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Open Graph Description</Label>
                    <Textarea placeholder="Mô tả khi chia sẻ..." rows={2} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Cài đặt xuất bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Bản nháp</SelectItem>
                    <SelectItem value="published">Đã xuất bản</SelectItem>
                    <SelectItem value="scheduled">Lên lịch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Danh mục</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="ai">AI & Automation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === "scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Thời gian xuất bản</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    value={formData.publishedAt}
                    onChange={(e) => handleInputChange("publishedAt", e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bài viết nổi bật</Label>
                  <p className="text-xs text-muted-foreground">Hiển thị trong slider</p>
                </div>
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange("featured", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cho phép bình luận</Label>
                  <p className="text-xs text-muted-foreground">Người dùng có thể comment</p>
                </div>
                <Switch
                  checked={formData.allowComments}
                  onCheckedChange={(checked) => handleInputChange("allowComments", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Ảnh đại diện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.featuredImage ? (
                  <div className="relative">
                    <img
                      src={formData.featuredImage || "/placeholder.svg"}
                      alt="Featured"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange("featuredImage", "")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Kéo thả ảnh hoặc click để chọn</p>
                    <Button variant="outline" size="sm">
                      Chọn ảnh
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Thêm tag..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} size="sm">
                  Thêm
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
