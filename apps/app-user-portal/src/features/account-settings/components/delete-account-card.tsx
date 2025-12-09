"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@repo/pkg-frontend-common-kit/components";

export default function DeleteAccountCard() {
  return (
    <Card className="border-destructive/40">
      <CardHeader>
        <CardTitle>Delete account</CardTitle>
        <CardDescription>This action is permanent and cannot be undone.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button disabled={true} variant="destructive" className="w-fit" onClick={() => {}}>
          Delete account
        </Button>
      </CardFooter>
    </Card>
  );
}