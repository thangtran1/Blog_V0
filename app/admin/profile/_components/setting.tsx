"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Setting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cài đặt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="darkmode">Chế độ tối</Label>
          <Switch id="darkmode" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notify">Thông báo</Label>
          <Switch id="notify" />
        </div>
      </CardContent>
    </Card>
  );
}
