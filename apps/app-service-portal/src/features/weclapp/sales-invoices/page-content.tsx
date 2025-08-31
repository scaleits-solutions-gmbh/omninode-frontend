import { PageHeader } from "frontend-common-kit";
import { SalesInvoiceList } from "./list/sales-invoice-list";

export default function SalesInvoicesPageContent() {
  return (
    <>
      <PageHeader title="Sales Invoices" subtitle="Manage and track customer invoices and payments" />
      <SalesInvoiceList />
    </>
  );
}