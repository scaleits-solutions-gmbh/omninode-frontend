import { Card, CardContent, Input, Label } from "@repo/pkg-frontend-common-kit/components";
import { formatStorageSize } from "@repo/pkg-frontend-common-kit/utils";
import type { AcmpClientListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

interface ClientHardwareTabProps {
  client: AcmpClientListItemReadModel;
}

export const ClientHardwareTab = ({ client }: ClientHardwareTabProps) => {
  const display = (value?: string | number | null) => {
    if (value === null || value === undefined) return "—";
    const str = String(value);
    return str.trim() === "" ? "—" : str;
  };

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
            <Label>Hardware</Label>
            <Input value={display(hardwareText)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>CPU</Label>
            <Input value={display(cpuDetails)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>RAM</Label>
            <Input value={display(formatStorageSize(client.ram, 2, 'kb'))} disabled readOnly />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
