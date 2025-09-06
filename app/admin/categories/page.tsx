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
  FileText,
  FolderOpen,
  Pencil,
  Plus,
  Search,
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
import { Popconfirm, Select } from "antd";
import { useI18n } from "@/i18n/i18n-provider";
const { Option } = Select;

export default function AdminCategories() {
  const { t } = useI18n();
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
    try {
      await callDeleteCategory(id);
      setCategories((prev) => prev.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 truncate">
            <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            {t("admin.categories.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base truncate">
            {t("admin.categories.description")}
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className={`${bgDefault2} w-full md:w-auto flex items-center justify-center`}
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("admin.categories.createCategory")}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full rounded-lg md:max-w-2xl max-h-[90vh] max-w-[90%] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("admin.categories.createCategory")}</DialogTitle>
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
            <p className="text-sm text-gray-500">
              {t("admin.categories.totalCategories")}
            </p>
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">
              {t("admin.categories.totalPosts")}
            </p>
            <p className="text-2xl font-bold text-blue-600">{totalPosts}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 flex gap-5 items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t("admin.categories.searchCategory")}
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
            <Option value="all">{t("admin.categories.all")}</Option>
            <Option value="true">{t("admin.categories.active")}</Option>
            <Option value="false">{t("admin.categories.inactive")}</Option>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <Card
            key={category._id}
            className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-40 bg-gray-100 rounded overflow-hidden">
              {category.image ? (
                <img
                  src={category?.image}
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                  {t("admin.categories.noImage")}
                </div>
              )}

              <div className="absolute top-2 right-2 flex space-x-2 z-10">
                <button
                  onClick={() => onEdit(category)}
                  className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
                >
                  <Pencil className="w-4 h-4 text-gray-600" />
                </button>
                <Popconfirm
                  title={t("admin.categories.deleteCategory")}
                  description={t("admin.categories.deleteCategoryDescription")}
                  onConfirm={() => handleDelete(category._id)}
                  okText={t("admin.categories.delete")}
                  cancelText={t("admin.categories.cancel")}
                >
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </Popconfirm>
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg min-h-[1.5rem] w-28 text-blue-600 font-bold line-clamp-1">
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

              <p className="text-sm text-gray-600 min-h-[2.5rem] dark:text-gray-400 line-clamp-2">
                {category.description}
              </p>

              <div>
                <p className="text-xs min-h-[2rem] line-clamp-2 text-gray-500 dark:text-gray-400 mb-1">
                  <span className="font-medium text-blue-600">
                    {t("admin.categories.featured")}:
                  </span>{" "}
                  {category.content || "Chưa có nội dung nổi bật"}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>
                    {category.totalPost || 0} {t("admin.categories.posts")}
                  </span>
                </div>
                <p>
                  {t("admin.categories.createdAt")}:{" "}
                  {new Date(category.createdAt).toLocaleDateString()}
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
        <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 rounded-lg">
          <DialogHeader>
            <DialogTitle>
              <div className="flex">{t("admin.categories.editCategory")}</div>
            </DialogTitle>
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
              {t("admin.categories.noCategoryFound")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t("admin.categories.tryChangeSearch")}
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              {t("admin.categories.createCategoryFirst")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
