import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Info,
  KeyRound,
  RefreshCcw,
  Copy,
  Check,
  CircleCheck,
  Package,
  Server,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchServiceInstance } from "@/lib/apiClient/serviceInstances";
import { FeAcmpServiceInstanceDetails } from "@/types/feServiceInstance";
import AcmpEditConnectionDetailPopup from "./AcmpEditConnectionDetailPopup";

export default function AcmpServiceIntanceConnectionDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const { data: serviceInstance, error } = useQuery({
    queryKey: ["serviceInstance", id],
    queryFn: () =>
      fetchServiceInstance(
        id as string
      ) as Promise<FeAcmpServiceInstanceDetails>,
  });

  if (error || !serviceInstance) {
    return <div>Error: {error?.message || "Service instance not found"}</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(serviceInstance.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Connection Details</h3>

      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Info className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  Host Name
                </p>
              </div>
              <p className="text-sm font-mono bg-muted/50 p-2 rounded-md">
                {serviceInstance.hostName}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <KeyRound className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  API Key
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono bg-muted/50 p-2 rounded-md flex-1">
                  {serviceInstance.apiKey.slice(0, 4)}***************
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Server className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  ACMP Server Version
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {serviceInstance.acmpServerVersion}
              </Badge>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Package className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  Connector Version
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {serviceInstance.acmpConnectorVersion}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <CircleCheck className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                Connection Status
              </p>
            </div>
            <Badge variant="success" className="text-xs">
              Connected
            </Badge>
          </div>

          <div className="flex gap-3">
            <AcmpEditConnectionDetailPopup />
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
