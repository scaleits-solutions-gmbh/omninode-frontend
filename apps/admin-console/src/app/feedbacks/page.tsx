export const dynamic = "force-dynamic";

import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import { Metadata } from "next";
import FeedbacksPageContent from "@/features/feedbacks/page-content";

export const metadata: Metadata = {
  title: "Feedbacks",
};

export default function FeedbacksPage() {
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Management",
        breadcrumbs: [
          {
            label: "Feedbacks"
          },
        ],
      }}
    >
      <FeedbacksPageContent />
    </SideBarLayout>
  );
}



