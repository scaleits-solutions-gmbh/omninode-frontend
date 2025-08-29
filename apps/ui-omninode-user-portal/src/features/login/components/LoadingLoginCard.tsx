import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingLoginCard() {
    return (
      <Card className="w-full max-w-sm rounded-lg shadow-md">
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {/* Email field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
  
            {/* Password field skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-full" />
            </div>
  
            {/* Remember me and forgot password skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>
  
            {/* Sign in button skeleton */}
            <Skeleton className="h-9 w-full" />
  
            {/* Divider skeleton */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <div className="bg-card px-2">
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
  
            {/* Microsoft button skeleton */}
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  