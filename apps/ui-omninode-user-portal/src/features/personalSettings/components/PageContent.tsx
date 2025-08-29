import ProfileCard from "./ProfileCard";
import PersonalSettingsCard from "./PersonalSettingsCard";
import PageHeader from "@/components/display/pageHeader";
export default function PageContent() {
    return (
        <>
        <PageHeader title="Personal Settings" subtitle="Manage your profile information and account preferences" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <ProfileCard />
            </div>
            <div className="md:col-span-2">
                <PersonalSettingsCard />
            </div>
        </div>
        </>
    )
}
