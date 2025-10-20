import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { PlatformUserList } from "./list/platform-user-list";

export default function PlatformUsersPageContent() {
  return (
    <>
      <PageHeader title="Platform Users" subtitle="Oversee user of the Omninode Platform" />
      <PlatformUserList />
    </>
  );
}