"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type React from "react"

// ====================================================================
// ADMIN AUTHENTICATION - Chỉ cho admin panel
// ====================================================================

interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "editor"
  avatar?: string
}

interface AdminAuthContextType {
  admin: AdminUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// Admin Auth Provider
export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem("admin_token")
    const adminData = localStorage.getItem("admin_user")

    if (token && adminData) {
      try {
        setAdmin(JSON.parse(adminData))
      } catch (error) {
        localStorage.removeItem("admin_token")
        localStorage.removeItem("admin_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem("admin_token", data.token)
        localStorage.setItem("admin_user", JSON.stringify(data.user))
        setAdmin(data.user)
        return true
      }
      return false
    } catch (error) {
      console.error("Admin login failed:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("admin_token")
      localStorage.removeItem("admin_user")
      setAdmin(null)
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isLoading,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider")
  }
  return context
}
