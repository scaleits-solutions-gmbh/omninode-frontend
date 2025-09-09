import { AcmpJobListItem } from "@repo/lib-api-client";
import {
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
  TabsTrigger,
  Card,
  CardContent,
  Input,
  Label,
} from "@repo/pkg-frontend-common-kit/components";

interface JobDetailsPopupProps {
  job?: AcmpJobListItem;
  onClose: () => void;
}

export const JobDetailsPopup = ({ job, onClose }: JobDetailsPopupProps) => {
  if (!job) return null;

  const display = (value?: string | number | null) => {
    if (value === null || value === undefined) return "—";
    const str = String(value);
    return str.trim() === "" ? "—" : str;
  };

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">Job Details</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected ACMP job.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-sm">{display(job.name)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Type</p>
              <p className="text-sm">{display(job.type)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <p className="text-sm">{display(job.status)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date Time</p>
              <p className="text-sm">{display(job.dateTime ? new Date(job.dateTime).toLocaleString() : "")}</p>
            </div>
          </div>

          <Tabs defaultValue="properties">
            <TabsList>
              <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="properties">
              <Card>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Name</Label>
                      <Input value={display(job.name)} disabled readOnly />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Type</Label>
                      <Input value={display(job.type)} disabled readOnly />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Status</Label>
                      <Input value={display(job.status)} disabled readOnly />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Author</Label>
                      <Input value={display(job.author)} disabled readOnly />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Date Time</Label>
                      <Input value={display(job.dateTime ? new Date(job.dateTime).toLocaleString() : "")} disabled readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>
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
