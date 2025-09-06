import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useI18n } from "@/i18n/i18n-provider";

const Notification = () => {
  const { t } = useI18n();
  const initialNotifications = [
    {
      id: 1,
      title: t("admin.adminNotification.newOrder"),
      time: new Date(),
      read: false,
    },
    {
      id: 2,
      title: t("admin.adminNotification.updateOrderStatus"),
      time: new Date(Date.now() - 1000 * 60 * 30),
      read: true,
    },
    {
      id: 3,
      title: t("admin.adminNotification.reminderEvent"),
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
    },
  ];
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success(t("admin.adminNotification.markAllAsRead"));
  };

  const NotificationItem = ({ notification }: { notification: any }) => (
    <div
      key={notification.id}
      className={`p-3 rounded-md shadow-sm transition-all ${
        notification.read
          ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          : "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-200 font-medium"
      }`}
    >
      <h4 className="font-medium">{notification.title}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {formatDistanceToNow(notification.time, {
          addSuffix: true,
          locale: vi,
        })}
      </p>
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">{unreadCount}</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-100  p-0">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="font-semibold text-lg">
            {t("admin.adminNotification.notification")}
          </span>
          <Button size="sm" variant="ghost" onClick={markAllAsRead}>
            {t("admin.adminNotification.markAllAsRead")}
          </Button>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2 h-10 border-b">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-b-2 data-[state=active]:border-green-500"
            >
              {t("admin.adminNotification.all")}
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=active]:border-b-2 data-[state=active]:border-green-500"
            >
              {t("admin.adminNotification.unread")}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="all"
            className="max-h-64 overflow-y-auto p-4 space-y-2"
          >
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                {t("admin.adminNotification.noNotification")}
              </p>
            ) : (
              notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))
            )}
          </TabsContent>
          <TabsContent
            value="unread"
            className="max-h-64 overflow-y-auto p-4 space-y-2"
          >
            {notifications.filter((n) => !n.read).length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                {t("admin.adminNotification.noUnreadNotification")}
              </p>
            ) : (
              notifications
                .filter((n) => !n.read)
                .map((n) => <NotificationItem key={n.id} notification={n} />)
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
