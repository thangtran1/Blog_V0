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
import { useI18n } from "@/i18n/i18n-provider";

export default function AdminCommentsPage() {
  const { t } = useI18n();
  const comments = [
    {
      id: 1,
      content: t("admin.comments.comment1"),
      author: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      post: t("admin.comments.post1"),
      status: "pending",
      createdAt: "2025-01-08T10:30:00Z",
      likes: 0,
    },
    {
      id: 2,
      content: t("admin.comments.comment2"),
      author: "Trần Thị B",
      email: "tranthib@email.com",
      post: t("admin.comments.post2"),
      status: "approved",
      createdAt: "2025-01-07T15:20:00Z",
      likes: 3,
    },
    {
      id: 3,
      content: t("admin.comments.comment3"),
      author: "Lê Văn C",
      email: "levanc@email.com",
      post: t("admin.comments.post3"),
      status: "approved",
      createdAt: "2025-01-06T09:15:00Z",
      likes: 1,
    },
    {
      id: 4,
      content: t("admin.comments.comment4"),
      author: "Spammer",
      email: "spam@spam.com",
      post: t("admin.comments.post4"),
      status: "rejected",
      createdAt: "2025-01-05T14:45:00Z",
      likes: 0,
    },
  ];
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
  };

  const handleReject = (commentId: number) => {
    console.log("Reject comment:", commentId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {t("admin.comments.approved")}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            {t("admin.comments.pending")}
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {t("admin.comments.rejected")}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold">{t("admin.comments.title")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("admin.comments.description1")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="animate-fade-in-up stagger-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.comments.totalComments")}
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comments.length}</div>
            <p className="text-xs text-muted-foreground">
              {t("admin.comments.today")}
            </p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up stagger-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.comments.pending")}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {comments.filter((c) => c.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("admin.comments.needReview")}
            </p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up stagger-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.comments.approved")}
            </CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {comments.filter((c) => c.status === "approved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("admin.comments.publicDisplay")}
            </p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up stagger-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.comments.rejected")}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {comments.filter((c) => c.status === "rejected").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("admin.comments.spamViolation")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("admin.comments.filter")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t("admin.comments.searchComments")}
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
              <option value="all">{t("admin.comments.allStatus")}</option>
              <option value="pending">{t("admin.comments.pending")}</option>
              <option value="approved">{t("admin.comments.approved")}</option>
              <option value="rejected">{t("admin.comments.rejected")}</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {t("admin.comments.listComments")} ({filteredComments.length})
          </CardTitle>
          <CardDescription> {t("admin.comments.description2")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("admin.comments.content")}</TableHead>
                <TableHead>{t("admin.comments.author")}</TableHead>
                <TableHead>{t("admin.comments.post")}</TableHead>
                <TableHead>{t("admin.comments.status")}</TableHead>
                <TableHead>{t("admin.comments.time")}</TableHead>
                <TableHead className="text-right">
                  {t("admin.comments.action")}
                </TableHead>
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
                          ❤️ {comment.likes} {t("admin.comments.likes")}
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
                      {new Date(comment.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
                          {t("admin.comments.viewDetail")}
                        </DropdownMenuItem>
                        {comment.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleApprove(comment.id)}
                              className="text-green-600"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              {t("admin.comments.approve")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleReject(comment.id)}
                              className="text-red-600"
                            >
                              <X className="w-4 h-4 mr-2" />
                              {t("admin.comments.reject")}
                            </DropdownMenuItem>
                          </>
                        )}
                        {comment.status === "approved" && (
                          <DropdownMenuItem
                            onClick={() => handleReject(comment.id)}
                            className="text-red-600"
                          >
                            <X className="w-4 h-4 mr-2" />
                            {t("admin.comments.hideComment")}
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
