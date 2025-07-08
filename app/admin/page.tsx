"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading-spinner w-8 h-8"></div>
    </div>
  )
}
