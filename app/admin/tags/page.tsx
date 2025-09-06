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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Tag,
  TrendingUp,
  Tags,
} from "lucide-react";
import TagForm from "@/components/admin/tag-form";
import { buttonDefault } from "@/styles/classNames";
import { useI18n } from "@/i18n/i18n-provider";

const tags = [
  {
    id: 1,
    name: "React",
    slug: "react",
    description: "React framework",
    color: "#61DAFB",
    postCount: 15,
    createdAt: "2025-01-01",
  },
  {
    id: 2,
    name: "JavaScript",
    slug: "javascript",
    description: "JavaScript programming",
    color: "#F7DF1E",
    postCount: 23,
    createdAt: "2025-01-01",
  },
  {
    id: 3,
    name: "TypeScript",
    slug: "typescript",
    description: "TypeScript language",
    color: "#3178C6",
    postCount: 18,
    createdAt: "2025-01-01",
  },
  {
    id: 4,
    name: "Node.js",
    slug: "nodejs",
    description: "Node.js runtime",
    color: "#339933",
    postCount: 12,
    createdAt: "2025-01-02",
  },
  {
    id: 5,
    name: "Next.js",
    slug: "nextjs",
    description: "Next.js framework",
    color: "#000000",
    postCount: 10,
    createdAt: "2025-01-02",
  },
];

export default function AdminTagsPage() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 truncate">
            <Tags className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            {t("admin.tags.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base truncate">
            {t("admin.tags.description")}
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className={buttonDefault}>
              <Plus className="w-4 h-4 mr-2" />
              {t("admin.tags.createTag")}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] md:w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 rounded-lg">
            <DialogHeader>
              <DialogTitle>{t("admin.tags.createTag")}</DialogTitle>
              <DialogDescription>{t("admin.tags.addTag")}</DialogDescription>
            </DialogHeader>
            <TagForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="animate-fade-in-up stagger-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.tags.totalTags")}
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tags.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 {t("admin.tags.fromLastMonth")}
            </p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up stagger-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.tags.popularTags")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tags.filter((t) => t.postCount > 15).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("admin.tags.moreThan15Posts")}
            </p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up stagger-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("admin.tags.totalPosts")}
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tags.reduce((sum, t) => sum + t.postCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("admin.tags.usingTags")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("admin.tags.filter")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Tìm kiếm tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {t("admin.tags.filter")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {t("admin.tags.listTags")} ({filteredTags.length})
          </CardTitle>
          <CardDescription>{t("admin.tags.description2")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("admin.tags.tag")}</TableHead>
                <TableHead>{t("admin.tags.slug")}</TableHead>
                <TableHead>{t("admin.tags.description2")}</TableHead>
                <TableHead>{t("admin.tags.posts")}</TableHead>
                <TableHead>{t("admin.tags.createdAt")}</TableHead>
                <TableHead className="text-right">
                  {t("admin.tags.action")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTags.map((tag) => (
                <TableRow key={tag.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      ></div>
                      <span className="font-medium">{tag.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {tag.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {tag.description}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {tag.postCount} {t("admin.tags.posts")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(tag.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingTag(tag)}>
                          <Edit className="w-4 h-4 mr-2" />
                          {t("admin.tags.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          {t("admin.tags.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {editingTag && (
        <Dialog open={!!editingTag} onOpenChange={() => setEditingTag(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("admin.tags.edit")}</DialogTitle>
              <DialogDescription>{t("admin.tags.updateTag")}</DialogDescription>
            </DialogHeader>
            <TagForm tag={editingTag} onClose={() => setEditingTag(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
