import {
  ComposedOrganizationServiceInstanceReadModel,
  Service,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import WeclappConnectionCard from "./weclapp/weclapp-connection-card";
import AcmpConnectionCard from "./acmp/acmp-connection-card";
interface SwitchConnectionCardProps {
  serviceInstance: ComposedOrganizationServiceInstanceReadModel;
}

export default function SwitchConnectionCard({
  serviceInstance,
}: SwitchConnectionCardProps) {
  switch (serviceInstance.service) {
    case Service.Weclapp:
      return <WeclappConnectionCard weclappServiceInstance={serviceInstance} />;
    case Service.Acmp:
      return <AcmpConnectionCard acmpServiceInstance={serviceInstance} />;
    default:
      return null;
  }
}
