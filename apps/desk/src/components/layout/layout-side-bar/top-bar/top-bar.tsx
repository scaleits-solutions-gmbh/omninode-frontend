import { Button, Separator, SidebarTrigger } from "@repo/pkg-frontend-common-kit/components";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { AutoBreadCrumbs, AutoBreadCrumbsProps } from "./auto-bread-crumbs";
import UserIndicator from "./user-indicator";

interface TopBarProps extends AutoBreadCrumbsProps {
  category: string;
  isLoggedIn: boolean;
}

export default function TopBar({
  category,
  breadcrumbs,
  isLoggedIn,
}: TopBarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <AutoBreadCrumbs category={category} breadcrumbs={breadcrumbs} />
      </div>

      {isLoggedIn ? (
        <UserIndicator />
      ) : (
        <Link href={process.env.NEXT_PUBLIC_SERVICE_PORTAL_URL || ""}>
          <Button variant="secondary" size="icon">
            <LogIn className="size-5 hover:text-primary transition-all duration-100" />
          </Button>
        </Link>
      )}
    </header>
  );
}
