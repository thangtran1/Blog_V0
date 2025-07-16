"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Check,
  X,
  Eye,
  MessageSquare,
  Clock,
  AlertCircle,
} from "lucide-react";

const comments = [
  {
    id: 1,
    content: "Bài viết rất hay và chi tiết! Cảm ơn tác giả đã chia sẻ.",
    author: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    post: "Elasticsearch Toàn Tập: Search Engine Hiện Đại",
    status: "pending",
    createdAt: "2025-01-08T10:30:00Z",
    likes: 0,
  },
  {
    id: 2,
    content: "Mình có thể áp dụng được ngay vào dự án. Thanks!",
    author: "Trần Thị B",
    email: "tranthib@email.com",
    post: "API Gateway với Kong - Microservices",
    status: "approved",
    createdAt: "2025-01-07T15:20:00Z",
    likes: 3,
  },
  {
    id: 3,
    content: "Có thể hướng dẫn chi tiết hơn về phần deployment không ạ?",
    author: "Lê Văn C",
    email: "levanc@email.com",
    post: "Micro Frontend Architecture",
    status: "approved",
    createdAt: "2025-01-06T09:15:00Z",
    likes: 1,
  },
  {
    id: 4,
    content: "Spam content here...",
    author: "Spammer",
    email: "spam@spam.com",
    post: "Elasticsearch Toàn Tập",
    status: "rejected",
    createdAt: "2025-01-05T14:45:00Z",
    likes: 0,
  },
];

export default function AdminCommentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || comment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (commentId: number) => {
    console.log("Approve comment:", commentId);
    alert("Đã duyệt comment!");
  };

  const handleReject = (commentId: number) => {
    console.log("Reject comment:", commentId);
    alert("Đã từ chối comment!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Đã duyệt
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Chờ duyệt
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Từ chối
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold">Quản lý Comments</h1>
        <p className="text-muted-foreground mt-2">
          Duyệt và quản lý bình luận từ người dùng
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="animate-fade-in-up stagger-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comments.length}</div>
            <p className="text-xs text-muted-foreground">+12 hôm nay</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up stagger-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {comments.filter((c) => c.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Cần xem xét</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up stagger-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã duyệt</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {comments.filter((c) => c.status === "approved").length}
            </div>
            <p className="text-xs text-muted-foreground">Hiển thị công khai</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up stagger-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Từ chối</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {comments.filter((c) => c.status === "rejected").length}
            </div>
            <p className="text-xs text-muted-foreground">Spam/Vi phạm</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Từ chối</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách comments ({filteredComments.length})</CardTitle>
          <CardDescription>Quản lý tất cả bình luận trên blog</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nội dung</TableHead>
                <TableHead>Tác giả</TableHead>
                <TableHead>Bài viết</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.map((comment) => (
                <TableRow key={comment.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="max-w-md">
                      <p className="line-clamp-2 text-sm">{comment.content}</p>
                      {comment.likes > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          ❤️ {comment.likes} likes
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {comment.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="line-clamp-1 text-sm">{comment.post}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(comment.status)}</TableCell>
                  <TableCell>
                    <p className="text-sm">
                      {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleTimeString("vi-VN")}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        {comment.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleApprove(comment.id)}
                              className="text-green-600"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Duyệt
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleReject(comment.id)}
                              className="text-red-600"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Từ chối
                            </DropdownMenuItem>
                          </>
                        )}
                        {comment.status === "approved" && (
                          <DropdownMenuItem
                            onClick={() => handleReject(comment.id)}
                            className="text-red-600"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Ẩn comment
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
