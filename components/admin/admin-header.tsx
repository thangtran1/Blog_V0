"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Settings, User, Search, Plus, Menu } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { bgDefault2 } from "@/styles/classNames";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { admin, logout } = useAdminAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-0 focus-visible:ring-1 focus-visible:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="w-5 h-5" />
        </Button>

        <Button
          asChild
          size="sm"
          className={`${bgDefault2} hover:from-green-600 hover:to-green-700 shadow-md hidden sm:flex`}
        >
          <Link href="/admin/posts/new">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden lg:inline">Tạo mới</span>
          </Link>
        </Button>

        <Button
          asChild
          size="icon"
          className={`${bgDefault2} hover:from-green-600 hover:to-green-700 shadow-md sm:hidden`}
        >
          <Link href="/admin/posts/new">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">3</span>
          </div>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 lg:gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 lg:px-3"
            >
              <div
                className={`w-8 h-8 ${bgDefault2} rounded-full flex items-center justify-center shadow-md`}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-medium">{admin?.name || "Admin"}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Thông tin cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Cài đặt
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
