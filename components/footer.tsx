import Link from "next/link";
import { Code, Github, Linkedin, Mail, Heart, Divide } from "lucide-react";
import { buttonDefault, maxWidth, titleName } from "@/styles/classNames";
export default function Footer() {
  return (
    <footer className="bg-muted/30 w-full border-t">
      <div className="p-4 md:py-8">
        <div
          className={`grid ${maxWidth}  mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8`}
        >
          {/* Brand */}
          <div className="space-y-4  sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-green-500" />
              <span className="font-bold text-xl text-green-500">
                {titleName}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Nơi chia sẻ kiến thức lập trình và công nghệ. Từ Frontend đến
              Backend, từ cơ bản đến nâng cao.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-green-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-green-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-green-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-base">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  Tất cả bài viết
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  Về tác giả
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  Danh mục
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-base">
              Danh mục
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/categories/frontend"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  Frontend
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/backend"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  Backend
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/devops"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  DevOps
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/ai"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  AI & Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-foreground text-base">
              Theo dõi blog
            </h3>
            <p className="text-muted-foreground text-sm">
              Nhận thông báo về bài viết mới nhất
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                className={`w-full ${buttonDefault} text-white text-sm py-2 px-4 rounded-md transition-colors font-medium`}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t mt-5"></div>
        <div
          className={`${maxWidth} mx-auto mt-2 pt-4 sm:px-0 flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0`}
        >
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © 2025 {titleName}. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-end gap-1">
            Được tạo với <Heart className="h-4 w-4 text-red-500" /> bởi{" "}
            {titleName}
          </p>
        </div>
      </div>
    </footer>
  );
}
