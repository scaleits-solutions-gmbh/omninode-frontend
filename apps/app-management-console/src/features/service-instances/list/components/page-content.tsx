import NewServiceInstancePopup from "./new-service-instance-popup/new-service-instance-popup";
import ServiceInstanceList from "./service-instance-list";
import { PageHeader } from "frontend-common-kit";

export default function PageContent() {
  return (
    <>
      <PageHeader
        title="Service Instances"
        subtitle="Configure and manage your service connections"
        actions={<NewServiceInstancePopup />}
      />
      <ServiceInstanceList />
    </>
  );
}
