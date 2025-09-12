import { useI18n } from "@/i18n/i18n-provider";
import { titleName } from "@/styles/classNames";
import Marquee from "react-fast-marquee";

export default function MarqueeScroll() {
  const { t } = useI18n();
  const texts = [
    `${t("homePage.title")} ${titleName}. ${t("homePage.description")}`,
  ];
  return (
    <div className="bg-[#0c3055] text-[#ECF0F1] p-1.5">
      <Marquee speed={50} pauseOnHover={true} gradient={false}>
        {texts.map((text, idx) => (
          <span key={idx} className="mr-4">
            {text}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
