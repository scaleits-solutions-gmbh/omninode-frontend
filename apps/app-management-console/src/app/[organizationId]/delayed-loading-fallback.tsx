"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function DelayedLoadingFallback() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Only show loader after a delay to avoid flashing on cache hits
    // If OrganizationGuard resolves quickly (cache hit), Suspense won't show this fallback
    // If it takes time (cache miss), this will show after the delay
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 150); // 150ms delay - cache hits should resolve faster than this

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

