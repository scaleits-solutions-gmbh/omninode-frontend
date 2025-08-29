import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ResetPasswordCardSkeleton() {
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      <CardContent className="flex flex-col gap-4 items-center">
        {/* Header section */}
        <div className="text-center flex flex-col gap-2">
          <div className="size-12 mx-auto bg-muted rounded-md flex items-center justify-center">
            <Skeleton className="size-6" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-7 w-32 mx-auto" />
            <Skeleton className="h-4 w-44 mx-auto" />
          </div>
        </div>
        
        {/* Form section */}
        <div className="space-y-6 w-full">
          {/* Password field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          
          {/* Confirm password field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-full" />
          </div>
          
          {/* Submit button */}
          <Skeleton className="h-9 w-full" />
        </div>
        
        {/* Back to login link */}
        <Skeleton className="h-4 w-24" />
      </CardContent>
    </Card>
  );
}