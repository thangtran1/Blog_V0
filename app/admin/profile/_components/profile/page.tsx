"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AboutMeTab from "./components/about-me-tab";
import SkillsTab from "./components/skills-tab";
import LifeTab from "./components/life-tab";
import ExpensiveTab from "./components/expensive-tab";
import ConnectTab from "./components/connect-me-tab";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("aboutme");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const tabs = [
    { value: "connect", label: "Kết nối", component: <ConnectTab /> },
    { value: "expensive", label: "Kinh nghiệm", component: <ExpensiveTab /> },
    { value: "life", label: "Cuộc sống", component: <LifeTab /> },
    { value: "aboutme", label: "Thông tin cơ bản", component: <AboutMeTab /> },
    { value: "skills", label: "Kỹ năng", component: <SkillsTab /> },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = windowWidth < 768 ? 3 : tabs.length;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, tabs.length - visibleCount));
  };

  const handleTabChange = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveTab(value);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="space-y-6 w-full">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="relative flex items-center">
          {windowWidth < 768 && startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 h-full px-2 flex items-center bg-white dark:bg-gray-900 disabled:opacity-30"
              disabled={startIndex === 0}
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
          )}

          <TabsList
            className={`flex ${
              windowWidth < 768 ? "overflow-hidden  gap-2" : "grid grid-cols-5"
            } border-b border-green-300 dark:border-green-700 w-full`}
          >
            {tabs.slice(startIndex, startIndex + visibleCount).map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center justify-center border-b-2 border-transparent data-[state=active]:border-green-600 data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 py-2 transition-colors min-w-[100px]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {windowWidth < 768 && startIndex + visibleCount < tabs.length && (
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 h-full px-2 flex items-center bg-white dark:bg-gray-900 disabled:opacity-30"
              disabled={startIndex + visibleCount >= tabs.length}
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        <div className="mt-6 min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          ) : (
            tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="transition-all duration-300"
              >
                {tab.component}
              </TabsContent>
            ))
          )}
        </div>
      </Tabs>
    </div>
  );
}
