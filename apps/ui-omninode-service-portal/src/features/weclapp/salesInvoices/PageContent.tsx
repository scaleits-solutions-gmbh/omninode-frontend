import PageHeader from "@/components/display/pageHeader";
import { SalesInvoiceList } from "./list/SalesInvoiceList";

export default function SalesInvoicesPageContent() {
  return (
    <>
      <PageHeader title="Sales Invoices" subtitle="Manage and track customer invoices and payments" />
      <SalesInvoiceList />
    </>
  );
}