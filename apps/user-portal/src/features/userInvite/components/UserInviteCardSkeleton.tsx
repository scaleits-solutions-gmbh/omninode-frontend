import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AppLogo from "@/components/display/appLogo";

export default function LoadingUserInviteCard() {
  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <AppLogo />
      <Card className="w-full max-w-sm rounded-lg shadow-md">
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-7 w-48 mx-auto" />
            <Skeleton className="h-5 w-64 mx-auto" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Skeleton className="rounded-md size-16" />

            <div className="text-center space-y-1">
              <Skeleton className="h-6 w-32 mx-auto" />
              <Skeleton className="h-4 w-40 mx-auto" />
            </div>
          </div>
          
          <Skeleton className="h-9 w-full" />
        </CardContent>
      </Card>
    </div>
  );
} 