"use client";
import {
  Button,
  Input,
  Card,
  CardContent,
  LayoutCenteredXY,
  Textarea,
  Label,
} from "@repo/pkg-frontend-common-kit/components";
import Image from "next/image";
import { useState } from "react";
import { cn, getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
import Link from "next/link";
import { Plus, Bug, MessageSquare } from "lucide-react";
export default function Home() {
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<
    "featureRequest" | "bugReport" | "other"
  >("featureRequest");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const isValid = subject.trim().length > 0 && description.trim().length > 0;

  const handleKeySelect = (event: React.KeyboardEvent<HTMLDivElement>, type: "featureRequest" | "bugReport" | "other") => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedFeedbackType(type);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: wire up submit to backend when available
  };
  return (
    <LayoutCenteredXY showHeader={false}>
      <div className="flex flex-col gap-4 items-center w-full max-w-xl">
        <div className="flex flex-col gap-3 items-center">
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
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">We value your feedback</h1>
            <p className="text-muted-foreground text-sm">Tell us what to improve, fix, or consider next.</p>
          </div>
        </div>

        <Card className="w-full">
          <CardContent className="flex flex-col gap-5">
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <div id="type" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedFeedbackType === "featureRequest"}
                    className={cn(
                      "flex-1 cursor-pointer transition-all",
                      selectedFeedbackType === "featureRequest"
                        ? "ring-2 ring-green-400 border-green-400"
                        : "hover:border-foreground/30"
                    )}
                    onClick={() => setSelectedFeedbackType("featureRequest")}
                    onKeyDown={(e) => handleKeySelect(e, "featureRequest")}
                  >
                    <CardContent className="h-full py-3 flex flex-col gap-3 items-center justify-center">
                      <Plus className="size-6 text-green-400" />
                      <span className="text-sm font-medium">Feature Request</span>
                    </CardContent>
                  </Card>
                  <Card
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedFeedbackType === "bugReport"}
                    className={cn(
                      "flex-1 cursor-pointer transition-all",
                      selectedFeedbackType === "bugReport"
                        ? "ring-2 ring-red-400 border-red-400"
                        : "hover:border-foreground/30"
                    )}
                    onClick={() => setSelectedFeedbackType("bugReport")}
                    onKeyDown={(e) => handleKeySelect(e, "bugReport")}
                  >
                    <CardContent className="h-full py-3 flex flex-col gap-3 items-center justify-center">
                      <Bug className="size-6 text-red-400" />
                      <span className="text-sm font-medium">Bug Report</span>
                    </CardContent>
                  </Card>
                  <Card
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedFeedbackType === "other"}
                    className={cn(
                      "flex-1 cursor-pointer transition-all",
                      selectedFeedbackType === "other"
                        ? "ring-2 ring-blue-400 border-blue-400"
                        : "hover:border-foreground/30"
                    )}
                    onClick={() => setSelectedFeedbackType("other")}
                    onKeyDown={(e) => handleKeySelect(e, "other")}
                  >
                    <CardContent className="h-full py-3 flex flex-col gap-3 items-center justify-center">
                      <MessageSquare className="size-6 text-blue-400" />
                      <span className="text-sm font-medium">Other</span>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief summary"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Share details, steps to reproduce, or ideas..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                />
                <div className="text-xs text-muted-foreground text-right">
                  {description.length} characters
                </div>
              </div>

              <div className="flex flex-col justify-end gap-3 items-center">
                <Button className="w-full" type="submit" disabled={!isValid}>
                  Submit
                </Button>
                <Link href={getOriginUrl()}>
                  <Button
                    className="p-0 h-fit text-sm text-foreground hover:text-primary"
                    variant="link"
                    type="button"
                  >
                    Back to Platform
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </LayoutCenteredXY>
  );
}
