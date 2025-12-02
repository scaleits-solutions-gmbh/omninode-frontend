import type { WeclappProjectListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { ProjectMembersList } from "./project-members-list";
import { ProjectDocumentsList } from "./project-documents-list";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@repo/pkg-frontend-common-kit/components";



interface ProjectDetailsPopupProps {
  project?: WeclappProjectListItemReadModel;
  onClose: () => void;
}

export const ProjectDetailsPopup = ({
  project,
  onClose,
}: ProjectDetailsPopupProps) => {
  // Early return if no project

  console.log("project", project);
  if (!project) {
    return null;
  }
  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex members-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Project Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected project, including members and documents.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Summary */}
          <div className="flex justify-between members-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Number
              </p>
              <p className="text-sm">{project.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customer
              </p>
              <p className="text-sm">{project.customer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Start Date
              </p>
              <p className="text-sm">{project.startDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                End Date
              </p>
              <p className="text-sm">{project.endDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Project Leader
              </p>
              <p className="text-sm">
                {(() => {
                  const projectLeader = project.members.find(member => member.role === "PL");
                  return projectLeader 
                    ? `${projectLeader.firstName} ${projectLeader.lastName}`
                    : "Not assigned";
                })()}
              </p>
            </div>
            <div className="flex justify-end items-center">
              <Badge variant="outline" >{project.status}</Badge>
            </div>
          </div>
          <Tabs defaultValue="members">
            <TabsList>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="members">
              <ProjectMembersList project={project} />
            </TabsContent>
            <TabsContent value="documents">
              <ProjectDocumentsList projectId={project.id} />
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
