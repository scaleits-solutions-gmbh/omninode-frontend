"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@repo/pkg-frontend-common-kit/components";

export default function DeleteOrganizationCard() {
  return (
    <Card className="border-destructive/40">
      <CardHeader>
        <CardTitle>Delete organization</CardTitle>
        <CardDescription>
          This action is permanent and cannot be undone. All organization data will be removed.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button disabled={true} variant="destructive" className="w-fit" onClick={() => {}}>
          Delete organization
        </Button>
      </CardFooter>
    </Card>
  );
}


