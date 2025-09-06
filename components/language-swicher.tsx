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
      {/* Trigger */}
      <DropdownMenu.Trigger
        className="inline-flex items-center justify-center gap-2 
             py-1.5 px-3 rounded-lg border 
             border-gray-200 dark:border-gray-700
             bg-white dark:bg-gray-900 
             text-sm font-medium text-gray-700 dark:text-gray-200 
             shadow-sm
             transition-all duration-200 ease-in-out 
             cursor-pointer
             hover:border-gray-300 dark:hover:border-gray-600
             focus:outline-none focus:ring-1 
             focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <Icon icon={currentLang.icon} width={22} height={16} />
        <span className="hidden md:inline truncate">{currentLang.name}</span>
        <ChevronDown
          size={16}
          className="hidden md:inline text-gray-500 dark:text-gray-400 transition-colors"
        />
      </DropdownMenu.Trigger>


      {/* Content */}
      <DropdownMenu.Content
        className="bg-white dark:bg-gray-900 
                   rounded-lg shadow-lg py-1 mt-2 min-w-[170px] 
                   border border-gray-200 dark:border-gray-700 
                   animate-in fade-in-80 slide-in-from-top-1"
        sideOffset={6}
      >
        {languages.map((lang) => (
          <DropdownMenu.Item
            key={lang.code}
            onSelect={() => changeLanguage(lang.code)}
            className={`flex items-center gap-2 px-3 py-2 
                        text-sm transition-colors duration-150 rounded-md 
                        cursor-pointer select-none
                        ${currentLanguage === lang.code
                ? "font-semibold text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
