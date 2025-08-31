

import { AppLogoDescriptive } from "@/components/custom/app-logo-descriptive";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  Skeleton
} from "@repo/pkg-frontend-common-kit/components";

export function SidebarSkeleton() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-0 flex justify-center">
            <Link href="/">
              <AppLogoDescriptive />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* First Company */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 p-0">
            <Skeleton className="w-6 h-6 rounded-md" />
            <Skeleton className="w-20 h-4" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* First Service Instance */}
              <SidebarMenuItem>
                <div className="flex items-center gap-2 w-full p-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-4 h-4 ml-auto" />
                </div>
                {/* Submenu items */}
                <div className="pl-6 space-y-1">
                  <div className="flex items-center p-2">
                    <Skeleton className="w-16 h-4" />
                  </div>
                  <div className="flex items-center p-2">
                    <Skeleton className="w-20 h-4" />
                  </div>
                  <div className="flex items-center p-2">
                    <Skeleton className="w-24 h-4" />
                  </div>
                </div>
              </SidebarMenuItem>
              {/* Second Service Instance */}
              <SidebarMenuItem>
                <div className="flex items-center gap-2 w-full p-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-4 h-4 ml-auto" />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Second Company */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 p-0">
            <Skeleton className="w-6 h-6 rounded-md" />
            <Skeleton className="w-28 h-4" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Third Service Instance */}
              <SidebarMenuItem>
                <div className="flex items-center gap-2 w-full p-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-4 h-4 ml-auto" />
                </div>
              </SidebarMenuItem>
              {/* Fourth Service Instance */}
              <SidebarMenuItem>
                <div className="flex items-center gap-2 w-full p-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-4 h-4 ml-auto" />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <div className="flex items-center gap-2 p-2">
          <Skeleton className="w-8 h-8 rounded-md" />
          <div className="flex-1 flex flex-col gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
