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
import { Edit, Save, X } from "lucide-react";
import {
  callCreateAboutAuthor,
  callFetchAboutAuthor,
  callUpdateAboutAuthor,
  IAboutMe,
} from "@/lib/api-services";

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
      setIsDialogOpen(true);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      setLoading(true);

      // Giả sử nếu có _id thì update, không thì tạo mới
      if (editingItem._id) {
        const res = await callUpdateAboutAuthor(editingItem);
        setAboutData(res.data);
      } else {
        const res = await callCreateAboutAuthor(editingItem);
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">About Me</h2>
        <Button onClick={handleEdit} disabled={!aboutData}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit About Me</DialogTitle>
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
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editingItem?.location || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, location: e.target.value }
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                value={editingItem?.yearsOfExperience || 0}
                onChange={(e) =>
                  setEditingItem(
                    (prev) =>
                      prev && {
                        ...prev,
                        yearsOfExperience: Number.parseInt(e.target.value),
                      }
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor="favorites">Favorites</Label>
              <Input
                id="favorites"
                value={editingItem?.favorites || ""}
                onChange={(e) =>
                  setEditingItem(
                    (prev) => prev && { ...prev, favorites: e.target.value }
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
