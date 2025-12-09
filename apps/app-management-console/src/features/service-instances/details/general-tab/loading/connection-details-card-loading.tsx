import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";

export default function ConnectionDetailsCardLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-base leading-tight">
            <Skeleton className="h-4 w-40" />
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16 rounded-full" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}

