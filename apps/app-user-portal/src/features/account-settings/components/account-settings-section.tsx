import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import PersonalInformationCard from "./personal-information-card";
import AccountPreferencesCard from "./account-preferences-card";
export default function AccountSettingsSection() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Account settings"
        subtitle="Manage your account settings"
      />
      <PersonalInformationCard />
      <AccountPreferencesCard />
    </div>
  );
}
