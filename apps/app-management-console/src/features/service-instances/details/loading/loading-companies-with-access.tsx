import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  DataTablePaginationLoading,
  TableRow,
} from "frontend-common-kit";

export default function LoadingUserWithAccess() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-4 w-full max-w-48" />
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">
                    <Skeleton className="h-4 w-full" />
                  </TableHead>
                  <TableHead className="w-1/4">
                    <Skeleton className="h-4 w-full" />
                  </TableHead>
                  <TableHead className="w-1/4">
                    <Skeleton className="h-4 w-full" />
                  </TableHead>
                  <TableHead className="w-1/4">
                    <Skeleton className="h-4 w-full" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-1/4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    </TableCell>
                    <TableCell className="w-1/4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell className="w-1/4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell className="w-1/4">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DataTablePaginationLoading showRowsPerPage={false} />
        </CardContent>
      </Card>
    </div>
  );
}
