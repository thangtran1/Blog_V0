"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PopConfirmProps {
  onConfirm: () => void;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
}

export function PopConfirm({
  onConfirm,
  trigger,
  title = "Xác nhận xoá",
  description = "Bạn có chắc chắn muốn xoá không?",
}: PopConfirmProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="bg-white p-4 shadow-lg border rounded-md w-64 z-50">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <div className="flex justify-end gap-2 mt-3">
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
            Huỷ
          </Button>
          <Button size="sm" variant="destructive" onClick={handleConfirm}>
            Xoá
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
