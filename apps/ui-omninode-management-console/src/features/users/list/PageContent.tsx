import PageHeader from "@/components/display/pageHeader";
import UserList from "./UserList";
import InviteUserPopup from "./inviteUserPopup";
export default function PageContent() {
  return (
    <>
      <PageHeader title="Users" actions={<InviteUserPopup />} />
      <UserList />
    </>
  );
}