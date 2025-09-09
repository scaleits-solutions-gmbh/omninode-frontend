import { AcmpClientListItem } from "@repo/lib-api-client";
import { Card, CardContent, Input, Label } from "@repo/pkg-frontend-common-kit/components";

interface ClientGeneralTabProps {
  client: AcmpClientListItem;
}

export const ClientGeneralTab = ({ client }: ClientGeneralTabProps) => {
  const display = (value?: string | number | null) => {
    if (value === null || value === undefined) return "—";
    const str = String(value);
    return str.trim() === "" ? "—" : str;
  };

  const osNameVersion = [client.osName, client.osDisplayVersion].filter(Boolean).join(" ");
  const osText = client.osArchitecture
    ? (osNameVersion ? `${osNameVersion} (${client.osArchitecture})` : `(${client.osArchitecture})`)
    : osNameVersion;


  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input value={display(client.name)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>Client No</Label>
            <Input value={display(client.clientNo)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>Tenant</Label>
            <Input value={display(client.tenantName)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>Last Update</Label>
            <Input value={display(client.lastUpdate ? new Date(client.lastUpdate).toLocaleString() : "")} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>OS</Label>
            <Input value={display(osText)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>Last Logged-On User</Label>
            <Input value={display(client.lastLoggedOnUser)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>ACMP Version</Label>
            <Input value={display(client.installedAcmpVersion)} disabled readOnly />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


