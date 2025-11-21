"use client";

import {
  ComposedServiceViewReadModel,
  Service,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import AcmpViewCard from "./acmp/acmp-view-card";
import WeclappViewCard from "./weclapp/weclapp-view-card";

interface SwitchServiceViewProps {
  view: ComposedServiceViewReadModel;
  onEdit?: (view: ComposedServiceViewReadModel) => void;
  onRemove?: (view: ComposedServiceViewReadModel) => void;
}

export default function SwitchServiceView({
  view,
  onEdit,
  onRemove,
}: SwitchServiceViewProps) {
  switch (view.service) {
    case Service.Acmp:
      return (
        <AcmpViewCard
          acmpServiceView={view}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      );
    case Service.Weclapp:
      return (
        <WeclappViewCard
          weclappServiceView={view}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      );
    default:
      return null;
  }
}



