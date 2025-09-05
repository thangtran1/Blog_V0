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
  callCreateExpensive,
  callDeleteExpensive,
  callFetchExpensiveAuthor,
  callUpdateExpensive,
  IExpensiveMe,
} from "@/lib/api-services";
import { message, Popconfirm } from "antd";

export default function ExpensiveTab() {
  const [expensiveData, setExpensiveData] = useState<IExpensiveMe[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<IExpensiveMe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callFetchExpensiveAuthor();
      setExpensiveData(response.data);
    } catch (error) {
      console.error("Error fetching expensive data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense: IExpensiveMe) => {
    setEditingItem({ ...expense });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingItem({
      title: "",
      subTitle: "",
      time: "",
      content: "",
      skills: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as unknown as IExpensiveMe);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      if (editingItem._id) {
        // Cập nhật
        const res = await callUpdateExpensive(editingItem._id, editingItem);
        setExpensiveData((prev) =>
          prev.map((c) => (c._id === editingItem._id ? res.data : c))
        );
        message.success("Thành công!");
      } else {
        // Tạo mới
        const res = await callCreateExpensive(editingItem);
        setExpensiveData((prev) => [...prev, res.data]);
      }

      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Lỗi khi lưu kết nối:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await callDeleteExpensive(id);
      setExpensiveData((prev) => prev.filter((exp) => exp._id !== id));
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
        <h2 className="text-2xl font-semibold">Expenses</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {expensiveData.map((exp) => (
          <Card key={exp._id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {exp.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {exp.subTitle}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    {exp.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(exp)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>

                  <Popconfirm
                    title="Xoá kết nối"
                    description="Bạn có chắc chắn muốn xoá kết nối này không?"
                    onConfirm={() => handleDelete(exp._id)}
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
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.content}
              </p>
              {exp.skills && exp.skills.length > 0 && (
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {exp.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem?._id ? "Edit" : "Add"} Expense
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
              <Label htmlFor="subTitle">Subtitle</Label>
              <Input
                id="subTitle"
                value={editingItem?.subTitle || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, subTitle: e.target.value }
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={editingItem?.time || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, time: e.target.value }
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
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                value={editingItem?.skills?.join(", ") || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) =>
                      prev && {
                        ...prev,
                        skills: e.target.value.split(",").map((s) => s.trim()),
                      }
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
