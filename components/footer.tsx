"use client";
import Link from "next/link";
import { Github, Linkedin, Mail, Heart, BarChart2 } from "lucide-react";
import { maxWidth, titleName } from "@/styles/classNames";
import { ICategory, callFetchCategories } from "@/lib/api-services";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Form, Input, Button } from "antd";
import { useI18n } from "@/i18n/i18n-provider";

export default function Footer() {
  const [form] = Form.useForm();
  const { t } = useI18n();
  const handleFinish = (values: { email: string }) => {
    toast.success(`Đăng ký thành công`);

    form.resetFields();
  };

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    callFetchCategories()
      .then((res) => {
        setCategories(res.data.slice(0, 5));
      })
      .catch((err) => {
        console.error(err);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
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
              {t("footer.description")}
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
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  {t("footer.allPosts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-muted-foreground hover:text-green-500 transition-colors block py-1"
                >
                  {t("footer.categories")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-base">
              {t("footer.categories")}
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
              {t("footer.follow")}
            </h3>
            <p className="text-muted-foreground text-sm">
              {t("footer.followDescription")}
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
                label={t("footer.email")}
                name="email"
                rules={[
                  { required: true, message: t("footer.emailRequired") },
                  { type: "email", message: t("footer.emailInvalid") },
                ]}
              >
                <Input
                  placeholder={t("footer.email")}
                  className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
               text-gray-900 dark:text-gray-100 
               placeholder-gray-400 dark:placeholder-gray-500 
               rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full font-medium 
                    bg-gradient-to-r from-green-500 to-green-600 
                    text-white 
                    hover:from-green-600 hover:to-green-700 
                    !hover:text-white 
                    !bg-gradient-to-r 
                    transition-all duration-200"
                >
                  {t("footer.subscribe")}
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
            © 2025 {titleName}. {t("footer.allRightsReserved")}
          </p>
          <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-end gap-1">
            {t("footer.createdWith")} <Heart className="h-4 w-4 text-red-500" />{" "}
            {titleName}
          </p>
        </div>
      </div>
    </footer>
  );
}
