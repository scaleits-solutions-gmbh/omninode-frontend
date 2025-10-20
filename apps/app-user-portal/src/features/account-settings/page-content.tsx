import AccountSettingsSection from "./components/account-settings-section";
import DangerZoneSection from "./components/danger-zone-section";
export default function PageContent() {
  return (
    <div className="space-y-6">
      <AccountSettingsSection />
      <DangerZoneSection />
    </div>
  );
}
