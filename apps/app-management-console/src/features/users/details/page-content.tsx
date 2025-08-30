import UserDetailsCard from "./user-details-card";
import UserServiceInstances from "./user-service-instances";
import { PageHeader } from "frontend-common-kit/components";
export default function PageContent() {
  return (
    <>
      <PageHeader
        title="User Details"
        subtitle="Manage user details and service instances"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <UserDetailsCard />
        </div>
        <div className="md:col-span-2">
          <UserServiceInstances />
        </div>
      </div>
    </>
  );
}
