import ServiceInstanceList from "./ServiceInstanceList";
import PageHeader from "@/components/display/pageHeader";
import NewServiceInstancePopup from "./NewServiceInstancePopup/NewServiceInstancePopup";

export default function PageContent() {
  return (
    <>
      <PageHeader title="Service Instances" 
      actions={<NewServiceInstancePopup />}
      />
      <ServiceInstanceList />
    </>
  );
}
