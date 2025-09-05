"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tags,
  MessageSquare,
  Settings,
  Code,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Files,
  X,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { bgDefault, bgDefault2, titleName } from "@/styles/classNames";
const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Danh mục", href: "/admin/categories", icon: FolderOpen },
  { name: "Bài viết", href: "/admin/posts", icon: FileText },
  { name: "Tags", href: "/admin/tags", icon: Tags },
  { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings },
  { name: "Hồ sơ", href: "/admin/cv", icon: Files },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export default function AdminSidebar({
  isOpen,
  onClose,
  isCollapsed,
  setIsCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsCollapsed(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsCollapsed]);

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard" || pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const handleToggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-50 ${
          isMobile
            ? `${isOpen ? "translate-x-0" : "-translate-x-full"} w-64`
            : `${isCollapsed ? "w-20" : "w-64"}`
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-800 ${
              isCollapsed && !isMobile ? "justify-center" : "justify-between"
            }`}
          >
            {(!isCollapsed || isMobile) && (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-6 group"
              >
                <div
                  className={`w-10 h-10 ${bgDefault2} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span
                  className={`font-bold text-lg ${bgDefault} bg-clip-text text-transparent`}
                >
                  {titleName}
                </span>
              </Link>
            )}

            {isCollapsed && !isMobile && (
              <div
                className={`w-10 h-10 ${bgDefault2} rounded-lg flex items-center justify-center shadow-md`}
              >
                <Code className="w-4 h-4 text-white" />
              </div>
            )}

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={isMobile ? onClose : undefined}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                    active
                      ? `${bgDefault2} text-white shadow-lg`
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  } ${isCollapsed && !isMobile ? "justify-center" : ""}`}
                >
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <div className="flex items-center gap-3">
                          <item.icon
                            className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                              active ? "text-white" : ""
                            } ${isCollapsed && !isMobile ? "mx-auto" : ""}`}
                          />
                          {(!isCollapsed || isMobile) && (
                            <>
                              <span>{item.name}</span>
                              {active && (
                                <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              )}
                            </>
                          )}
                          {isCollapsed && !isMobile && active && (
                            <div className="absolute right-1 top-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        side="right"
                        align="center"
                        className="bg-black text-white text-xs px-2 py-1 rounded shadow-lg"
                        style={{ marginLeft: "16px" }}
                      >
                        {item.name}
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </Link>
              );
            })}
          </nav>

          {(!isCollapsed || isMobile) && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-2">
                <Link
                  href="/admin/posts/new"
                  onClick={isMobile ? onClose : undefined}
                  className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Tạo bài viết mới
                </Link>
              </div>
            </div>
          )}
        </div>

        {!isMobile && (
          <button
            onClick={handleToggleCollapse}
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {isCollapsed ? (
              <ChevronRight className="w-6 h-6" />
            ) : (
              <ChevronLeft className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
    </>
  );
}
