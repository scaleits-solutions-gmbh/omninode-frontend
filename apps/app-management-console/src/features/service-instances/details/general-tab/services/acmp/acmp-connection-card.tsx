import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/pkg-frontend-common-kit/components";
import {
  ShieldCheck,
  Pencil,
  RefreshCcw,
  Server,
  KeyRound,
  Clock,
} from "lucide-react";
import React from "react";
import EditAcmpConnectionDetailsPopup from "./edit-acmp-connection-details";
import { ComposedOrganizationServiceInstanceReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

/*
Shows ACMP connection details:
- Hostname
- API key (obfuscated)
- Connection status
Includes two actions: "Test connection" and "Edit",
similar in spirit to the basic information card footer.
All values are static placeholders for now.
*/

interface AcmpConnectionCardProps {
  acmpServiceInstance: ComposedOrganizationServiceInstanceReadModel;
}

export default function AcmpConnectionCard({
  acmpServiceInstance,
}: AcmpConnectionCardProps) {
  const [showEditPopup, setShowEditPopup] = React.useState(false);

  const hostname = acmpServiceInstance.serviceInstance.hostname;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-base leading-tight">
              ACMP Service Connection
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                Connection details
              </span>
              <Badge variant="success" className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Connected
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Server className="h-3 w-3" />
                <span>Hostname</span>
              </div>
              <div className="text-sm font-mono">{hostname}</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <KeyRound className="h-3 w-3" />
                <span>API key</span>
              </div>
              <div className="text-sm font-mono tracking-widest">
                ••••••••••••••••
              </div>
            </div>
            <div className="space-y-1 hidden">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Last tested</span>
              </div>
              <div className="text-sm text-muted-foreground">5 minutes ago</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCcw className="h-4 w-4" />
            Test connection
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShowEditPopup(true)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </CardFooter>
      </Card>
      <EditAcmpConnectionDetailsPopup
        show={showEditPopup}
        serviceInstance={acmpServiceInstance}
        onClose={() => setShowEditPopup(false)}
      />
    </>
  );
}
