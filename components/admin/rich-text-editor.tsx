"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Underline, Link, List, ListOrdered, Quote, Code, ImageIcon, Eye, Type } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState("write")

  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown("**", "**"), title: "Bold" },
    { icon: Italic, action: () => insertMarkdown("*", "*"), title: "Italic" },
    { icon: Underline, action: () => insertMarkdown("<u>", "</u>"), title: "Underline" },
    { icon: Link, action: () => insertMarkdown("[", "](url)"), title: "Link" },
    { icon: List, action: () => insertMarkdown("- "), title: "Bullet List" },
    { icon: ListOrdered, action: () => insertMarkdown("1. "), title: "Numbered List" },
    { icon: Quote, action: () => insertMarkdown("> "), title: "Quote" },
    { icon: Code, action: () => insertMarkdown("`", "`"), title: "Inline Code" },
    { icon: ImageIcon, action: () => insertMarkdown("![alt text](", ")"), title: "Image" },
  ]

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-green-500 pl-4 italic">$1</blockquote>')
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      .replace(/^1\. (.*$)/gm, "<li>$1</li>")
      .replace(/\n/g, "<br>")
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <TabsList className="h-8">
            <TabsTrigger value="write" className="text-xs">
              <Type className="w-3 h-3 mr-1" />
              Viết
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
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
                  className="h-8 w-8 p-0"
                >
                  <button.icon className="w-3 h-3" />
                </Button>
              ))}
            </div>
          )}
        </div>

        <TabsContent value="write" className="m-0">
          <Textarea
            id="content-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Viết nội dung bài viết của bạn ở đây... 

Bạn có thể sử dụng Markdown:
- **Bold text**
- *Italic text*
- `Code`
- > Quote
- [Link](url)
- ![Image](url)"
            className="min-h-[400px] border-0 rounded-none resize-none focus-visible:ring-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0">
          <div className="min-h-[400px] p-4 prose prose-sm max-w-none">
            {value ? (
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} />
            ) : (
              <p className="text-muted-foreground italic">Chưa có nội dung để xem trước...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
