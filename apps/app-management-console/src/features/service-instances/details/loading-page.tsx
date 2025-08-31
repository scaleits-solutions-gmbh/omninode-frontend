import LoadingCompaniesWithAccess from "./loading/loading-companies-with-access";
import LoadingConnectionDetailsCard from "./loading/loading-connection-details-card";
import LoadingDetailsCard from "./loading/loading-details-card";
import LoadingUserWithAccess from "./loading/loading-users-with-access";
import { PageHeader } from "../../../../../../packages/frontend-common-kit/dist/components";

export default function LoadingPage() {
  return (
    <>
      <PageHeader title="Service Instance Details" />
      <div className="grid gap-6 xl:grid-cols-3">
        <div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-1">
            <LoadingDetailsCard />
            <LoadingConnectionDetailsCard />
          </div>
        </div>
        <div className="xl:col-span-2">
          <div className="space-y-6">
            <LoadingUserWithAccess />
            <LoadingCompaniesWithAccess />
          </div>
        </div>
      </div>
    </>
  );
}
