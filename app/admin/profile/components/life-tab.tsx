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
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import {
  callCreateLife,
  callDeleteLife,
  callFetchLifeAuthor,
  callUpdateLife,
  ILifesMe,
} from "@/lib/api-services";
import { message, Popconfirm } from "antd";

export default function LifeTab() {
  const [lifeData, setLifeData] = useState<ILifesMe[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<ILifesMe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callFetchLifeAuthor();
      setLifeData(response.data);
    } catch (error) {
      console.error("Error fetching life data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: ILifesMe) => {
    setEditingItem({ ...event });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingItem({
      title: "",
      content: "",
      image: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as ILifesMe);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      if (editingItem._id) {
        // Cập nhật
        const res = await callUpdateLife(editingItem._id, editingItem);
        setLifeData((prev) =>
          prev.map((c) => (c._id === editingItem._id ? res.data : c))
        );
        message.success("Thành công!");
      } else {
        // Tạo mới
        const res = await callCreateLife(editingItem);
        setLifeData((prev) => [...prev, res.data]);
      }

      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Lỗi khi lưu kết nối:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await callDeleteLife(id);
      setLifeData((prev) => prev.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Life Events</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="space-y-4">
        {lifeData.map((event) => (
          <Card key={event._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {event.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground italic">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Popconfirm
                    title="Xoá kết nối"
                    description="Bạn có chắc chắn muốn xoá kết nối này không?"
                    onConfirm={() => handleDelete(event._id)}
                    okText="Xoá"
                    cancelText="Huỷ"
                  >
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {event.content}
              </p>
              {event.image && (
                <img
                  src={event.image || "/placeholder.svg?height=400&width=600"}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg border border-muted"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem?._id ? "Edit" : "Add"} Life Event
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingItem?.title || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, title: e.target.value }
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={editingItem?.content || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, content: e.target.value }
                  )
                }
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="createdAt">Date</Label>
              <Input
                id="createdAt"
                type="date"
                value={
                  editingItem?.createdAt
                    ? editingItem.createdAt.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditingItem(
                    (prev) =>
                      prev && {
                        ...prev,
                        createdAt: new Date(e.target.value).toISOString(),
                      }
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={editingItem?.image || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, image: e.target.value }
                  )
                }
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
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
