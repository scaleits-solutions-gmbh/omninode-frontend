import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { SalesOrderList } from "./list/sales-order-list";

export default function SalesOrdersPageContent() {
  return (
    <>
      <PageHeader title="Sales Orders" subtitle="View and process customer sales orders" />
      <SalesOrderList />
    </>
  );
}