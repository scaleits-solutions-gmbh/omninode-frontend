import { AcmpClientListItem } from "@repo/lib-api-client";
import { Card, CardContent, Input, Label } from "@repo/pkg-frontend-common-kit/components";

interface ClientNetworkTabProps {
  client: AcmpClientListItem;
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
            <Label>IP Address</Label>
            <Input value={display(client.ipAddress)} disabled readOnly />
          </div>
          <div className="space-y-1.5">
            <Label>Domain</Label>
            <Input value={display(client.domainFqdn)} disabled readOnly />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
