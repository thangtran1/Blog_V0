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
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Profile Management</h1>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5 gap-2 bg-muted p-1 rounded-xl shadow-sm">
          <TabsTrigger
            value="connect"
            className="transition-all border data-[state=active]:border-green-500 border-gray-300 duration-300 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-primary hover:bg-white/80"
          >
            Connect
          </TabsTrigger>
          <TabsTrigger
            value="expensive"
            className="transition-all duration-300 border data-[state=active]:border-green-500 border-gray-300 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-primary hover:bg-white/80"
          >
            Expensive
          </TabsTrigger>
          <TabsTrigger
            value="life"
            className="transition-all duration-300 data-[state=active]:border-green-500 border border-gray-300 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-primary hover:bg-white/80"
          >
            Life
          </TabsTrigger>
          <TabsTrigger
            value="aboutme"
            className="transition-all duration-300 data-[state=active]:border-green-500 border border-gray-300 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-primary hover:bg-white/80"
          >
            About Me
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="transition-all duration-300 data-[state=active]:border-green-500 border border-gray-300 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-primary hover:bg-white/80"
          >
            Skills
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
