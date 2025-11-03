/* Commented out - service-instances feature
import {
  Card,
  CardContent,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";

export default function LoadingDetailsCard() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-full max-w-48" />
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-full max-w-32" />
              <Skeleton className="h-4 w-full max-w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-full max-w-48" />
          <Skeleton className="h-4 w-full max-w-32" />
          <Skeleton className="h-4 w-full max-w-24" />
          <Skeleton className="h-4 w-full max-w-12" />
        </CardContent>
      </Card>
    </div>
  );
}
*/
