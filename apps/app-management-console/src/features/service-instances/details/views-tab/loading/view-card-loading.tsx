import { Card, CardTitle, CardContent, Skeleton } from "@repo/pkg-frontend-common-kit/components";

export default function ViewCardLoading() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-base leading-tight">
              <Skeleton className="h-4 w-40" />
            </CardTitle>
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-3 w-20" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-3.5 w-16 rounded-full" />
            <Skeleton className="h-3.5 w-12 rounded-full" />
            <Skeleton className="h-3.5 w-20 rounded-full" />
            <Skeleton className="h-3.5 w-12 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
