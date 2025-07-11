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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FolderOpen,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  Eye,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import CategoryForm from "@/components/admin/category-form";
import { bgDefault2 } from "@/styles/classNames";
import { callFetchCategories } from "@/lib/api-services";

// Mock data

const COLORS = [
  "from-green-400 to-blue-500",
  "from-pink-500 to-yellow-500",
  "from-purple-500 to-indigo-500",
  "from-yellow-400 to-red-500",
  "from-teal-400 to-cyan-500",
  "from-orange-500 to-pink-500",
];
const stats = [
  { title: "Tổng danh mục", value: "8", color: "from-blue-500 to-blue-600" },
  { title: "Đang hoạt động", value: "6", color: "from-green-500 to-green-600" },
  { title: "Tạm dừng", value: "2", color: "from-yellow-500 to-yellow-600" },
  { title: "Bài viết", value: "65", color: "from-purple-500 to-purple-600" },
];

export default function AdminCategories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriess, setCategories] = useState<any[]>([]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // const filteredCategories = categories.filter(
  //   (category) =>
  //     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     category.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await callFetchCategories();

        // Gán trạng thái fake: index chẵn -> hoạt động, lẻ -> tạm dừng
        const withStatus = res.data.map((cat: any, index: number) => ({
          ...cat,
          status: index % 2 === 0 ? "Hoạt động" : "Tạm dừng",
        }));

        setCategories(withStatus);
      } catch (err) {
        console.error("Lỗi fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);
  const totalActive = categoriess.filter(
    (c) => c.status === "Hoạt động"
  ).length;
  const totalInactive = categoriess.filter(
    (c) => c.status === "Tạm dừng"
  ).length;
  const totalPosts = categoriess.reduce(
    (sum, cat) => sum + (cat.totalPost || 0),
    0
  );
  return (
    <div className="space-y-6">
      {/* Header */}
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
            <CategoryForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Tổng danh mục</p>
            <p className="text-2xl font-bold">{categoriess.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Hoạt động</p>
            <p className="text-2xl font-bold text-green-600">{totalActive}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Tạm dừng</p>
            <p className="text-2xl font-bold text-yellow-500">
              {totalInactive}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Tổng số bài viết</p>
            <p className="text-2xl font-bold text-blue-600">{totalPosts}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Xem bài viết
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setEditingCategory(category)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      category.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                    }
                  >
                    {category.isActive ? "Hoạt động" : "Tạm dừng"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <FileText className="w-4 h-4" />
                  {category.postCount} bài viết
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500">
                  Tạo ngày: {category.createdAt}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}

      {/* Edit Dialog */}
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
              category={editingCategory}
              onClose={() => setEditingCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* {filteredCategories.length === 0 && (
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
      )} */}
    </div>
  );
}
