"use client";
import Link from "next/link";
import { Github, Linkedin, Mail, Heart, BarChart2 } from "lucide-react";
import { maxWidth, titleName } from "@/styles/classNames";
import { ICategory, callFetchCategories } from "@/lib/api-services";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Form, Input, Button } from "antd";

export default function Footer() {
  const [form] = Form.useForm();

  const handleFinish = (values: { email: string }) => {
    toast.success(`Đăng ký thành công`);

    form.resetFields();
  };

  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    callFetchCategories()
      .then((res) => {
        setCategories(res.data.slice(0, 5));
      })
      .catch((err) => {
        console.error(err);
        setCategories([]);
      });
  }, []);
  return (
    <footer className="bg-muted/30 w-full border-t">
      <div className="p-4 md:py-8">
        <div
          className={`grid ${maxWidth}  mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8`}
        >
          <div className="space-y-4  sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <BarChart2 className="w-6 h-6 text-primary" />

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

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-base">
              Danh mục
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-foreground text-base">
              Theo dõi blog
            </h3>
            <p className="text-muted-foreground text-sm">
              Nhận thông báo về bài viết mới nhất
            </p>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              className="space-y-3"
            >
              <style>{`
    label.ant-form-item-required {
      color: hsl(var(--muted-foreground)) !important;
    }
  `}</style>

              <Form.Item
                label="Email của bạn"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Email của bạn" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full font-medium bg-gradient-to-r from-green-500 to-green-500 text-primary-foreground hover:bg-primary/90"
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

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
