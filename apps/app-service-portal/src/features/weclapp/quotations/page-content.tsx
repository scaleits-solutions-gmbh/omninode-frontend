import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { QuotationList } from "./list/quotation-list";

export default function QuotationsPageContent() {
  return (
    <>
      <PageHeader title="Quotations" subtitle="Create and manage sales quotations for your customers" />
      <QuotationList />
    </>
  );
}