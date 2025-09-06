"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import { useI18n } from "../i18n/i18n-provider";

export const LanguageSwitcher: React.FC = () => {
  const { changeLanguage, currentLanguage } = useI18n();

  const languages = [
    { code: "vi", name: "Tiếng Việt", icon: "flag:vn-4x3" },
    { code: "en", name: "English", icon: "flag:gb-4x3" },
  ];

  const currentLang =
    languages.find((l) => l.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="inline-flex items-center gap-2 py-1 px-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-md hover:shadow-md transition-shadow">
        <Icon icon={currentLang.icon} width={20} height={14} />
        <span className="truncate">{currentLang.name}</span>
        <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 mt-1 min-w-[160px] overflow-hidden animate-in fade-in-80"
        sideOffset={5}
      >
        {languages.map((lang) => (
          <DropdownMenu.Item
            key={lang.code}
            onSelect={() => changeLanguage(lang.code)}
            className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              currentLanguage === lang.code
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            <Icon icon={lang.icon} width={20} height={14} />
            <span className="flex-1 truncate">{lang.name}</span>
            {currentLanguage === lang.code && (
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
