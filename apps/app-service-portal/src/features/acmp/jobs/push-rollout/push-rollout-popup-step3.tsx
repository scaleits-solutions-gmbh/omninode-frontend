import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Textarea,
} from "@repo/pkg-frontend-common-kit/components";
import {
  TerminalIcon,
  MonitorUp,
  MonitorIcon,
  CheckCircle,
  Pencil,
} from "lucide-react";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { getAcmpServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import type { AcmpRolloutTemplateListItemReadModel, AcmpClientListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PushRolloutPopupStep3Props {
  rollout: AcmpRolloutTemplateListItemReadModel;
  clients: AcmpClientListItemReadModel[];
  onFinish: () => void;
  onBack: () => void;
}

export default function PushRolloutPopupStep3({
  rollout,
  clients,
  onFinish,
  onBack,
}: PushRolloutPopupStep3Props) {
  const { viewId } = useParams();

  const [overrides, setOverrides] = useState<Record<string, { newName?: string; newDescription?: string }>>({});
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const pushMutation = useAuthedMutation<void, { rolloutId: string; clientIds: string[] }>({
    mutationFn: async ({ session, variables }) => {
      await getAcmpServiceClient(session).pushAcmpRolloutTemplate({
        pathParams: { viewId: viewId as string },
        body: variables,
      });
    },
  });

  const handlePush = async () => {
    onFinish();
    const payload = {
      rolloutId: rollout.id,
      clientIds: clients.map(c => c.id),
    };
    const promise = pushMutation.mutateAsync(payload);
    toast.promise(promise, {
      loading: "Pushing rollout template...",
      success: "Rollout template pushed successfully",
      error: (err: unknown) => (err as { message?: string })?.message ?? "Failed to push rollout template",
    });
  };

  const openEdit = (client: AcmpClientListItemReadModel) => {
    setEditingClientId(client.id);
    const ov = overrides[client.id] || {};
    setEditName(ov.newName ?? "");
    setEditDescription(ov.newDescription ?? "");
  };

  const closeEdit = () => {
    setEditingClientId(null);
    setEditName("");
    setEditDescription("");
  };

  const saveEdit = () => {
    if (!editingClientId) return;
    setOverrides(prev => ({
      ...prev,
      [editingClientId]: { newName: editName, newDescription: editDescription },
    }));
    closeEdit();
  };
  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 bg-primary/10 rounded-md">
            <MonitorUp className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Ready to Push Rollout Template</h2>
        <p className="text-sm text-muted-foreground">
          Review the details below before pushing the command to selected
          clients
        </p>
      </div>

      {/* Rollout Template Details */}
      <Card>
        <CardContent className="space-y-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TerminalIcon className="w-4 h-4" />
            Selected Rollout Template
          </CardTitle>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-base">{rollout.name}</h3>
              <p className="text-xs text-muted-foreground">
                Rollout Template details and description
              </p>
            </div>
            <Badge variant="secondary">{rollout.os}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Clients Summary */}
      <Card>

        <CardContent>
          <div className="space-y-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MonitorIcon className="w-4 h-4" />
              Target Clients
            </CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Total clients selected:
              </span>
              <Badge variant="outline">
                {clients.length} client{clients.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            {/* Client List */}
            <div className="max-h-64 overflow-y-auto space-y-2">
              {clients.map((client) => {
                const ov = overrides[client.id];
                const hasOverride = Boolean((ov?.newName ?? "").trim() || (ov?.newDescription ?? "").trim());
                return (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-primary/10 rounded">
                      <MonitorIcon className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{client.name}</p>
                      {hasOverride && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {ov?.newName?.trim() && (<span>New name: <span className="font-medium">{ov.newName}</span></span>)}
                          {ov?.newName?.trim() && ov?.newDescription?.trim() && <span> • </span>}
                          {ov?.newDescription?.trim() && (<span>Desc set</span>)}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Client #{client.clientNo}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(client)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {client.tenantName}
                  </Badge>
                </div>
              );})}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={Boolean(editingClientId)} onOpenChange={(open) => !open && closeEdit()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit rollout target name and description</DialogTitle>
            <DialogDescription>
              Set a custom name and description for this client in the rollout.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">New name</label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Leave empty to use client name" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">New description</label>
              <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Leave empty to use client name" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeEdit}>Cancel</Button>
            <Button onClick={saveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Alert */}
      <Alert variant="default">
        <CheckCircle />
        <AlertDescription>
          <span className="font-medium">Ready to execute</span>
          The command &quot;{rollout.name}&quot; will be pushed to {clients.length}{" "}
          client{clients.length !== 1 ? "s" : ""}
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handlePush}>Push Rollout Template</Button>
      </div>
    </div>
  );
}
