import { fetchServiceInstance } from "@/lib/api-client/service-instances";
import { FeWeclappServiceInstanceDetails } from "@/types/fe/fe-service-instance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Label,
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DeletePopup() {
  const [open, setOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const { id } = useParams();
  const { data: serviceInstance } = useQuery({
    queryKey: ["serviceInstance", id],
    queryFn: () =>
      fetchServiceInstance(
        id as string,
      ) as Promise<FeWeclappServiceInstanceDetails>,
  });

  const instanceName = serviceInstance?.instanceName || "";

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete confirmed");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle>Delete Service Instance</DialogTitle>
        </DialogHeader>
        <p className="py-4 text-sm text-muted-foreground">
          Are you sure you want to delete this service instance? This action
          cannot be undone.
        </p>
        <div className="space-y-4">
          <Label htmlFor="instanceName">
            Type &ldquo;{instanceName}&rdquo; to confirm
          </Label>
          <Input
            id="instanceName"
            placeholder="Enter instance name to confirm"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={inputName !== instanceName}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
