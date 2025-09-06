"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import {
  Bold,
  Italic,
  Underline,
  Link,
  List,
  ListOrdered,
  Quote,
  Code,
  ImageIcon,
  Eye,
  Type,
  Heading,
} from "lucide-react";
import { useI18n } from "@/i18n/i18n-provider";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("write");

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.getElementById(
      "content-editor"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const toolbarButtons = [
    {
      icon: Heading,
      action: () => insertMarkdown("## "),
      title: "Heading",
      group: "format",
    },
    {
      icon: Bold,
      action: () => insertMarkdown("**", "**"),
      title: "Bold",
      group: "format",
    },
    {
      icon: Italic,
      action: () => insertMarkdown("*", "*"),
      title: "Italic",
      group: "format",
    },
    {
      icon: Underline,
      action: () => insertMarkdown("<u>", "</u>"),
      title: "Underline",
      group: "format",
    },
    {
      icon: Link,
      action: () => insertMarkdown("[", "](url)"),
      title: "Link",
      group: "insert",
    },
    {
      icon: List,
      action: () => insertMarkdown("- "),
      title: "Bullet List",
      group: "insert",
    },
    {
      icon: ListOrdered,
      action: () => insertMarkdown("1. "),
      title: "Numbered List",
      group: "insert",
    },
    {
      icon: Quote,
      action: () => insertMarkdown("> "),
      title: "Quote",
      group: "insert",
    },
    {
      icon: Code,
      action: () => insertMarkdown("`", "`"),
      title: "Inline Code",
      group: "insert",
    },
    {
      icon: ImageIcon,
      action: () => insertMarkdown("![alt text](", ")"),
      title: "Image",
      group: "insert",
    },
  ];

  return (
    <div className="border w-[325px] md:w-full border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <TabsList className="h-9 bg-white dark:bg-gray-700">
            <TabsTrigger
              value="write"
              className="text-sm flex items-center gap-2"
            >
              <Type className="w-4 h-4" />
              {t("admin.richTextEditor.write")}
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="text-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {t("admin.richTextEditor.preview")}
            </TabsTrigger>
          </TabsList>

          {activeTab === "write" && (
            <div className="flex items-center gap-1">
              {toolbarButtons.map((button, index) => (
                <Button
                  type="button"
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={button.action}
                  title={button.title}
                  className="h-9 w-9 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <button.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          )}
        </div>

        <TabsContent value="write" className="m-0">
          <div className="relative">
            <Textarea
              id="content-editor"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={t("admin.richTextEditor.startWriting")}
              className="min-h-[500px] border-0 rounded-none resize-none focus-visible:ring-0 text-base leading-relaxed p-6"
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
              {value.length} {t("admin.richTextEditor.characters")}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="min-h-[500px] px-4">
            {value ? (
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    blockquote({ children }) {
                      return (
                        <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300 rounded-r">
                          {children}
                        </blockquote>
                      );
                    },
                    table({ children }) {
                      return (
                        <div className="overflow-x-auto my-6">
                          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                            {children}
                          </table>
                        </div>
                      );
                    },
                    th({ children }) {
                      return (
                        <th className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                          {children}
                        </th>
                      );
                    },
                    td({ children }) {
                      return (
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          {children}
                        </td>
                      );
                    },
                    img({ src, alt }) {
                      return (
                        <img
                          src={src || "/placeholder.svg?height=300&width=500"}
                          alt={alt}
                          className="max-w-full h-auto rounded-lg my-4 shadow-lg border border-gray-200 dark:border-gray-700"
                        />
                      );
                    },
                    a({ href, children }) {
                      return (
                        <a
                          href={href}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      );
                    },
                    h1({ children }) {
                      return (
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                          {children}
                        </h1>
                      );
                    },
                    h2({ children }) {
                      return (
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                          {children}
                        </h2>
                      );
                    },
                    h3({ children }) {
                      return (
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">
                          {children}
                        </h3>
                      );
                    },
                    p({ children }) {
                      return (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          {children}
                        </p>
                      );
                    },
                    ul({ children }) {
                      return (
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                          {children}
                        </ul>
                      );
                    },
                    ol({ children }) {
                      return (
                        <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                          {children}
                        </ol>
                      );
                    },
                  }}
                >
                  {value}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    {t("admin.richTextEditor.noContentToPreview")}
                  </p>
                  <p className="text-sm">
                    {t("admin.richTextEditor.startWritingTab")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
