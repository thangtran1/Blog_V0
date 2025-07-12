"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Edit,
  Eye,
  FileText,
  FolderOpen,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import CategoryForm from "@/components/admin/category-form";
import { bgDefault2 } from "@/styles/classNames";
import {
  callDeleteCategory,
  callFetchCategories,
  ICategory,
} from "@/lib/api-services";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Popconfirm, Select } from "antd";

const COLORS = [
  "from-green-400 to-blue-500",
  "from-pink-500 to-yellow-500",
  "from-purple-500 to-indigo-500",
  "from-yellow-400 to-red-500",
  "from-teal-400 to-cyan-500",
  "from-orange-500 to-pink-500",
];

const iconToImageUrl: Record<string, string> = {
  "📁": "https://cdn-icons-png.flaticon.com/512/715/715676.png",
  "🔥": "https://cdn-icons-png.flaticon.com/512/482/482541.png",
  "🚀": "https://cdn-icons-png.flaticon.com/512/3210/3210033.png",
  "🎨": "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  "⚙️": "https://cdn-icons-png.flaticon.com/512/3524/3524659.png",
  "🤖": "https://cdn-icons-png.flaticon.com/512/4712/4712034.png",
  "📱": "https://cdn-icons-png.flaticon.com/512/545/545682.png",
  "💻": "https://cdn-icons-png.flaticon.com/512/739/739231.png",
  "🔧": "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
  "📊": "https://cdn-icons-png.flaticon.com/512/1828/1828935.png",
  "🌐": "https://cdn-icons-png.flaticon.com/512/591/591788.png",
  "🔒": "https://cdn-icons-png.flaticon.com/512/565/565547.png",
  "📝": "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
  "🎯": "https://cdn-icons-png.flaticon.com/512/1828/1828885.png",
};

export default function AdminCategories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const [isActiveFilter, setIsActiveFilter] = useState("all");

  const fetchCategories = async () => {
    try {
      const res = await callFetchCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalPosts = categories.reduce(
    (sum, cat) => sum + (cat.totalPost || 0),
    0
  );

  const filteredCategories = categories.filter((item) => {
    // filter theo name
    const matchesName = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (isActiveFilter === "all") return matchesName;
    if (isActiveFilter === "true") return matchesName && item.isActive === true;
    if (isActiveFilter === "false")
      return matchesName && item.isActive === false;

    return matchesName;
  });

  const onEdit = (category: ICategory) => {
    setEditingCategory(category);
  };

  const handleDelete = async (id: string) => {
    console.log("🚀 ~ handleDelete ~ id:", id);
    try {
      await callDeleteCategory(id);
      setCategories((prev) => prev.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FolderOpen className="w-6 h-6" />
            Quản lý danh mục
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tạo và quản lý danh mục cho bài viết của bạn
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className={bgDefault2}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo danh mục mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl ">
            <DialogHeader>
              <DialogTitle>Tạo danh mục mới</DialogTitle>
            </DialogHeader>
            <CategoryForm
              onSuccess={fetchCategories}
              onClose={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Tổng danh mục</p>
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Tổng số bài viết</p>
            <p className="text-2xl font-bold text-blue-600">{totalPosts}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 flex gap-5 items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={isActiveFilter}
            onChange={(value) => setIsActiveFilter(value)}
            style={{ width: 160 }}
          >
            <option value="all">Tất cả</option>
            <option value="true">Hoạt động</option>
            <option value="false">Không hoạt động</option>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <Card
            key={category._id}
            className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {category.image && (
              <div className="relative">
                {/* <img
                  src={}
                  alt={category.name}
                  className="w-full h-40 object-cover"
                /> */}
                <img
                  src={iconToImageUrl[category.image] || category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover"
                />

                {/* ICON EDIT + DELETE */}
                <div className="absolute top-2 right-2 flex space-x-2 z-10">
                  <button
                    onClick={() => onEdit(category)}
                    className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                  <Popconfirm
                    title="Xoá kết nối"
                    description="Bạn có chắc chắn muốn xoá kết nối này không?"
                    onConfirm={() => handleDelete(category._id)}
                    okText="Xoá"
                    cancelText="Huỷ"
                  >
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            )}

            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {category.name}
                  </h3>
                </div>

                <Badge
                  className={
                    category.isActive
                      ? "bg-green-100 border border-green-400 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 border border-gray-400 dark:bg-gray-900/20 dark:text-gray-400"
                  }
                >
                  {category.isActive ? "Hoạt động" : "Tạm dừng"}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {category.description}
              </p>

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span className="font-medium">Bài nổi bật:</span>{" "}
                  {category.content || "Chưa có nội dung nổi bật"}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>{category.totalPost || 0} bài viết</span>
                </div>
                <p>
                  Tạo ngày: {new Date(category.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={!!editingCategory}
        onOpenChange={() => setEditingCategory(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              onSuccess={fetchCategories}
              category={editingCategory}
              onClose={() => setEditingCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Không tìm thấy danh mục
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Thử thay đổi từ khóa tìm kiếm
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Tạo danh mục đầu tiên
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
