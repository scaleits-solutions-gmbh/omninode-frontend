import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Badge,
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface WeclappConfigProps {
  onBack: () => void;
  onFinish: () => void;
}

export default function WeclappConfig({
  onBack,
  onFinish,
}: WeclappConfigProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [hasTested, setHasTested] = useState(false);

  const form = useForm({
    defaultValues: {
      instanceName: "",
      hostname: "",
      apiKey: "",
    },
    onSubmit: async ({ value }) => {
      await handleTestConnection(value);
    },
  });

  const isInstanceNameValid = (value: string) => {
    if (!value) return "Instance name is required";
    return undefined;
  };

  const isHostnameValid = (value: string) => {
    if (!value) return "Hostname is required";
    if (!value.includes(".weclapp.com"))
      return "Please enter a valid Weclapp hostname";
    return undefined;
  };

  const isApiKeyValid = (value: string) => {
    if (!value) return "API Key is required";
    return undefined;
  };

  const handleTestConnection = async (values: {
    hostname: string;
    apiKey: string;
  }) => {
    setIsTesting(true);

    console.log(values);
    try {
      // TODO: Implement actual API test connection
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Connection Successful", {
        description: "Your Weclapp credentials are valid.",
      });
      setHasTested(true);
    } catch (error) {
      console.error(error);
      toast.error("Connection Failed", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <>
      <DialogHeader className="pb-4 border-b">
        <DialogTitle>Weclapp Configuration</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="relative h-14 w-14 rounded-lg bg-background p-2 border">
              <Image
                src="/management-console/assets/weclapp.svg"
                alt="Weclapp"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <CardTitle className="text-lg">Weclapp</CardTitle>
              <Badge variant="secondary" className="w-fit">
                CRM
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Configure your Weclapp integration by providing your hostname and
              API key.
            </p>
          </CardContent>
        </Card>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="instanceName"
            validators={{
              onSubmit: ({ value }) => isInstanceNameValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Instance Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g., ScaleITS Weclapp Prod"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {!field.state.meta.isValid && (
                  <div className="w-full flex justify-start">
                    <em role="alert" className="text-sm text-red-500 text-left">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  </div>
                )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="hostname"
            validators={{
              onSubmit: ({ value }) => isHostnameValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Hostname</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="e.g., your-company.weclapp.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {!field.state.meta.isValid && (
                  <div className="w-full flex justify-start">
                    <em role="alert" className="text-sm text-red-500 text-left">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  </div>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="apiKey"
            validators={{
              onSubmit: ({ value }) => isApiKeyValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>API Key</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="Enter your Weclapp API key"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {!field.state.meta.isValid && (
                  <div className="w-full flex justify-start">
                    <em role="alert" className="text-sm text-red-500 text-left">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  </div>
                )}
              </div>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button
                variant="outline"
                onClick={() => form.handleSubmit()}
                disabled={!canSubmit || isTesting}
                className="w-full"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  "Test Connection"
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>

      <DialogFooter className="pt-4 border-t">
        <Button variant="outline" onClick={onBack} className="mr-2">
          Back
        </Button>
        <Button onClick={onFinish} disabled={!hasTested}>
          Finish
        </Button>
      </DialogFooter>
    </>
  );
}
