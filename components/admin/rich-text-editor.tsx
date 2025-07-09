"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
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

    // Restore cursor position
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

  const renderMarkdown = (text: string) => {
    return text
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold mt-6 mb-4">$1</h2>'
      )
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-xl font-bold mt-4 mb-3">$1</h3>'
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /`(.*?)`/g,
        '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>'
      )
      .replace(
        /^> (.*$)/gm,
        '<blockquote class="border-l-4 border-green-500 pl-4 py-2 my-4 bg-gray-50 dark:bg-gray-800 italic">$1</blockquote>'
      )
      .replace(/^- (.*$)/gm, "<li class='ml-4'>• $1</li>")
      .replace(/^1\. (.*$)/gm, "<li class='ml-4'>1. $1</li>")
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-green-600 hover:text-green-700 underline">$1</a>'
      )
      .replace(
        /!\[([^\]]*)\]$$([^)]+)$$/g,
        '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />'
      )
      .replace(/\n/g, "<br>");
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <TabsList className="h-9 bg-white dark:bg-gray-700">
            <TabsTrigger
              value="write"
              className="text-sm flex items-center gap-2"
            >
              <Type className="w-4 h-4" />
              Viết
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="text-sm flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Xem trước
            </TabsTrigger>
          </TabsList>

          {activeTab === "write" && (
            <div className="flex items-center gap-1">
              {toolbarButtons.map((button, index) => (
                <Button
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
              placeholder="# Tiêu đề bài viết

Bắt đầu viết nội dung của bạn ở đây...

## Sử dụng Markdown:
- **Bold text** - Text in đậm
- *Italic text* - Text in nghiêng  
- `Code` - Inline code
- > Quote - Trích dẫn
- [Link](url) - Liên kết
- ![Image](url) - Hình ảnh

### Danh sách:
1. Item 1
2. Item 2
3. Item 3

- Bullet point 1
- Bullet point 2"
              className="min-h-[500px] border-0 rounded-none resize-none focus-visible:ring-0 text-base leading-relaxed p-6"
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
              {value.length} ký tự
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="min-h-[500px] p-6 prose prose-lg max-w-none">
            {value ? (
              <div
                dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
                className="prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300"
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Chưa có nội dung để xem trước</p>
                  <p className="text-sm">Hãy viết nội dung ở tab "Viết"</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
