"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Bài viết", href: "/admin/posts", icon: FileText },
  { name: "Danh mục", href: "/admin/categories", icon: FolderOpen },
  { name: "Tags", href: "/admin/tags", icon: Tags },
  { name: "Comments", href: "/admin/comments", icon: MessageSquare },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard" || pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className={`flex items-center p-4 border-b border-gray-200 dark:border-gray-800 ${isCollapsed ? "justify-center" : "justify-between"}`}
        >
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                CodeEasy
              </span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
              <Code className="w-4 h-4 text-white" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`h-8 w-8 ${isCollapsed ? "absolute top-4 right-2" : ""}`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  active
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.name : ""}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${active ? "text-white" : ""} ${isCollapsed ? "mx-auto" : ""}`}
                />
                {!isCollapsed && (
                  <>
                    <span>{item.name}</span>
                    {active && <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                  </>
                )}
                {isCollapsed && active && (
                  <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <Link
                href="/admin/posts/new"
                className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Tạo bài viết mới
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
