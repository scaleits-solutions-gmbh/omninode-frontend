import {
  Card,
  CardHeader,
  CardContent,
  Skeleton,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/pkg-frontend-common-kit/components";

interface OrganizationRelationshipGrantsCardLoadingProps {
  rows: number;
  cols: {
    col1: { width: number; minWidth: number };
    col2: { width: number; minWidth: number };
    col3: { width: number; minWidth: number };
  };
}
export default function OrganizationRelationshipGrantsCardLoading({
  rows,
  cols,
}: OrganizationRelationshipGrantsCardLoadingProps) {
  const skeletonRows = Array.from({ length: rows });

  return (
    <Card>
      <CardHeader className="flex gap-2 justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-72" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className={`w-[${cols.col1.width}%] min-w-[${cols.col1.minWidth}px]`}
                >
                  <Skeleton className="h-3 w-24" />
                </TableHead>
                <TableHead
                  className={`w-[${cols.col2.width}%] min-w-[${cols.col2.minWidth}px]`}
                >
                  <Skeleton className="h-3 w-24" />
                </TableHead>
                <TableHead
                  className={`w-[${cols.col3.width}%] min-w-[${cols.col3.minWidth}px]`}
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {skeletonRows.map((_, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={`w-[${cols.col1.width}%] min-w-[${cols.col1.minWidth}px]`}
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-8 rounded-md" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  </TableCell>
                  <TableCell
                    className={`w-[${cols.col2.width}%] min-w-[${cols.col2.minWidth}px]`}
                  >
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell
                    className={`w-[${cols.col3.width}%] min-w-[${cols.col3.minWidth}px]`}
                  >
                    <div className="flex justify-end">
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
