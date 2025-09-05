"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Save, Trash2, X } from "lucide-react";
import {
  callCreateAboutAuthor,
  callDeleteAboutAuthor,
  callFetchAboutAuthor,
  callUpdateAboutAuthor,
  IAboutMe,
} from "@/lib/api-services";
import { Popconfirm } from "antd";

export default function AboutMeTab() {
  const [aboutData, setAboutData] = useState<IAboutMe | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<IAboutMe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callFetchAboutAuthor();
      setAboutData(response.data);
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (aboutData) {
      setEditingItem({ ...aboutData });
    } else {
      setEditingItem({
        title: "",
        content: "",
        location: "",
        yearsOfExperience: 0,
        favorites: "",
        createdAt: "",
        updatedAt: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      setLoading(true);

      // Chuẩn bị payload, loại bỏ _id khi tạo mới
      const payload = { ...editingItem };
      if (!editingItem._id) {
        delete payload._id;
      }

      if (editingItem._id) {
        const res = await callUpdateAboutAuthor(payload);
        setAboutData(res.data);
      } else {
        const res = await callCreateAboutAuthor(payload);
        setAboutData(res.data);
      }

      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving about data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!aboutData?._id) return;

    try {
      setLoading(true);

      await callDeleteAboutAuthor();
      setAboutData(null);
    } catch (error) {
      console.error("Error deleting about data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">About Me</h2>
        </div>
        <div className="flex gap-4">
          {!aboutData ? (
            <Button onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Create
            </Button>
          ) : (
            <Button onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
          {aboutData && (
            <div>
              <Popconfirm
                title="Xoá kết nối"
                description="Bạn có chắc chắn muốn xoá kết nối này không?"
                onConfirm={() => handleDelete()}
                okText="Xoá"
                cancelText="Huỷ"
              >
                <Button size="sm" variant="outline">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </Popconfirm>
            </div>
          )}
        </div>
      </div>

      {aboutData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {aboutData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              {aboutData.content}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  📍 Location:
                </span>{" "}
                {aboutData.location}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  🛠️ Experience:
                </span>{" "}
                {aboutData.yearsOfExperience} years
              </p>
              <p>
                <span className="font-medium text-foreground">
                  ❤️ Favorites:
                </span>{" "}
                {aboutData.favorites}
              </p>
              <p>
                <span className="font-medium text-foreground">🕒 Updated:</span>{" "}
                {new Date(aboutData.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingItem(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem?._id ? "Edit About Me" : "Create About Me"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2 flex-col">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                placeholder="Vui lòng nhập tiêu đề ... "
                value={editingItem?.title || ""}
                onChange={(e) =>
                  setEditingItem((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev
                  )
                }
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Label htmlFor="content">Nội dung</Label>
              <Textarea
                id="content"
                placeholder="Viết về bản thân ..."
                value={editingItem?.content || ""}
                onChange={(e) =>
                  setEditingItem((prev) =>
                    prev ? { ...prev, content: e.target.value } : prev
                  )
                }
                rows={6}
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Label htmlFor="location">Vị trí</Label>
              <Input
                id="location"
                placeholder="Bạn sống ở đâu?"
                value={editingItem?.location || ""}
                onChange={(e) =>
                  setEditingItem((prev) =>
                    prev ? { ...prev, location: e.target.value } : prev
                  )
                }
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Label htmlFor="experience">Số năm kinh nghiệm của bạn?</Label>
              <Input
                id="experience"
                type="number"
                min={0}
                placeholder="Nhập số năm kinh nghiệm của bạn"
                value={editingItem?.yearsOfExperience || 0}
                onChange={(e) =>
                  setEditingItem((prev) =>
                    prev
                      ? {
                          ...prev,
                          yearsOfExperience:
                            Number.parseInt(e.target.value) || 0,
                        }
                      : prev
                  )
                }
              />
            </div>
            <div className="flex gap-2 flex-col">
              <Label htmlFor="favorites">Sở thích</Label>
              <Input
                id="favorites"
                placeholder="Sở thích của bạn?"
                value={editingItem?.favorites || ""}
                onChange={(e) =>
                  setEditingItem((prev) =>
                    prev ? { ...prev, favorites: e.target.value } : prev
                  )
                }
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingItem(null);
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="button" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
