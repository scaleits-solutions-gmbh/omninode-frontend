import PageHeader from "@/components/display/pageHeader";
import UserDetailsCard from "./userDetailsCard";
import UserServiceInstances from "./UserServiceInstances";
export default function PageContent() {
  return (
      <>
        <PageHeader title="User Details" />
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