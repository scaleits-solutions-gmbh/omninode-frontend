import { PageHeader } from "../../../../../../packages/frontend-common-kit/dist/components";
import { QuotationList } from "./list/quotation-list";

export default function QuotationsPageContent() {
  return (
    <>
      <PageHeader title="Quotations" subtitle="Create and manage sales quotations for your customers" />
      <QuotationList />
    </>
  );
}