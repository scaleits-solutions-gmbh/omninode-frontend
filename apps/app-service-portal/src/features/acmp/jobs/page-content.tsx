"use client";
import { JobList } from "./list/job-list";
import { PlusIcon, TerminalIcon, MonitorUp } from "lucide-react";
import PushClientCommandPopup from "./push-client-command/push-client-command-popup";
import PushRolloutPopup from "./push-rollout/push-rollout-popup";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  PageHeader,
} from "@repo/pkg-frontend-common-kit/components";
import { toast } from "sonner"

export default function JobsPageContent() {
  return (
    <>
      <PageHeader
        title="Jobs"
        subtitle="Monitor and manage ACMP automation jobs and deployments"
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <PlusIcon className="w-4 h-4" />
                New Job
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={(event) => {event.preventDefault(); toast.info("Will be available ASAP"); }}>
                <TerminalIcon className="w-4 h-4" />
                Push Client Command
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(event) => {event.preventDefault(); toast.info("Will be available ASAP"); }}>
                <MonitorUp className="w-4 h-4" />
                Push Rollout Template
              </DropdownMenuItem>
              {/* <PushClientCommandPopup />
              <PushRolloutPopup /}>*/}
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
      <JobList />
    </>
  );
}
