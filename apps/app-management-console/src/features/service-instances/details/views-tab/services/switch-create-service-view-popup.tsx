"use client";

import { Service } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import CreateAcmpViewPopup from "./acmp/create-acmp-view-popup";
import CreateWeclappViewPopup from "./weclapp/create-weclapp-view-popup";

interface SwitchCreateServiceViewPopupProps {
  show: boolean;
  service: Service;
  onClose: () => void;
  onCreated?: () => void;
}

export default function SwitchCreateServiceViewPopup({
  show,
  service,
  onClose,
  onCreated,
}: SwitchCreateServiceViewPopupProps) {
  switch (service) {
    case Service.Acmp:
      return (
        <CreateAcmpViewPopup
          show={show}
          onClose={onClose}
          onCreated={onCreated}
        />
      );
    case Service.Weclapp:
      return (
        <CreateWeclappViewPopup
          show={show}
          onClose={onClose}
          onCreated={onCreated}
        />
      );
    default:
      return null;
  }
}


