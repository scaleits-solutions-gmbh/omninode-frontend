import PageHeader from "@/components/display/pageHeader";

import UsersWithAccess from "../global/UsersWithAccess";
import AcmpServiceIntanceConnectionDetails from "./AcmpServiceIntanceConnectionDetails";
import ServiceInstanceDetails from "../global/ServiceInstanceDetails";
import AcmpCompaniesWithAccess from "./AcmpCompaniesWithAccess";

export default function WeclappServiceInstancePageContent() {
  return (
    <>
      <PageHeader title="Service Instance Details" />
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
