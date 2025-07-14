"use client";

import { useEffect, useState } from "react";
import { Button, Upload, message, Modal, theme, Popconfirm } from "antd";
import {
  UploadOutlined,
  FileTextOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import {
  callDeleteCV,
  callFetchCV,
  callUploadCV,
  ICV,
} from "@/lib/api-services";
import { Eye, Trash2 } from "lucide-react";

export default function AdminCVPage() {
  const [cv, setCV] = useState<ICV | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();

  const fetchCV = async () => {
    try {
      const res = await callFetchCV();
      setCV(res.data);
    } catch {
      message.error("Không thể tải CV.");
    }
  };

  const handleUpload = async (file: RcFile) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await callUploadCV(formData);
      setCV(res.data);
      message.success("Tải lên thành công!");
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Tải lên thất bại.");
    } finally {
      setLoading(false);
    }

    return false;
  };

  useEffect(() => {
    fetchCV();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
        Quản lý CV
      </h2>

      <div
        className="rounded-2xl shadow-lg p-6 transition-colors duration-300"
        style={{
          background: token.colorBgContainer,
          color: token.colorText,
        }}
      >
        {cv ? (
          <div className="space-y-4">
            <p className="text-lg font-medium">
              <FileTextOutlined className="mr-2" />
              Tệp hiện tại:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {cv.fileName}
              </span>
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href={cv.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition"
              >
                <Eye className="w-4 h-4" />
                Xem CV
              </a>

              <Popconfirm
                title="Xoá CV"
                description="Bạn có chắc chắn muốn xoá CV này không?"
                onConfirm={async () => {
                  try {
                    await callDeleteCV(cv._id);
                    setCV(null);
                    message.success("Đã xóa CV.");
                  } catch (err) {
                    console.error(err);
                    message.error("Xóa thất bại.");
                  }
                }}
                okText="Xoá"
                cancelText="Huỷ"
              >
                <Button
                  size="small"
                  className="border border-red-500 text-red-500 hover:!text-white"
                  icon={<Trash2 className="w-4 h-4" />}
                >
                  Xoá
                </Button>
              </Popconfirm>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">
            Chưa có CV nào được tải lên.
          </p>
        )}

        <div className="mt-6">
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept=".pdf,.doc,.docx"
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              Tải lên CV mới
            </Button>
          </Upload>
        </div>
      </div>
    </div>
  );
}
