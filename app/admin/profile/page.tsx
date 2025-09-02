"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AboutMeTab from "./components/about-me-tab";
import SkillsTab from "./components/skills-tab";
import LifeTab from "./components/life-tab";
import ExpensiveTab from "./components/expensive-tab";
import ConnectTab from "./components/connect-me-tab";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("aboutme");
  const [loading, setLoading] = useState(false);

  const handleTabChange = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveTab(value);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Admin Profile Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 sm:text-sm">
          Quản lý các thông tin cá nhân, kỹ năng và kết nối của admin
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5 border-b border-green-300 dark:border-green-700">
          {[
            { value: "connect", label: "Connect" },
            { value: "expensive", label: "Expensive" },
            { value: "life", label: "Life" },
            { value: "aboutme", label: "About Me" },
            { value: "skills", label: "Skills" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-6 border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 px-3 py-2 rounded-t transition-colors"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Content */}
        <div className="mt-6 min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              <TabsContent
                value="aboutme"
                className="transition-all duration-300"
              >
                <AboutMeTab />
              </TabsContent>
              <TabsContent
                value="skills"
                className="transition-all duration-300"
              >
                <SkillsTab />
              </TabsContent>
              <TabsContent value="life" className="transition-all duration-300">
                <LifeTab />
              </TabsContent>
              <TabsContent
                value="expensive"
                className="transition-all duration-300"
              >
                <ExpensiveTab />
              </TabsContent>
              <TabsContent
                value="connect"
                className="transition-all duration-300"
              >
                <ConnectTab />
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
}
