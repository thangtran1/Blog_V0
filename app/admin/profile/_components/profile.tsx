"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Setting from "./setting";
import AdminProfile from "./profile/page";
import ChangePassword from "./changePassword";

const tabs = [
  {
    key: "profile",
    title: "Thông tin cơ bản",
    component: <AdminProfile />,
  },
  { key: "setting", title: "Cài đặt", component: <Setting /> },
  { key: "security", title: "Bảo mật", component: <ChangePassword /> },
];

export default function Profile() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(
    searchParams.get("tab") ?? "profile"
  );

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", key);
    router.replace(url.toString());
  };

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabFromUrl !== selectedTab) {
      setSelectedTab(tabFromUrl);
    }
  }, [searchParams]);

  return (
    <Tabs.Root value={selectedTab} onValueChange={handleTabChange}>
      <Tabs.List className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.key}
            value={tab.key}
            className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:text-green-600 font-medium transition"
          >
            {tab.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content key={tab.key} value={tab.key} className="py-4">
          {tab.component}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
