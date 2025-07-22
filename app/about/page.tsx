"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Heart,
  Download,
  Trash2,
} from "lucide-react";
import { maxWidth, textDefault, titleName } from "@/styles/classNames";
import {
  callFetchAboutAuthor,
  callFetchConnectAuthor,
  callFetchCV,
  callFetchExpensiveAuthor,
  callFetchLifeAuthor,
  callFetchSkillsAuthor,
  IAboutMe,
  IConnectMe,
  ICV,
  IExpensiveMe,
  ILifesMe,
  ISkillMe,
} from "@/lib/api-services";
import { useEffect, useState } from "react";
import { Button } from "antd";

const iconGradients = [
  "from-amber-500 to-orange-600",
  "from-purple-500 to-pink-600",
  "from-blue-500 to-cyan-600",
  "from-green-500 to-teal-600",
  "from-yellow-400 to-yellow-600",
];

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  GitHub: Github,
  Linkedin: Linkedin,
  Telegram: MessageCircle,
  Email: Mail,
};
export default function AboutPage() {
  const [about, setAbout] = useState<IAboutMe | null>(null);
  const [skills, setSkills] = useState<ISkillMe[]>([]);
  const [lifes, setLifes] = useState<ILifesMe[]>([]);
  const [expensive, setExpensive] = useState<IExpensiveMe[]>([]);
  const [connect, setConnect] = useState<IConnectMe[]>([]);
  const [cv, setCv] = useState<ICV | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [aboutRes, skillsRes, lifeRes, expensiveRes, connectRes] =
          await Promise.all([
            callFetchAboutAuthor(),
            callFetchSkillsAuthor(),
            callFetchLifeAuthor(),
            callFetchExpensiveAuthor(),
            callFetchConnectAuthor(),
          ]);

        setAbout(aboutRes.data);
        setSkills(skillsRes.data);
        setLifes(lifeRes.data);
        setExpensive(expensiveRes.data);
        setConnect(connectRes.data);
      } catch (err) {
        console.error("Lỗi khi fetch dữ liệu tác giả:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    fetchCV();
  }, []);

  const fetchCV = async () => {
    setLoading(true);
    try {
      const res = await callFetchCV();
      setCv(res.data);
    } catch (error) {
      console.error("Error fetching CV:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!cv?.fileUrl) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${cv.fileUrl}`
      );
      if (!response.ok) throw new Error("Không tải được file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.download = cv.fileName || "file_download";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
      alert("Tải file thành công");
    } catch (error) {
      console.error("Lỗi tải file:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="py-12 px-4">
        <div className={`${maxWidth} mx-auto `}>
          <div className="text-center mb-16">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="relative inline-block mb-8 md:mb-0">
                <div className="w-40 h-40 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-2xl relative overflow-hidden">
                  <span className="text-5xl font-bold text-white">TVT</span>
                  <div className="absolute inset-0 rounded-full border-4 border-green-400/30 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full border-2 border-green-300/20 animate-ping"></div>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-lg">✨</span>
                </div>
              </div>
              <div className="flex flex-col md:ml-10 justify-center text-center md:text-left">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Chào mừng đến với {titleName}!
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
                  Xin chào, tôi là một developer đam mê chia sẻ kiến thức và
                  khám phá công nghệ
                </p>
              </div>
            </div>
          </div>

          <Card className="mb-12 border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl relative overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl animate-bounce">🚀</span>
                Về tôi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <p className="text-lg leading-relaxed text-foreground">
                {about?.title || "Đang tải..."}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {about?.content || ""}
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <span>{about?.location || "..."}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <span>{about?.yearsOfExperience}+ năm kinh nghiệm</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>{about?.favorites || ""}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl animate-bounce">💻</span>
                Kỹ năng chuyên môn
              </CardTitle>
              <CardDescription className="text-base">
                Các công nghệ và kỹ năng tôi sử dụng để tạo ra những sản phẩm
                tuyệt vời
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={skill._id}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="h-full hover:shadow-lg bg-background transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 relative overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`w-14 border border-green-400 h-14 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                          >
                            <img
                              src={skill.image}
                              alt="Skill Image"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-bold text-lg capitalize ${textDefault} group-hover:text-green-500 transition-colors`}
                            >
                              {skill.title}
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
                          {skill.specialties.map((tech, techIndex) => (
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

          <Card className="mb-12 border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl animate-bounce">🌟</span>
                Đời sống & Sở thích
              </CardTitle>
              <CardDescription className="text-base">
                Những điều tôi yêu thích ngoài công việc lập trình
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {lifes.map((item, index) => {
                  const gradient = iconGradients[index % iconGradients.length];
                  return (
                    <div
                      key={item._id}
                      className="group animate-fade-in-up"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              🚀
                            </div>
                            <h3 className="font-bold capitalize text-lg text-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.content}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 border border-green-200 dark:border-green-800 bg-gradient-to-br from-white via-green-50 to-white/80 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                <span className="text-3xl animate-bounce">💼</span>
                Kinh nghiệm làm việc
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-10">
                {expensive.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-[3px] border-dashed border-green-300 dark:border-green-700 animate-fade-in-up transition-all duration-500"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="absolute w-8 h-8 bg-gradient-to-tr from-green-400 to-green-600 text-white rounded-full -left-4 top-2 flex items-center justify-center text-sm font-bold shadow-md ring-2 ring-white dark:ring-slate-900">
                      🚀
                    </div>

                    <div className="space-y-3 bg-muted/40 dark:bg-muted/20 p-4 rounded-xl border border-green-100 dark:border-green-900 shadow-inner backdrop-blur-sm transition-all duration-300">
                      <h3 className="font-bold capitalize text-xl text-foreground">
                        {exp.title}
                      </h3>

                      <p className="text-green-700 dark:text-green-300 capitalize font-semibold text-lg">
                        {exp.subTitle}
                      </p>

                      <p className="text-sm text-muted-foreground font-medium italic">
                        📅 {exp.time}
                      </p>

                      <p className="text-muted-foreground leading-relaxed">
                        {exp.content}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.skills.map((skill, achIndex) => (
                          <Badge
                            key={achIndex}
                            variant="outline"
                            className="text-xs rounded-full border border-green-300 dark:border-green-700 px-3 py-1 hover:bg-green-50 dark:hover:bg-green-900 transition-all"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-card to-muted/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <span className="text-3xl animate-bounce">🤝</span>
                Kết nối với tôi
              </CardTitle>
              <CardDescription className="text-base">
                Tôi luôn sẵn sàng kết nối, thảo luận về công nghệ, chia sẻ kinh
                nghiệm, hoặc cùng hợp tác. Đừng ngần ngại liên hệ!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {connect.map((social, index) => {
                  const IconComp = iconMap[social.title] || Github; // default icon
                  const gradient = iconGradients[index % iconGradients.length];

                  return (
                    <a
                      key={social._id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 h-16 bg-transparent hover:bg-green-50 dark:hover:bg-green-950 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 group transition-all duration-300 hover:scale-105 rounded-md px-4`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-medium capitalize">
                        {social.title}
                      </span>
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
