import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/pkg-frontend-common-kit/components";
import { Users, Layers2, Building2, ShieldCheck, Smile, Bell, Group } from "lucide-react";
import KpiCard from "./kpi-card";
import { useOrganizationId } from "@/hooks/use-organization-id";
export default function KpiCards() {
  const organizationId = useOrganizationId();
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Service Instances"
        value={7}
        icon={<Layers2 className="h-4 w-4 text-muted-foreground" />}
        href={`/${organizationId}/service-instances`}
      />
      <KpiCard
        label="Org Relationships"
        value={4}
        icon={<Smile className="h-4 w-4 text-muted-foreground" />}
        href={`/${organizationId}/organization-relationships`}
      />
      <KpiCard
        label="Users"
        value={10}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        href={`/${organizationId}/users`}
      />
      <KpiCard
        label="Groups"
        value={"0"}
        icon={<Group className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
