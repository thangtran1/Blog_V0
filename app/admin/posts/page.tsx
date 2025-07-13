"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bgDefault2 } from "@/styles/classNames";
import {
  callDeletePost,
  callFetchPostAuthor,
  IAllPost,
} from "@/lib/api-services";
import { Popconfirm, Select } from "antd";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditPostForm from "@/components/admin/edit-post-form";
const { Option } = Select;

export default function AdminPosts() {
  const [posts, setPosts] = useState<IAllPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [editingPost, setEditingPost] = useState<IAllPost | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await callFetchPostAuthor();
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi fetch categories:", err);
    }
  };

  const totalPosts = posts.length;

  const activePosts = posts.filter((post) => post.status === "active").length;

  const inactivePosts = posts.filter(
    (post) => post.status === "inactive"
  ).length;

  const stats = [
    {
      title: "Tổng bài viết",
      value: totalPosts,
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Bài viết đang hoạt động",
      value: activePosts,
      color: "from-green-400 to-green-600",
    },
    {
      title: "Bài viết tạm dừng",
      value: inactivePosts,
      color: "from-red-400 to-red-600",
    },
  ];
  useEffect(() => {
    fetchPosts();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 border border-green-400 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Hoạt động
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-red-100 border border-red-400 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            Không hoạt động
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const onEdit = (postsId: IAllPost) => {
    setEditingPost(postsId);
  };

  const handleDelete = async (id: string) => {
    try {
      await callDeletePost(id);
      setPosts((prev) => prev.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Quản lý bài viết
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tạo, chỉnh sửa và quản lý tất cả bài viết của bạn
          </p>
        </div>
        <Button asChild className={bgDefault2}>
          <Link href="/admin/posts/new">
            <Plus className="w-4 h-4 mr-2" />
            Tạo bài viết mới
          </Link>
        </Button>
      </div>

      {/* Stats (giữ nguyên) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} opacity-20`}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm bài viết theo tiêu đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Card>
              <Select
                value={filterStatus}
                onChange={(value) => setFilterStatus(value)}
                style={{ width: 160 }}
              >
                <Option value="all">Tất cả</Option>
                <Option value="active">Hoạt động</Option>
                <Option value="inactive">Không hoạt động</Option>
              </Select>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Không tìm thấy bài viết
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
              <Button asChild>
                <Link href="/admin/posts/new">Tạo bài viết đầu tiên</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card
              key={post._id}
              className="hover:shadow-lg  transition-shadow duration-200"
            >
              <CardContent className="p-0">
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-800 rounded-t-lg overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-2 right-2 flex space-x-2 z-10">
                    <button
                      onClick={() => onEdit(post)}
                      className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <Popconfirm
                      title="Xoá bài viết"
                      description="Bạn có chắc chắn muốn xoá bài viết này không?"
                      onConfirm={() => handleDelete(post._id)}
                      okText="Xoá"
                      cancelText="Huỷ"
                    >
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {getStatusBadge(post.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem trước
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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

                  <h3 className="font-semibold capitalize  text-gray-900 dark:text-gray-100 mb-2 line-clamp-1 min-h-[1.5rem]">
                    {post.title}
                  </h3>
                  <div className="py-5">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {post.introduction}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Admin
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt || "").toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />0 có view OK
                      </span>
                      <span>10 comments</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <Badge variant="secondary" className="text-xs">
                      {post.category?.name}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <Dialog open={!!editingPost} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 rounded-lg">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <EditPostForm
              onSuccess={() => {
                callFetchPostAuthor().then((res) => {
                  setPosts(res.data);
                });
                setEditingPost(null);
              }}
              posts={editingPost}
              onClose={() => setEditingPost(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
