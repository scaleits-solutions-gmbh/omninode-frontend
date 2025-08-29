import PageHeader from "@/components/display/pageHeader";
import LoadingDetailsCard from "./loading/LoadingDetailsCard";
import LoadingConnectionDetailsCard from "./loading/LoadingConnectionDetailsCard";
import LoadingCompaniesWithAccess from "./loading/LoadingCompaniesWithAccess";
import LoadingUserWithAccess from "./loading/LoadingUsersWithAccess";

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
