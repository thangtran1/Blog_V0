"use client";

import { useEffect, useState } from "react";
import { Button, Upload, message, theme, Popconfirm } from "antd";
import { RcFile } from "antd/es/upload";
import {
  callDeleteCV,
  callFetchCV,
  callUploadCV,
  ICV,
} from "@/lib/api-services";
import { Eye, Trash2, UploadIcon } from "lucide-react";
import { useI18n } from "@/i18n/i18n-provider";

export default function AdminCVPage() {
  const { t } = useI18n();
  const [cv, setCV] = useState<ICV | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();

  const fetchCV = async () => {
    try {
      const res = await callFetchCV();
      setCV(res.data);
    } catch {
      message.error(t("admin.cv.error"));
    }
  };

  const handleUpload = async (file: RcFile) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await callUploadCV(formData);
      setCV(res.data);
      message.success(t("admin.cv.success"));
    } catch (error) {
      console.error("Upload error:", error);
      message.error(t("admin.cv.error"));
    } finally {
      setLoading(false);
    }

    return false;
  };

  useEffect(() => {
    fetchCV();
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
        {t("admin.cv.title")}
      </h2>

      <div className="rounded-2xl border border-green-300 dark:border-green-700 shadow-lg p-6 transition-colors duration-300">
        {cv ? (
          <div className="space-y-4">
            <p className="text-lg font-medium">
              {t("admin.cv.currentFile")}:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {cv.fileName}
              </span>
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/${cv.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition"
              >
                <Eye className="w-4 h-4" />
                {t("admin.cv.view")}
              </a>

              <Popconfirm
                className="hover:bg-red-500 hover:text-white"
                title={t("admin.cv.deleteCV")}
                description={t("admin.cv.deleteCVDescription")}
                onConfirm={async () => {
                  try {
                    await callDeleteCV(cv._id);
                    setCV(null);
                    message.success(t("admin.cv.successDelete"));
                  } catch (err) {
                    console.error(err);
                    message.error(t("admin.cv.errorDelete"));
                  }
                }}
                okText={t("admin.cv.delete")}
                cancelText={t("admin.cv.cancel")}
              >
                <Button
                  size="large"
                  className="border border-red-500 text-red-500 hover:!text-red-500"
                  icon={<Trash2 className="w-4 h-4" />}
                >
                  {t("admin.cv.delete")}
                </Button>
              </Popconfirm>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">
            {t("admin.cv.noCV")}
          </p>
        )}

        <div className="mt-6">
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept=".pdf,.doc,.docx"
          >
            <Button icon={<UploadIcon />} loading={loading}>
              {t("admin.cv.upload")}
            </Button>
          </Upload>
        </div>
      </div>
    </div>
  );
}
