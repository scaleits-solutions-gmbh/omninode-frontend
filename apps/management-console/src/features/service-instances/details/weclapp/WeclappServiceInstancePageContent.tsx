import PageHeader from "@/components/display/pageHeader";

import UsersWithAccess from "../global/UsersWithAccess";
import WeclappServiceIntanceConnectionDetails from "./WeclappServiceIntanceConnectionDetails";
import ServiceInstanceDetails from "../global/ServiceInstanceDetails";
import WeclappCompaniesWithAccess from "./WeclappCompaniesWithAccess";

export default function WeclappServiceInstancePageContent() {
  return (
    <>
      <PageHeader title="Service Instance Details" />
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
