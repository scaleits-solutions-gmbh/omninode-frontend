import LayoutCenteredX from "@/components/layouts/layout-centered-x/layout-centered-x";
import PageContent from "@/features/account-settings/page-content";
export default function AccountSettingsPage() {
  return (
    <LayoutCenteredX showHeader={true}>
      <PageContent />
    </LayoutCenteredX>
  );
}