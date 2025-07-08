import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"

const posts = {
  1: {
    id: 1,
    title: "Elasticsearch Toàn Tập: Search Engine Hiện Đại Cho Ứng Dụng Web",
    content: `
      <p>Trong thế giới số hóa hiện đại, việc tìm kiếm thông tin nhanh chóng và chính xác đã trở thành một yêu cầu thiết yếu. Từ những trang web thương mại điện tử với hàng triệu sản phẩm, đến các ứng dụng phân tích log phức tạp, khả năng tìm kiếm hiệu quả quyết định đến trải nghiệm người dùng và thành công của hệ thống.</p>
      
      <p><strong>Elasticsearch</strong> - một trong những search engine mạnh mẽ nhất hiện nay, đã trở thành lựa chọn hàng đầu cho các doanh nghiệp và lập trình viên trên toàn thế giới.</p>
      
      <p>Bài viết này sẽ đưa bạn vào hành trình khám phá toàn diện về Elasticsearch, từ những khái niệm cơ bản về search engine, kiến trúc phân tán, so sánh với các công nghệ khác, cho đến hướng dẫn triển khai thực tế trong các dự án hiện đại.</p>
      
      <h2>1. Search Engine là gì? Tại sao cần Search Engine trong ứng dụng hiện đại?</h2>
      
      <h3>1.1. Search Engine (Công cụ tìm kiếm) là gì?</h3>
      
      <p>Search Engine có thể được hiểu như một <strong>hệ thống chuyên dụng</strong> được thiết kế để tìm kiếm, lọc và trả về thông tin từ một tập dữ liệu lớn một cách nhanh chóng và chính xác. Khác với cách tìm kiếm truyền thống bằng cách duyệt tuần tự qua dữ liệu (như sử dụng <code>LIKE %keyword%</code> trong SQL), search engine sử dụng các kỹ thuật indexing và scoring tiên tiến để tối ưu hóa quá trình tìm kiếm.</p>
      
      <h3>1.2. Tại sao ứng dụng đại cần Search Engine chuyên dụng?</h3>
      
      <p>Trong các ứng dụng hiện đại, việc tìm kiếm không chỉ đơn giản là so khớp từ khóa. Người dùng mong đợi:</p>
      
      <ul>
        <li><strong>Tìm kiếm thông minh</strong>: Hiểu được ý định tìm kiếm ngay cả khi có lỗi chính tả</li>
        <li><strong>Kết quả liên quan</strong>: Sắp xếp kết quả theo độ phù hợp</li>
        <li><strong>Tốc độ cao</strong>: Trả về kết quả trong vài millisecond</li>
        <li><strong>Tìm kiếm đa dạng</strong>: Text, số, ngày tháng, địa lý...</li>
      </ul>
      
      <h3>1.3. Nhược điểm và thách thức</h3>
      
      <p>Tuy nhiên, việc xây dựng và vận hành Search Engine cũng đi kèm với những thách thức:</p>
      
      <ul>
        <li><strong>Độ phức tạp cao</strong>: Cần hiểu sâu về indexing, scoring, clustering</li>
        <li><strong>Tài nguyên hệ thống</strong>: Tiêu tốn RAM và CPU đáng kể</li>
        <li><strong>Đồng bộ dữ liệu</strong>: Cần cơ chế sync giữa database chính và search index</li>
        <li><strong>Monitoring và troubleshooting</strong>: Cần tools chuyên dụng để theo dõi</li>
      </ul>
    `,
    date: "23 tháng 6, 2025",
    readTime: "24 phút đọc",
    category: "Backend",
  },
}

const recentPosts = [
  { id: 2, title: "API Gateway với Kong - Giải pháp toàn diện cho Microservices", date: "21 tháng 6, 2025" },
  { id: 3, title: "Micro Frontend Architecture - Hướng dẫn toàn diện", date: "19 tháng 6, 2025" },
  { id: 4, title: "SQL vs NoSQL - So Sánh Chi Tiết Các Loại Database Hiện Đại", date: "17 tháng 6, 2025" },
  { id: 5, title: "NocoBase - Nền Tảng Low-Code Cho Doanh Nghiệp Hiện Đại", date: "15 tháng 6, 2025" },
]

const tableOfContents = [
  { id: "1", title: "Search Engine là gì? Tại sao cần Search Engine trong ứng dụng hiện đại?" },
  { id: "1.1", title: "Search Engine (Công cụ tìm kiếm) là gì?" },
  { id: "1.2", title: "Tại sao ứng dụng đại cần Search Engine chuyên dụng?" },
  { id: "1.3", title: "Nhược điểm và thách thức" },
  { id: "2", title: "Elasticsearch là gì? Vì sao lại mạnh mẽ đến vậy?" },
  { id: "2.1", title: "Đặc điểm nổi bật của Elasticsearch" },
  { id: "2.2", title: "Lịch sử phát triển của Elasticsearch" },
  { id: "2.3", title: "Elasticsearch trong hệ sinh thái Elastic Stack" },
  { id: "3", title: "Kiến trúc cốt lõi của Elasticsearch" },
]

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = posts[Number.parseInt(params.id) as keyof typeof posts]

  if (!post) {
    return <div>Bài viết không tồn tại</div>
  }

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/posts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại tất cả bài viết
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar Left */}
          <div className="lg:col-span-3">
            <div className="sticky top-20 space-y-6">
              <Card className="border-green-200 dark:border-green-800 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">📚 Bài viết gần đây</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPosts.map((recentPost) => (
                    <Link key={recentPost.id} href={`/posts/${recentPost.id}`} className="block group">
                      <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-green-200 dark:hover:border-green-800">
                        <h4 className="font-medium text-sm line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1">
                          {recentPost.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{recentPost.date}</p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <article className="prose prose-gray max-w-none dark:prose-invert prose-lg">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white">{post.category}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">{post.title}</h1>
                <div className="flex items-center gap-6 text-muted-foreground mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                  <Button variant="ghost" size="sm" className="hover:text-green-600">
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>

              <div
                className="prose-lg prose-headings:text-foreground prose-p:text-foreground prose-strong:text-green-600 dark:prose-strong:text-green-400 prose-code:bg-muted prose-code:text-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-ul:text-foreground prose-li:text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </div>

          {/* Table of Contents */}
          <div className="lg:col-span-3">
            <div className="sticky top-20">
              <Card className="border-green-200 dark:border-green-800 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                    📋 Trong bài này
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 px-3 rounded-md hover:bg-muted/50 border-l-2 border-transparent hover:border-green-500"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
