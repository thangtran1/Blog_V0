"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ChangePassword() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đổi mật khẩu</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="darkmode">Mật khẩu hiện tại</Label>
          <Input id="darkmode" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notify">Mật khẩu mới</Label>
          <Input id="notify" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notify">Xác nhận mật khẩu</Label>
          <Input id="notify" />
        </div>
        <Button>Đổi mật khẩu</Button>
      </CardContent>
    </Card>
  );
}
