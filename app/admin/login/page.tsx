"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import { bgDefault, bgDefault2, titleName } from "@/styles/classNames";
export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/admin/dashboard");
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 px-6 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`w-20 h-20 ${bgDefault2} animate-bounce  rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}
          >
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1
            className={`text-3xl font-bold  ${bgDefault} bg-clip-text text-transparent mb-2`}
          >
            Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Đăng nhập để quản lý blog {titleName}
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center">
              Nhập thông tin đăng nhập của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50 dark:bg-red-900/20"
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full ${bgDefault2} hover:from-green-600 hover:to-green-700 shadow-lg`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang đăng nhập...
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2 font-medium">
                Demo đăng nhập:
              </p>
              <div className="text-xs space-y-1 text-center">
                <p className="font-mono  dark:bg-gray-900 px-2 py-1 rounded">
                  <strong>Email:</strong> còn lâu mới nói
                </p>
                <p className="font-mono  dark:bg-gray-900 px-2 py-1 rounded">
                  <strong>Password:</strong> mật khẩu bị ẩn rùi nè
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
