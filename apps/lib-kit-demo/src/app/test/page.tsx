"use client";
import { Button } from "@repo/pkg-frontend-common-kit/components";
import { Card } from "@repo/pkg-frontend-common-kit/components";

export default function TestPage() {
  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Lib Kit Demo - Test</h1>
      <Card className="p-4">
        <p className="mb-2">This card is from the shared package.</p>
        <Button>Package Button</Button>
      </Card>
    </div>
  );
}


