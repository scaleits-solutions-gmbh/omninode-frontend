import { AcmpClientListItem } from "@repo/lib-api-client";
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
} from "@repo/pkg-frontend-common-kit/components";
import { ClientInstalledSoftwareList } from "./client-installed-software-list";
import { ClientNetworkList } from "./client-network-list";
import { ClientHardwareList } from "./client-hardware-list";
import { ClientGeneralTab } from "./client-general-tab";

interface ClientDetailsPopupProps {
  client?: AcmpClientListItem;
  onClose: () => void;
}

export const ClientDetailsPopup = ({ client, onClose }: ClientDetailsPopupProps) => {
  if (!client) {
    return null;
  }

  const display = (value?: string | number | null) => {
    if (value === null || value === undefined) return "—";
    const str = String(value);
    return str.trim() === "" ? "—" : str;
  };

  return (
    <Dialog open={!!client} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">Client Details</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected ACMP client.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 overflow-auto pr-1">
          {/* Summary band */}
          <div className="flex justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-sm">{display(client.name)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Client No</p>
              <p className="text-sm">{display(client.clientNo)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tenant</p>
              <p className="text-sm">{display(client.tenantName)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Update</p>
              <p className="text-sm">{display(client.lastUpdate ? new Date(client.lastUpdate).toLocaleString() : "")}</p>
            </div>
          </div>
          <div className="w-full min-w-0">
          <Tabs defaultValue="properties">
            <TabsList>
              <TabsTrigger value="properties">General</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="software">Installed Software</TabsTrigger>
            </TabsList>
            <TabsContent value="properties">
              <ClientGeneralTab client={client} />
            </TabsContent>
            <TabsContent value="hardware">
              <ClientHardwareList clientId={client.id} />
            </TabsContent>
            <TabsContent value="network">
              <ClientNetworkList clientId={client.id} />
            </TabsContent>
            <TabsContent value="software">
              <ClientInstalledSoftwareList clientId={client.id} />
            </TabsContent>
          </Tabs>
          </div>
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
