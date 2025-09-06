"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Code, Menu, X, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { textDefault, titleName } from "@/styles/classNames";
import { LanguageSwitcher } from "./language-swicher";
import { useI18n } from "@/i18n/i18n-provider";
export default function EnhancedHeader() {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: t("enhancedHeader.home"), href: "/" },
    { name: t("enhancedHeader.allPosts"), href: "/posts" },
    { name: t("enhancedHeader.categories"), href: "/categories" },
    { name: t("enhancedHeader.about"), href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="h-6 w-6 bg-muted rounded"></div>
            <div className="h-6 w-20 bg-muted rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-lg"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="flex h-16 items-center px-4 justify-between w-full">
        <Link href="/" className="flex items-center space-x-2 mr-8 group">
          <div className="relative">
            {/* <Code className="h-6 w-6 text-green-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" /> */}
            <BarChart2 className="w-6 h-6 text-primary" />
            <div className="absolute -inset-1 bg-green-500/20 rounded-full blur animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="font-bold text-green-500 text-xl transition-all duration-300 group-hover:text-green-400">
            {titleName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-all duration-300 relative group animate-fade-in-down stagger-${
                index + 1
              } ${
                isActive(item.href)
                  ? { textDefault }
                  : "text-muted-foreground hover:text-green-600 dark:hover:text-green-400"
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500 rounded-full animate-scale-in"></div>
              )}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-green-500/10 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-green-100 dark:hover:bg-green-900 relative group transition-all duration-300 hover:scale-110"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 animate-pulse-glow"></div>
                <span className="sr-only">
                  {t("enhancedHeader.toggleTheme")}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-scale-in">
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="hover:bg-green-50 dark:hover:bg-green-950"
              >
                <Moon className="mr-2 h-4 w-4" />
                {t("enhancedHeader.dark")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="hover:bg-green-50 dark:hover:bg-green-950"
              >
                <Sun className="mr-2 h-4 w-4" />
                {t("enhancedHeader.light")}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="hover:bg-green-50 dark:hover:bg-green-950"
              >
                <Code className="mr-2 h-4 w-4" />
                {t("enhancedHeader.system")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-300 hover:scale-110"
              >
                <Menu
                  className={`h-5 w-5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-90 scale-0"
                      : "rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`absolute h-5 w-5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-0 scale-100"
                      : "rotate-90 scale-0"
                  }`}
                />
                <span className="sr-only">
                  {t("enhancedHeader.toggleMenu")}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 animate-slide-in-right">
              <div className="flex flex-col mt-6 space-y-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg border border-green-500/20  font-medium transition-all duration-300 p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-950 animate-fade-in-left stagger-${
                      index + 1
                    } ${
                      isActive(item.href)
                        ? `${textDefault} bg-green-50 dark:bg-green-950`
                        : "text-muted-foreground hover:text-green-600 dark:hover:text-green-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
