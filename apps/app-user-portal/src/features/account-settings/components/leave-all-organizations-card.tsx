import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/pkg-frontend-common-kit/components";

export default function LeaveAllOrganizationsCard() {
  return (
    <Card className="border-destructive/40">
      <CardHeader>
        <CardTitle>Leave all organizations</CardTitle>
        <CardDescription>
          Before you can leave all organizations, you need to:
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button disabled={true} variant="destructive" className="w-fit">
          Leave all organizations
        </Button>
        </CardFooter>
    </Card>
  );
}