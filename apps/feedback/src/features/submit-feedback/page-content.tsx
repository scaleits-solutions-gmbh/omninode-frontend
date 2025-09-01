"use client";
import {
  Button,
  Input,
  Card,
  CardContent,
  LayoutCenteredXY,
  Textarea,
} from "@repo/pkg-frontend-common-kit/components";
import Image from "next/image";
import { useState } from "react";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import Link from "next/link";
import { Plus, Bug, MessageSquare } from "lucide-react";
export default function PageContent() {
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<
    "featureRequest" | "bugReport" | "other"
  >("featureRequest");
  return (
    <LayoutCenteredXY showHeader={false}>
      <div className="flex flex-col gap-4 items-center w-full gap-4 max-w-md">
        <div className="flex flex-col gap-4 items-center">
          <Image
            src="/assets/logo-light.svg"
            alt="OmniNode"
            height={100}
            width={150}
            className="dark:hidden"
          />
          <Image
            src="/assets/logo-dark.svg"
            alt="OmniNode"
            height={100}
            width={150}
            className="hidden dark:block"
          />
          <h1 className="">Feedback</h1>
        </div>

        <Card className="w-full">
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Card
                className="flex-1"
                onClick={() => setSelectedFeedbackType("featureRequest")}
              >
                <CardContent className="h-full flex flex-col gap-2 items-center justify-center">
                  <Plus className="size-6 text-green-400" />

                  <h6 className="">Feature Request</h6>
                </CardContent>
              </Card>
              <Card
                className="flex-1"
                onClick={() => setSelectedFeedbackType("bugReport")}
              >
                <CardContent className="h-full flex flex-col gap-2 items-center justify-center">
                  <Bug className="size-6 text-red-400" />
                  <h6 className="">Bug Report</h6>
                </CardContent>
              </Card>
              <Card
                className="flex-1"
                onClick={() => setSelectedFeedbackType("other")}
              >
                <CardContent className="h-full flex flex-col gap-2 items-center justify-center">
                  <MessageSquare className="size-6 text-blue-400" />
                  <h6 className="">Other</h6>
                </CardContent>
              </Card>
            </div>

            <Input placeholder="Subject" />
            <Textarea placeholder="Description" />
            <div
              className="flex flex-col justify-end gap-4 items-center
            "
            >
              <Button className="w-full">Submit</Button>
              <Link href={getOriginUrl()}>
                <Button
                  className="p-0 h-fit text-sm text-foreground hover:text-primary"
                  variant="link"
                >
                  Back to Platform
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutCenteredXY>
  );
}
