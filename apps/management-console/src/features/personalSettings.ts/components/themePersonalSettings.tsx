"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { updateTheme } from "@/lib/apiClient/user-settings/theme";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ThemePersonalSettings() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: updateThemeMutation } = useMutation({
    mutationFn: (selectedTheme: string) => {
      toast.loading("Updating theme preference...", {
        id: "update-theme",
      });
      return updateTheme(selectedTheme)
    },
    onSuccess: () => {
      toast.dismiss("update-theme");
      toast.success("Theme preference updated successfully");
    },
    onError: () => {
      toast.dismiss("update-theme");
      toast.error("Failed to update theme preference");
    },
  });
  useEffect(() => {
    setMounted(true);
    setSelectedTheme(theme || "system");
  }, [theme]);

  const handleSelect = (value: string) => {
    setTheme(value);
    setSelectedTheme(value);
    updateThemeMutation(value);
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Theme Preference</h3>
      <div className="flex gap-4">
        <div
          className={`p-2 flex-1 space-y-2 rounded-md border-2 cursor-pointer ${
            mounted && selectedTheme === "light"
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => handleSelect("light")}
        >
          <div className="h-40 bg-neutral-100 rounded-md"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Light</span>
            <span className="text-sm text-muted-foreground">Default Theme</span>
          </div>
        </div>
        <div
          className={`p-2 flex-1 space-y-2 rounded-md border-2 cursor-pointer ${
            mounted && selectedTheme === "dark"
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => handleSelect("dark")}
        >
          <div className="h-40 bg-neutral-800 rounded-md"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Dark</span>
            <span className="text-sm text-muted-foreground">
              Beautiful dark colors
            </span>
          </div>
        </div>

        <div
          className={`p-2 flex-1 space-y-2 rounded-md border-2 cursor-pointer ${
            mounted && selectedTheme === "system"
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => handleSelect("system")}
        >
          {mounted ? (
            <div
              className={
                "h-40 rounded-md " +
                (systemTheme === "dark" ? "bg-neutral-800" : "bg-neutral-100")
              }
            ></div>
          ) : (
            <div className="h-40 rounded-md bg-slate-100"></div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">System</span>
            <span className="text-sm text-muted-foreground">
              Follow system settings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
