import { Card, CardContent, Input, Label } from "@repo/pkg-frontend-common-kit/components";
import type { AcmpClientListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

interface ClientNetworkTabProps {
  client: AcmpClientListItemReadModel;
}

export const ClientNetworkTab = ({ client }: ClientNetworkTabProps) => {
  const display = (value?: string | number | null) => {
    if (value === null || value === undefined) return "—";
    const str = String(value);
    return str.trim() === "" ? "—" : str;
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Domain</Label>
            <Input value={display(client.domainFqdn)} disabled readOnly />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
