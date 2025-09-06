import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import EnhancedHeader from "@/components/enhanced-header";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollToTopNavigation from "@/components/scroll-to-top-navigation";
import PageTransition from "@/components/page-transition";
import { titleName } from "../styles/classNames";
import { Toaster } from "react-hot-toast";
import { I18nProvider } from "../i18n/i18n-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${titleName} - Nơi chia sẻ kiến thức lập trình`,
  description:
    "Blog chia sẻ kiến thức về lập trình, công nghệ và phát triển phần mềm",
  icons: {
    icon: "/icon-public.png",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-right" />
          <ScrollProgress />
          <ScrollToTopNavigation />
          <EnhancedHeader />
          <PageTransition>
            <main className="min-h-screen">
              <I18nProvider>{children}</I18nProvider>
            </main>
          </PageTransition>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
