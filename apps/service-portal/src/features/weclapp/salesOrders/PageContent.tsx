import PageHeader from "@/components/display/pageHeader";
import { SalesOrderList } from "./list/SalesOrderList";

export default function SalesOrdersPageContent() {
  return (
    <>
      <PageHeader title="Sales Orders" subtitle="View and process customer sales orders" />
      <SalesOrderList />
    </>
  );
}