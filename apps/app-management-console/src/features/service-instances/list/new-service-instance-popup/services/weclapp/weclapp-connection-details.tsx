import { Button, Input, Label } from "@repo/pkg-frontend-common-kit/components";
import { RefreshCcw } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface WeclappConnectionDetailsProps {
  initialHostname?: string;
  initialApiKey?: string;
  onTestSuccess: (values: { hostname: string; apiKey: string }) => void | Promise<void>;
}

export default function WeclappConnectionDetails({
  initialHostname = "",
  initialApiKey = "",
  onTestSuccess,
}: WeclappConnectionDetailsProps) {
  const [hostname, setHostname] = React.useState(initialHostname);
  const [apiKey, setApiKey] = React.useState(initialApiKey);
  const [isTesting, setIsTesting] = React.useState(false);

  const canTest =
    hostname.trim().length > 0 &&
    apiKey.trim().length > 0 &&
    !isTesting;

  const handleTestConnection = async () => {
    if (!canTest) return;

    setIsTesting(true);
    try {
      // TODO: integrate real connectivity test and only call onTestSuccess if it passes.
      toast.info("Connection Testing not implemented yet", {
        description: "Coming next Sprint.",
      });
      await onTestSuccess({
        hostname: hostname.trim(),
        apiKey: apiKey.trim(),
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <>
      <div>
        <div className="text-sm font-medium mb-2">Connection details</div>
        <p className="text-xs text-muted-foreground">
          Enter the credentials required for Weclapp.
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="weclappHostname">Hostname</Label>
          <Input
            id="weclappHostname"
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
            placeholder="weclapp.example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weclappApiKey">API Key</Label>
          <Input
            id="weclappApiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="•••••••••••••••"
          />
          <p className="text-[11px] text-muted-foreground">
            Your key is encrypted in transit and at rest.
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full"
          disabled={!canTest}
          onClick={handleTestConnection}
          isLoading={isTesting}
        >
          <RefreshCcw className="h-4 w-4" /> Test Connection
        </Button>
      </div>
    </>
  );
}

