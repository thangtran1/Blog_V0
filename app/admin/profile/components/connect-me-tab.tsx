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
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import {
  callCreateConnect,
  callDeleteConnect,
  callFetchConnectAuthor,
  callUpdateConnect,
  IConnectMe,
} from "@/lib/api-services";

import { Popconfirm, message } from "antd";

export default function ConnectTab() {
  const [connectData, setConnectData] = useState<IConnectMe[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingItem, setEditingItem] = useState<IConnectMe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await callFetchConnectAuthor();
      setConnectData(response.data);
    } catch (error) {
      console.error("Error fetching connect data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (connection: IConnectMe) => {
    setEditingItem({ ...connection });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingItem({
      _id: "",
      title: "",
      link: "",
      image: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      if (editingItem._id) {
        const res = await callUpdateConnect(editingItem._id, editingItem);
        setConnectData((prev) =>
          prev.map((c) => (c._id === editingItem._id ? res.data : c))
        );
        message.success("Thành công!");
      } else {
        const { _id, ...createData } = editingItem;
        const res = await callCreateConnect(createData);
        setConnectData((prev) => [...prev, res.data]);
      }

      setIsDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Lỗi khi lưu kết nối:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await callDeleteConnect(id);
      setConnectData((prev) => prev.filter((c) => c._id !== id));
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
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 truncate">
          Social Connections
        </h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Connection
        </Button>
      </div>

      <div className="grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {connectData.map((connection) => (
          <Card
            key={connection._id}
            className="shadow-md transition-all hover:shadow-lg hover:border-primary"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      connection.image || "https://placehold.co/48x48?text=🌐"
                    }
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/48x48?text=🌐")
                    }
                    alt={connection.title}
                    className="w-10 h-10 rounded-lg object-cover border"
                  />
                  <div>
                    <CardTitle className="text-lg">
                      {connection.title}
                    </CardTitle>
                    <a
                      href={connection.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline block truncate max-w-[150px]"
                    >
                      {connection.link}
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(connection)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Popconfirm
                    title="Xoá kết nối"
                    description="Bạn có chắc chắn muốn xoá kết nối này không?"
                    onConfirm={() => handleDelete(connection._id)}
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
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Kết nối tới: <strong>{connection.title}</strong>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem?._id ? "Edit" : "Add"} Connection
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Name</Label>
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
              <Label htmlFor="link">Link URL</Label>
              <Input
                id="link"
                value={editingItem?.link || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, link: e.target.value }
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
