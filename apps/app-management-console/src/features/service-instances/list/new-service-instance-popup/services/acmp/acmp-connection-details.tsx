import { Button, Input, Label } from "@repo/pkg-frontend-common-kit/components";
import { RefreshCcw } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";

interface AcmpConnectionDetailsProps {
  initialHostname?: string;
  initialApiKey?: string;
  onTestSuccess: (values: { hostname: string; apiKey: string }) => void | Promise<void>;
}

type HostnameFieldProps = {
  name: string;
  state: { value: string };
  handleBlur: () => void;
  handleChange: (value: string) => void;
};

type ApiKeyFieldProps = HostnameFieldProps;

export default function AcmpConnectionDetails({
  initialHostname = "",
  initialApiKey = "",
  onTestSuccess,
}: AcmpConnectionDetailsProps) {
  const form = useForm({
    defaultValues: {
      hostname: initialHostname,
      apiKey: initialApiKey,
    },
  });

  const [isTesting, setIsTesting] = React.useState(false);

  const handleTestConnection = async (hostname: string, apiKey: string) => {
    const trimmedHostname = hostname.trim();
    const trimmedApiKey = apiKey.trim();

    if (!trimmedHostname || !trimmedApiKey) {
      return;
    }

    setIsTesting(true);
    try {
      toast.info("Connection Testing not implemented yet", {
        description: "Coming next Sprint.",
      });
      await onTestSuccess({
        hostname: trimmedHostname,
        apiKey: trimmedApiKey,
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
          Enter the credentials required for ACMP.
        </p>
      </div>
      <div className="space-y-6">
        <form.Field name="hostname">
          {(field: HostnameFieldProps) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Hostname</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="acmp.example.com"
              />
            </div>
          )}
        </form.Field>
        <form.Field name="apiKey">
          {(field: ApiKeyFieldProps) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>API Key</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="•••••••••••••••"
              />
              <p className="text-[11px] text-muted-foreground">
                Your key is encrypted in transit and at rest.
              </p>
            </div>
          )}
        </form.Field>
        <form.Subscribe
          selector={(state: {
            values: { hostname?: string; apiKey?: string };
          }) => ({
            hostname: state.values.hostname ?? "",
            apiKey: state.values.apiKey ?? "",
          })}
        >
          {({ hostname, apiKey }: { hostname: string; apiKey: string }) => {
            const canTest =
              hostname.trim().length > 0 &&
              apiKey.trim().length > 0 &&
              !isTesting;

            return (
              <Button
                variant="outline"
                className="w-full"
                disabled={!canTest}
                onClick={() => void handleTestConnection(hostname, apiKey)}
                isLoading={isTesting}
              >
                <RefreshCcw className="h-4 w-4" /> Test Connection
              </Button>
            );
          }}
        </form.Subscribe>
      </div>
    </>
  );
}


