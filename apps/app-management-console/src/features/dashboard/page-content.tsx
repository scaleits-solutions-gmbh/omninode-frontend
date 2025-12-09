"use client";
import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import KpiCards from "./components/kpis";
import RecentUsers from "./components/recent-users";
import RecentServiceInstances from "./components/recent-service-instances";
import QuickActions from "./components/quick-actions";
import Onboarding from "./components/onboading";

export default function PageContent() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of your organization" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <KpiCards />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {" "}
        <div className="space-y-6">
          <QuickActions />
          <Onboarding />
        </div>
        <div className="xl:col-span-2 space-y-6">
          <RecentServiceInstances />
          <RecentUsers />
        </div>
      </div>
    </>
  );
}
