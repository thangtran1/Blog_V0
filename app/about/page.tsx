import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Heart,
  Coffee,
  Music,
  Camera,
  Gamepad2,
} from "lucide-react"

const skills = [
  {
    name: "Frontend Development",
    icon: "🎨",
    techs: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "WebGL"],
    gradient: "from-blue-500 to-purple-600",
    level: "Expert",
  },
  {
    name: "Backend Development",
    icon: "⚙️",
    techs: ["Node.js", "Python", "Golang", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST APIs"],
    gradient: "from-green-500 to-teal-600",
    level: "Expert",
  },
  {
    name: "DevOps & Cloud",
    icon: "☁️",
    techs: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Monitoring", "Load Balancing", "Security"],
    gradient: "from-orange-500 to-red-600",
    level: "Advanced",
  },
  {
    name: "AI & Machine Learning",
    icon: "🤖",
    techs: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Vector Databases", "RAG Systems"],
    gradient: "from-purple-500 to-pink-600",
    level: "Intermediate",
  },
  {
    name: "Mobile Development",
    icon: "📱",
    techs: ["React Native", "Flutter", "iOS", "Android", "Expo", "Firebase", "Push Notifications"],
    gradient: "from-indigo-500 to-blue-600",
    level: "Intermediate",
  },
  {
    name: "Database & Analytics",
    icon: "📊",
    techs: ["PostgreSQL", "MongoDB", "ClickHouse", "Elasticsearch", "Data Modeling", "Query Optimization"],
    gradient: "from-teal-500 to-green-600",
    level: "Advanced",
  },
]

const experiences = [
  {
    title: "Senior Full-stack Developer",
    company: "Tech Startup",
    period: "2022 - Hiện tại",
    description:
      "Phát triển và duy trì các ứng dụng web quy mô lớn, thiết kế kiến trúc microservices, và dẫn dắt team phát triển.",
    icon: "🚀",
    achievements: ["Tăng 40% performance", "Giảm 60% bug rate", "Lead team 8 người"],
  },
  {
    title: "Full-stack Developer",
    company: "Software Company",
    period: "2020 - 2022",
    description: "Xây dựng các ứng dụng web từ frontend đến backend, tối ưu hóa hiệu suất và trải nghiệm người dùng.",
    icon: "💻",
    achievements: ["10+ dự án thành công", "Mentor 5 junior devs", "Tech lead 3 projects"],
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2018 - 2020",
    description: "Phát triển giao diện người dùng responsive, tích hợp API và tối ưu hóa SEO cho các website.",
    icon: "🎨",
    achievements: ["50+ websites delivered", "100% client satisfaction", "SEO expert"],
  },
]

const lifestyle = [
  {
    title: "Đam mê công nghệ",
    icon: <Coffee className="w-6 h-6" />,
    description: "Luôn cập nhật và học hỏi những công nghệ mới nhất, tham gia các conference và meetup.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Âm nhạc & Sáng tạo",
    icon: <Music className="w-6 h-6" />,
    description: "Chơi guitar và sản xuất nhạc điện tử trong thời gian rảnh, giúp tăng khả năng sáng tạo.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Photography",
    icon: <Camera className="w-6 h-6" />,
    description: "Đam mê chụp ảnh phong cảnh và street photography, chia sẻ góc nhìn qua ống kính.",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Gaming & Tech",
    icon: <Gamepad2 className="w-6 h-6" />,
    description: "Yêu thích game indie và retro, thỉnh thoảng phát triển game nhỏ với Unity và Godot.",
    gradient: "from-green-500 to-teal-600",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="w-40 h-40 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-2xl relative overflow-hidden">
                <span className="text-5xl font-bold text-white">CE</span>
                {/* Animated border */}
                <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border-2 border-green-300/20 animate-ping"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-lg">✨</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Chào mừng đến với CodeEasy!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Xin chào, tôi là một developer đam mê chia sẻ kiến thức và khám phá công nghệ
            </p>
          </div>

          {/* About Section */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl animate-bounce">🚀</span>
                Về tôi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <p className="text-lg leading-relaxed text-foreground">
                Xin chào! Tôi là một Full-stack Developer với hơn 5 năm kinh nghiệm trong việc phát triển các ứng dụng
                web và hệ thống phần tán. Tôi đam mê công nghệ, luôn khao khát học hỏi những điều mới và chia sẻ kiến
                thức với cộng đồng developer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Trong suốt hành trình của mình, tôi đã tham gia phát triển nhiều dự án từ startup cho đến enterprise, từ
                website đơn giản đến các hệ thống microservices phức tạp. Tôi tin rằng công nghệ là công cụ để giải
                quyết vấn đề thực tế và tạo ra giá trị cho người dùng.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span>Việt Nam</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span>5+ năm kinh nghiệm</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Đam mê công nghệ</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl">💻</span>
                Kỹ năng chuyên môn
              </CardTitle>
              <CardDescription className="text-base">
                Các công nghệ và kỹ năng tôi sử dụng để tạo ra những sản phẩm tuyệt vời
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 relative overflow-hidden">
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                          >
                            {skill.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-green-600 dark:text-green-400 group-hover:text-green-500 transition-colors">
                              {skill.name}
                            </h3>
                            <Badge
                              variant="secondary"
                              className={`text-xs mt-1 ${
                                skill.level === "Expert"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : skill.level === "Advanced"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                              }`}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="flex flex-wrap gap-2">
                          {skill.techs.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs hover:bg-green-50 dark:hover:bg-green-950 transition-colors border-green-200 dark:border-green-800"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Section */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl">🌟</span>
                Đời sống & Sở thích
              </CardTitle>
              <CardDescription className="text-base">
                Những điều tôi yêu thích ngoài công việc lập trình
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {lifestyle.map((item, index) => (
                  <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            {item.icon}
                          </div>
                          <h3 className="font-bold text-lg text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="mb-12 border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl">💼</span>
                Kinh nghiệm làm việc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-8 border-l-4 border-green-200 dark:border-green-800 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="absolute w-8 h-8 bg-green-500 rounded-full -left-4 top-2 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {exp.icon}
                    </div>
                    <div className="space-y-3 bg-muted/30 p-6 rounded-lg border border-green-100 dark:border-green-900">
                      <h3 className="font-bold text-xl text-foreground">{exp.title}</h3>
                      <p className="text-green-600 dark:text-green-400 font-semibold text-lg">{exp.company}</p>
                      <p className="text-sm text-muted-foreground font-medium">{exp.period}</p>
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <Badge
                            key={achIndex}
                            variant="secondary"
                            className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl">🤝</span>
                Kết nối với tôi
              </CardTitle>
              <CardDescription className="text-base">
                Tôi luôn sẵn sàng kết nối, thảo luận về công nghệ, chia sẻ kinh nghiệm, hoặc cùng hợp tác. Đừng ngần
                ngại liên hệ!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Github, label: "GitHub", color: "text-gray-700 dark:text-gray-300" },
                  { icon: Linkedin, label: "LinkedIn", color: "text-blue-600" },
                  { icon: MessageCircle, label: "Telegram", color: "text-blue-500" },
                  { icon: Mail, label: "Email", color: "text-red-500" },
                ].map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center gap-3 h-16 bg-transparent hover:bg-green-50 dark:hover:bg-green-950 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 group transition-all duration-300 hover:scale-105"
                  >
                    <social.icon className={`w-5 h-5 ${social.color} group-hover:text-green-600 transition-colors`} />
                    <span className="font-medium">{social.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
