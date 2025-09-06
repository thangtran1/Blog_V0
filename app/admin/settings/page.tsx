"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Globe, Shield, Bell, User } from "lucide-react";
import { useState } from "react";
import { bgDefault2, titleName } from "@/styles/classNames";
import { useI18n } from "@/i18n/i18n-provider";
export default function AdminSettings() {
  const { t } = useI18n();
  const [settings, setSettings] = useState({
    siteName: `${titleName} Blog`,
    siteDescription: t("admin.settings.siteDescription"),
    siteUrl: "https://vanthang.io.vn",
    adminEmail: process.env.ADMIN_EMAIL,
    enableComments: true,
    enableNewsletter: true,
    enableDarkMode: true,
    enableNotifications: true,
    postsPerPage: 10,
    autoSave: true,
    seoEnabled: true,
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 truncate">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            {t("admin.settings.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base truncate">
            {t("admin.settings.description")}
          </p>
        </div>
        <Button onClick={handleSave} className={bgDefault2}>
          {t("admin.settings.save")}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 border-b border-green-300 dark:border-green-700">
          <TabsTrigger
            value="general"
            className="flex items-center gap-2 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 px-3 py-2 rounded-t transition-colors"
          >
            <Globe className="w-4 h-4" />
            {t("admin.settings.general")}
          </TabsTrigger>

          <TabsTrigger
            value="security"
            className="flex items-center gap-2 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 px-3 py-2 rounded-t transition-colors"
          >
            <Shield className="w-4 h-4" />
            {t("admin.settings.security")}
          </TabsTrigger>

          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 px-3 py-2 rounded-t transition-colors"
          >
            <Bell className="w-4 h-4" />
            {t("admin.settings.notifications")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  {t("admin.settings.websiteInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">
                    {t("admin.settings.websiteName")}
                  </Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">
                    {t("admin.settings.websiteDescription")}
                  </Label>
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
                  <Label htmlFor="siteUrl">
                    {t("admin.settings.websiteUrl")}
                  </Label>
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
                  {t("admin.settings.adminInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adminEmail">
                    {t("admin.settings.adminEmail")}
                  </Label>
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
                  <Label htmlFor="postsPerPage">
                    {t("admin.settings.postsPerPage")}
                  </Label>
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
                  <Label htmlFor="autoSave">
                    {t("admin.settings.autoSave")}
                  </Label>
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

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {t("admin.settings.security")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">
                    {t("admin.settings.currentPassword")}
                  </Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">
                    {t("admin.settings.newPassword")}
                  </Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">
                    {t("admin.settings.confirmPassword")}
                  </Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="w-full">
                  {t("admin.settings.changePassword")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("admin.settings.loginSession")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {t("admin.settings.chromeWindows")}
                      </p>
                      <p className="text-sm text-gray-500">IP: 192.168.1.1</p>
                      <p className="text-sm text-gray-500">
                        {t("admin.settings.currently")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("admin.settings.logout")}
                    </Button>
                  </div>
                </div>
                <Button variant="destructive" className="w-full">
                  {t("admin.settings.logoutAllDevices")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t("admin.settings.notifications")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t("admin.settings.emailNotifications")}</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("admin.settings.emailNotificationsDescription")}
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
                  <span>{t("admin.settings.newPosts")}</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>{t("admin.settings.newComments")}</span>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <span>{t("admin.settings.weeklyReport")}</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
