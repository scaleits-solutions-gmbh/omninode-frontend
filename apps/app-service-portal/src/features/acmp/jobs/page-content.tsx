import { JobList } from "./list/job-list";
import { PlusIcon } from "lucide-react";
import PushClientCommandPopup from "./push-client-command/push-client-command-popup";
import PushRolloutPopup from "./push-rollout/push-rollout-popup";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  PageHeader
} from "frontend-common-kit/components";

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
              <PushClientCommandPopup />
              <PushRolloutPopup />
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
      <JobList />
    </>
  );
}
