import { PageHeader } from "frontend-common-kit";
import { SalesOrderList } from "./list/sales-order-list";

export default function SalesOrdersPageContent() {
  return (
    <>
      <PageHeader title="Sales Orders" subtitle="View and process customer sales orders" />
      <SalesOrderList />
    </>
  );
}