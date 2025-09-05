"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import {
  callCreateSkill,
  callDeleteSkill,
  callFetchSkillsAuthor,
  callUpdateSkill,
  ISkillMe,
} from "@/lib/api-services";
import { message, Popconfirm } from "antd";

export default function SkillsTab() {
  const [skillsData, setSkillsData] = useState<ISkillMe[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<ISkillMe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [specialtiesError, setSpecialtiesError] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callFetchSkillsAuthor();
      setSkillsData(response.data);
    } catch (error) {
      console.error("Error fetching skills data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill: ISkillMe) => {
    setIsCreatingNew(false);
    setEditingItem({ ...skill });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setIsCreatingNew(true);
    setEditingItem({
      title: "",
      image: "",
      level: "beginner",
      specialties: [""],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as ISkillMe);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    if (editingItem.specialties.some((spec) => spec.trim() === "")) {
      setSpecialtiesError(
        "Vui lòng điền đầy đủ các chuyên môn hoặc xoá ô trống."
      );
      return;
    } else {
      setSpecialtiesError("");
    }

    try {
      if (editingItem._id) {
        const res = await callUpdateSkill(editingItem);
        setSkillsData((prev) =>
          prev.map((c) => (c._id === editingItem._id ? res.data : c))
        );
        message.success("Thành công!");
      } else {
        const res = await callCreateSkill(editingItem);
        setSkillsData((prev) => [...prev, res.data]);
      }

      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Lỗi khi lưu kết nối:", error);
      message.error("Lỗi khi lưu dữ liệu. Vui lòng thử lại.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await callDeleteSkill(id);
      setSkillsData((prev) => prev.filter((exp) => exp._id !== id));
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
        <h2 className="text-2xl font-semibold">Skills</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((skill) => (
          <Card key={skill._id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={skill.image || "https://placehold.co/40x40?text=🛠️"}
                    alt={skill.title}
                    className="w-10 h-10 rounded-md object-cover shadow"
                  />
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(skill)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>

                  <Popconfirm
                    title="Xoá kết nối"
                    description="Bạn có chắc chắn muốn xoá kết nối này không?"
                    onConfirm={() => handleDelete(skill._id)}
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
              <Badge variant="secondary" className="capitalize">
                {skill.level}
              </Badge>
              <div className="flex flex-wrap gap-2">
                {skill.specialties.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs border-green-300 dark:border-green-700"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem?._id ? "Chỉnh sửa" : "Tạo mới"} kĩ năng
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Tên kĩ năng</Label>
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
            <div className="flex flex-col gap-2">
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
              {editingItem?.image && (
                <div className="relative mt-2 w-40 h-40 border rounded overflow-hidden">
                  <img
                    src={editingItem.image}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditingItem((prev) =>
                        prev ? { ...prev, image: "" } : prev
                      )
                    }
                    className="absolute top-1 right-1 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                    aria-label="Xóa ảnh"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="level">Trình độ</Label>
              <select
                id="level"
                value={editingItem?.level || "Beginner"}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, level: e.target.value }
                  )
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="flex flex-col ">
              <Label>Chuyên môn</Label>
              <div className="space-y-2 mt-2">
                {editingItem?.specialties?.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={spec}
                      onChange={(e) => {
                        const newSpecs = [...(editingItem.specialties || [])];
                        newSpecs[index] = e.target.value;
                        setEditingItem((prev) =>
                          prev ? { ...prev, specialties: newSpecs } : prev
                        );
                      }}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      onClick={() => {
                        const newSpecs = (editingItem.specialties || []).filter(
                          (_, i) => i !== index
                        );
                        setEditingItem((prev) =>
                          prev ? { ...prev, specialties: newSpecs } : prev
                        );
                      }}
                    >
                      {/* icon delete, ví dụ dùng lucide-react Trash2 */}
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {specialtiesError && (
                  <p className="text-red-600 text-sm mt-1">
                    {specialtiesError}
                  </p>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingItem((prev) =>
                      prev
                        ? {
                            ...prev,
                            specialties: [...(prev.specialties || []), ""],
                          }
                        : prev
                    );
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm chuyên môn
                </Button>
              </div>
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
