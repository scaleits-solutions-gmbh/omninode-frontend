import WeclappCompaniesWithAccess from "./weclapp-companies-with-access";
import WeclappServiceIntanceConnectionDetails from "./weclapp-service-instance-connection-details";
import ServiceInstanceDetails from "../global/service-instance-details";
import UsersWithAccess from "../global/users-with-access";
import { PageHeader } from "frontend-common-kit/components";

export default function WeclappServiceInstancePageContent() {
  return (
    <>
      <PageHeader
        title="Service Instance Details"
        subtitle="Configure Weclapp connection settings and manage user access"
      />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-1">
          <ServiceInstanceDetails />
          <WeclappServiceIntanceConnectionDetails />
        </div>
        <div className="xl:col-span-2 space-y-6">
          <UsersWithAccess />
          <WeclappCompaniesWithAccess />
        </div>
      </div>
    </>
  );
}
