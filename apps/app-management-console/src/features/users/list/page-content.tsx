import InviteList from "./invite-list";
import InviteUserPopup from "./invite-user-popup";
import UserList from "./user-list";
import { PageHeader } from "../../../../../../packages/frontend-common-kit/dist/components";
export default function PageContent() {
  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage user accounts and send invitations"
        actions={<InviteUserPopup />}
      />
      <InviteList />
      <UserList />
    </>
  );
}
