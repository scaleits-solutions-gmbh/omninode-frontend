

import { ChevronRight } from "lucide-react";
import {
  Separator,
  Skeleton
} from "../../../../../../../packages/frontend-common-kit/dist/components";

export default function TopBarSkeleton() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        {/* SidebarTrigger skeleton */}
        <Skeleton className="h-6 w-6 -ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center gap-2">
          {/* Category skeleton */}
          <Skeleton className="h-4 w-16 hidden md:block" />
          {/* Breadcrumb separator */}
          <ChevronRight className="h-3 w-3 hidden md:block" />
          {/* Breadcrumb items */}
          <Skeleton className="h-4 w-20" />
          <ChevronRight className="h-3 w-3" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Global search skeleton (hidden) */}
        <div className="hidden">
          <Skeleton className="h-8 w-48" />
        </div>
        {/* User indicator skeleton */}
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    </header>
  );
} 