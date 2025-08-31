import AcmpCompaniesWithAccess from "./acmp-companies-with-access";
import AcmpServiceIntanceConnectionDetails from "./acmp-service-instance-connection-details";
import ServiceInstanceDetails from "../global/service-instance-details";
import UsersWithAccess from "../global/users-with-access";
import { PageHeader } from "../../../../../../../packages/frontend-common-kit/dist/components";

export default function WeclappServiceInstancePageContent() {
  return (
    <>
      <PageHeader
        title="Service Instance Details"
        subtitle="Configure ACMP connection settings and manage user access"
      />
      <div className="grid gap-6 xl:grid-cols-3">
        <div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-1">
            <ServiceInstanceDetails />
            <AcmpServiceIntanceConnectionDetails />
          </div>
        </div>
        <div className="xl:col-span-2">
          <div className="space-y-6">
            <UsersWithAccess />
            <AcmpCompaniesWithAccess />
          </div>
        </div>
      </div>
    </>
  );
}
