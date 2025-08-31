import NewServiceInstancePopup from "./new-service-instance-popup/new-service-instance-popup";
import ServiceInstanceList from "./service-instance-list";
import { PageHeader } from "@repo/pkg-frontend-common-kit/components";

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
