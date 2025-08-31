import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";

export default function CompanyDetailsLoading() {
  return (
    <div className="space-y-6">
      {/* Section 1: General Information */}
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* Company Name */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Tax ID */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-14" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-18" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-8" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Primary Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-12" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-14" />
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Company Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Company Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* Company Type */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Company Status */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Skeleton className="h-3.5 w-18" />
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Skeleton className="h-9 w-48" />
      </div>
    </div>
  );
}
