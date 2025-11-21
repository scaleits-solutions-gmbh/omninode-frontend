import { Button, Input, Label } from "@repo/pkg-frontend-common-kit/components";
import { RefreshCcw } from "lucide-react";
import React, { useState } from "react";

export default function WeclappConnectionDetails({
  onTestSuccess,
}: {
  onTestSuccess: (values: { tenant: string; apiKey: string }) => void | Promise<void>;
}) {
  const [tenant, setTenant] = useState("");
  const [apiKey, setApiKey] = useState("");
  const isValid = tenant.trim() !== "" && apiKey.trim() !== "";

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
          <Label htmlFor="tenant">Tenant</Label>
          <Input
            id="tenant"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
            placeholder="your-tenant"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
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
          disabled={!isValid}
          onClick={async () => {
            // TODO: integrate real connectivity test and only call onTestSuccess if it passes.
            await onTestSuccess({ tenant, apiKey });
          }}
        >
          <RefreshCcw className="h-4 w-4" /> Test Connection
        </Button>
      </div>
    </>
  );
}

