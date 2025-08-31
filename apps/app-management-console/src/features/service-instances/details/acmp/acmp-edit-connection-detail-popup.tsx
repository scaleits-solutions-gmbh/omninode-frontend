import { fetchServiceInstance } from "@/lib/api-client/service-instances";
import { FeAcmpServiceInstanceDetails } from "@/types/fe/fe-service-instance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  Label,
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { Pencil, RefreshCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AcmpEditConnectionDetailPopup() {
  const { id } = useParams();
  const [isTesting, setIsTesting] = useState(false);
  const [hasTested, setHasTested] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: serviceInstance } = useQuery({
    queryKey: ["serviceInstance", id],
    queryFn: () =>
      fetchServiceInstance(
        id as string,
      ) as Promise<FeAcmpServiceInstanceDetails>,
  });

  const form = useForm({
    defaultValues: {
      hostname: serviceInstance?.hostName || "",
      apiKey: serviceInstance?.apiKey || "",
    },
    onSubmit: async ({ value }) => {
      await handleTestConnection(value);
    },
  });

  const isHostnameValid = (value: string) => {
    if (!value) return "Hostname is required";
    const hostnameRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    if (!hostnameRegex.test(value)) return "Please enter a valid hostname";
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
        description: "Your ACMP credentials are valid.",
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

  const handleSave = async () => {
    // TODO: Implement save functionality
    toast.success("Settings saved successfully");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Connection
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle>Edit ACMP Configuration</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
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
                  placeholder="e.g., your-company.acmp.com"
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
                  placeholder="Enter your ACMP API key"
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
              >
                {isTesting ? (
                  <>
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>

        <div className="flex justify-end pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasTested}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
