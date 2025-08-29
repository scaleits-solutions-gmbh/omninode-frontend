import PageHeader from "@/components/display/pageHeader";
import { QuotationList } from "./list/QuotationList";

export default function QuotationsPageContent() {
  return (
    <>
      <PageHeader title="Quotations" subtitle="Create and manage sales quotations for your customers" />
      <QuotationList />
    </>
  );
}