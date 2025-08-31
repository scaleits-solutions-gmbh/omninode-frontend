import ProfileCard from "./components/profile-card";
import PersonalSettingsCard from "./components/personal-settings-card";
import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { useTranslations } from "next-intl";

export default function PageContent() {
  const t = useTranslations('features.personalSettings.pageContent');
  
  return (
    <>
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <ProfileCard />
        </div>
        <div className="md:col-span-2">
          <PersonalSettingsCard />
        </div>
      </div>
    </>
  );
}
