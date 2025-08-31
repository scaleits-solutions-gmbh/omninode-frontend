"use client";

import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/utils/ui/cn";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  avatarClassName?: string;
  showRemoveButton?: boolean;
  fallbackText?: string;
}

export function ImageUpload({
  value,
  onChange,
  className,
  avatarClassName,
  showRemoveButton = true,
  fallbackText,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange?.(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.("");
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <Avatar
          className={cn("size-24 cursor-pointer", avatarClassName)}
          onClick={handleClick}
        >
          <AvatarImage src={preview || ""} alt="User avatar" />
          <AvatarFallback className="bg-muted">
            {preview ? (
              fallbackText || "IMG"
            ) : (
              <Upload className="size-6 text-muted-foreground" />
            )}
          </AvatarFallback>
        </Avatar>

        {showRemoveButton && preview && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 size-6 rounded-full p-0"
            onClick={handleRemove}
          >
            <X className="size-3" />
          </Button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={handleClick}
      >
        {preview ? "Change Image" : "Upload Image"}
      </Button>
    </div>
  );
}
