import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { FeedbackList } from "./list/feedback-list";

export default function FeedbacksPageContent() {
  return (
    <>
      <PageHeader title="Feedbacks" subtitle="Oversee feedbacks of the Omninode Platform" />
      <FeedbackList />
    </>
  );
}


