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

  const hardwareText = [client.manufacturer, client.model].filter(Boolean).join(" ");

  const cpuDetails: string = (() => {
    const base = client.cpu ? String(client.cpu) : "";
    const cores = typeof client.cpuCoreCount === "number" && client.cpuCoreCount > 0 ? `${client.cpuCoreCount} cores` : "";
    const threads = typeof client.cpuThreadCount === "number" && client.cpuThreadCount > 0 ? `${client.cpuThreadCount} threads` : "";
    const suffix = [cores, threads].filter(Boolean).join(" / ");
    if (base && suffix) return `${base} · ${suffix}`;
    if (base) return base;
    if (suffix) return suffix;
    return "";
  })();

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input value={display(client.name)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>IP Address</Label>
            <Input value={display(client.ipAddress)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>Domain</Label>
            <Input value={display(client.domainFqdn)} disabled readOnly />
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
            <Label>Hardware</Label>
            <Input value={display(hardwareText)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>CPU</Label>
            <Input value={display(cpuDetails)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>RAM</Label>
            <Input value={display(client.ram)} disabled readOnly />
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


