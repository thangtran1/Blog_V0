"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Globe,
  Shield,
  Bell,
  Palette,
  Database,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { bgDefault2, titleName } from "@/styles/classNames";
export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: `${titleName} Blog`,
    siteDescription: "Blog về lập trình và công nghệ",
    siteUrl: "https://NoBugKai.blog",
    adminEmail: "admin@NoBugKai.blog",
    enableComments: true,
    enableNewsletter: true,
    enableDarkMode: true,
    enableNotifications: true,
    postsPerPage: 10,
    autoSave: true,
    seoEnabled: true,
  });

  const handleSave = () => {
    // Handle save logic here
    console.log("Settings saved:", settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Cài đặt hệ thống
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý cấu hình và tùy chỉnh blog của bạn
          </p>
        </div>
        <Button onClick={handleSave} className={bgDefault2}>
          Lưu thay đổi
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Chung
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Giao diện
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Bảo mật
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Thông báo
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Nâng cao
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Thông tin website
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Tên website</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Mô tả website</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        siteDescription: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">URL website</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, siteUrl: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Thông tin admin
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adminEmail">Email admin</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, adminEmail: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="postsPerPage">Số bài viết mỗi trang</Label>
                  <Input
                    id="postsPerPage"
                    type="number"
                    value={settings.postsPerPage}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        postsPerPage: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoSave">Tự động lưu</Label>
                  <Switch
                    id="autoSave"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoSave: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Tùy chỉnh giao diện
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cho phép người dùng chuyển đổi theme
                  </p>
                </div>
                <Switch
                  checked={settings.enableDarkMode}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableDarkMode: checked })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <div
                    className={`w-full h-20  rounded mb-2 ${bgDefault2}`}
                  ></div>
                  <p className="text-sm font-medium">Green Theme</p>
                  <p className="text-xs text-gray-500">Theme mặc định</p>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors opacity-50">
                  <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded mb-2"></div>
                  <p className="text-sm font-medium">Blue Theme</p>
                  <p className="text-xs text-gray-500">Sắp ra mắt</p>
                </div>
                <div className="p-4 border rounded-lg cursor-pointer hover:border-purple-500 transition-colors opacity-50">
                  <div className="w-full h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded mb-2"></div>
                  <p className="text-sm font-medium">Purple Theme</p>
                  <p className="text-xs text-gray-500">Sắp ra mắt</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Bảo mật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="w-full">Đổi mật khẩu</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phiên đăng nhập</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Chrome - Windows</p>
                      <p className="text-sm text-gray-500">IP: 192.168.1.1</p>
                      <p className="text-sm text-gray-500">Hiện tại</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Đăng xuất
                    </Button>
                  </div>
                </div>
                <Button variant="destructive" className="w-full">
                  Đăng xuất tất cả thiết bị
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Cài đặt thông báo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Thông báo email</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Nhận thông báo qua email
                  </p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableNotifications: checked })
                  }
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Bài viết mới được tạo</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Comment mới</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Người dùng đăng ký newsletter</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span>Báo cáo hàng tuần</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Cơ sở dữ liệu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SEO tối ưu</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tự động tối ưu SEO
                    </p>
                  </div>
                  <Switch
                    checked={settings.seoEnabled}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, seoEnabled: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Comments</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cho phép bình luận
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableComments}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, enableComments: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Newsletter</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Đăng ký nhận tin
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableNewsletter}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, enableNewsletter: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Backup & Export
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Backup dữ liệu
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Export bài viết
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Import dữ liệu
                </Button>
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Backup gần nhất: 15/01/2024
                  </p>
                  <Button variant="destructive" size="sm">
                    Xóa tất cả dữ liệu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
