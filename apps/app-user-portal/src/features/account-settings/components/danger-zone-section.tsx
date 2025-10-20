import DeleteAccountCard from "./delete-account-card";
import LeaveAllOrganizationsCard from "./leave-all-organizations-card";
export default function DangerZoneSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Danger zone</h3>
      <LeaveAllOrganizationsCard />
      <DeleteAccountCard />
    </div>
  );
}