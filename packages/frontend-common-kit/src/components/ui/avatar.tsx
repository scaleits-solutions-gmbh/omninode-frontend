"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { availableColor, generateColor } from "@/utils/ui/colorgen"
import { cn } from "@/utils/ui/cn";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

const colorMap: Record<availableColor, string> = {
  blue: "bg-blue-100 text-blue-700",
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  pink: "bg-pink-100 text-pink-700",
  brown: "bg-yellow-900/20 text-yellow-900",
  gray: "bg-gray-100 text-gray-700",
};

function AvatarFallback({
  className,
  seed,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & { seed?: string }) {
  const colorClasses = seed
    ? colorMap[generateColor(seed)]
    : "bg-primary/10 text-primary";

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "font-medium flex size-full items-center justify-center",
        colorClasses,
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
