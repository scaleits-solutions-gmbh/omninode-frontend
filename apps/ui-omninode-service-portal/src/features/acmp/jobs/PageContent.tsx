import PageHeader from "@/components/display/pageHeader";
import { JobList } from "./list/JobList";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PushClientCommandPopup from "./pushClientCommand/PushClientCommandPopup";
import PushRolloutPopup from "./pushRollout/PushRolloutPopup";

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
