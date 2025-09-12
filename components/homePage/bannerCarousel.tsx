import React from "react";
import { Carousel, Button, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Code, Sparkles } from "lucide-react";
import Link from "next/link";
import { titleName } from "@/styles/classNames";
import { useI18n } from "@/i18n/i18n-provider";

const { Title, Text } = Typography;

const BannerCarousel: React.FC = () => {
  const carouselRef = React.useRef<any>(null);
  const { t } = useI18n();

  const bannerData = [
    {
      id: 1,
      title: `${t("homePage.title")} ${titleName}`,
      desc: `${t("homePage.description")}`,
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2070&q=80",
      cta: `${t("homePage.explorePosts")}`,
      cta2: `${t("homePage.exploreCategories")}`,
      link: "/posts",
      link2: "/categories",
    },
  ];
  return (
    <div className="banner-carousel-wrapper">
      <Carousel ref={carouselRef} autoplay dots={false} effect="fade">
        {bannerData.map((banner) => (
          <div key={banner.id} className="carousel-slide relative">
            <img src={banner.img} alt={banner.title} className="banner-image" />
            <div className="banner-overlay"></div>

            <div className="banner-content">
              <div className="flex justify-between items-center gap-10 w-full">
                <div className="w-full">
                  <Title level={1} className="banner-title">
                    {banner.title}
                  </Title>
                  <Text className="banner-desc">{banner.desc}</Text>
                  <div className="flex gap-2 flex-wrap">
                    <Button type="primary" size="middle">
                      <Link href={banner.link}>
                        {banner.cta} <ArrowRightOutlined />
                      </Link>
                    </Button>
                    <Button type="primary" size="middle">
                      <Link href={banner.link2}>
                        {banner.cta2} <ArrowRightOutlined />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className=" hidden md:block">
                  <div className="relative animate-bounce-in-down w-full">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Code className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-800" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <style>
        {`
          .carousel-slide {
            position: relative;
            height: 220px;
          }
          @media (min-width: 640px) {
            .carousel-slide {
              height: 250px;
            }
          }
          @media (min-width: 1024px) {
            .carousel-slide {
              height: 300px;
            }
          }

          .banner-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .banner-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 70%);
          }

          .banner-content {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            color: white;
            padding: 0 5%;
            width: 90%;
            max-width: 700px;
            text-align: left;
            animation: fadeIn 1.2s ease-out;
          }

          @media (min-width: 1280px) {
            .banner-content {
                max-width: 900px;
            }
            }

            @media (min-width: 1536px) {
            .banner-content {
                max-width: 1100px;
            }
            }

          .banner-title {
            font-size: 20px !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin-bottom: 12px !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          }
          @media (min-width: 640px) {
            .banner-title {
              font-size: 28px !important;
            }
          }
          @media (min-width: 1024px) {
            .banner-title {
              font-size: 40px !important;
            }
          }

          .banner-desc {
            font-size: 14px;
            color: #e5e7eb;
            margin-bottom: 16px;
            display: block;
            line-height: 1.6;
          }
          @media (min-width: 640px) {
            .banner-desc {
              font-size: 16px;
              margin-bottom: 24px;
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-40px); }
            to { opacity: 1; transform: translateY(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default BannerCarousel;
