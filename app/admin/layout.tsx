"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarWidth, setSidebarWidth] = useState(256) // 64 * 4 = 256px (w-64)

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Listen for sidebar width changes
  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector("[data-sidebar]")
      if (sidebar) {
        setSidebarWidth(sidebar.getBoundingClientRect().width)
      }
    }

    // Initial check
    handleResize()

    // Listen for transitions
    const sidebar = document.querySelector("[data-sidebar]")
    if (sidebar) {
      sidebar.addEventListener("transitionend", handleResize)
      return () => sidebar.removeEventListener("transitionend", handleResize)
    }
  }, [])

  // Show login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
  }

  // Show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Show admin panel if authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div data-sidebar>
          <AdminSidebar />
        </div>
        <div className="transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
          <AdminHeader />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    )
  }

  return null
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  )
}
