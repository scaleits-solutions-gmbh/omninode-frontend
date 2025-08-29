import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCompanyInviteCard() {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="text-center space-y-2 mb-2">
          <Skeleton className="h-7 w-48 mx-auto" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>

        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex items-center gap-6">
            <div className="flex flex-col text-center items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="flex flex-col">
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            <Skeleton className="h-6 w-6" />
            <div className="flex flex-col text-center items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-md" />
              <div className="flex flex-col">
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
          <Skeleton className="h-5 w-80" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
