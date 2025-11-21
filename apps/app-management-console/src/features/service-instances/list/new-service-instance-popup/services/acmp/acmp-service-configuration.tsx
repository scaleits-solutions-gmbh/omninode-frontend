"use client";

import { Badge, Button } from "@repo/pkg-frontend-common-kit/components";
import { useState } from "react";
import { CheckCircle2, Shield, Zap } from "lucide-react";
import BaseServiceConfiguration from "../base-service-configuration";
import AcmpConnectionDetails from "./acmp-connection-details";
import ServiceBasicInformation from "../service-basic-information";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { baseOmninodeApiClient, getApiAuthentication } from "@repo/omninode-api-client";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Session } from "next-auth";
import { Service } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export default function AcmpForm({
  onBack,
  onConnect,
}: {
  onBack: () => void;
  onConnect: () => void;
}) {
  // Step state: 'basic' → 'connection'
  const [step, setStep] = useState<"basic" | "connection">("basic");
  const [basicInfo, setBasicInfo] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });
  const [isBasicValid, setIsBasicValid] = useState(false);
  // Connection details (filled after test success)
  const [connection, setConnection] = useState<{ hostname: string; apiKey: string } | null>(null);

  const isConnectionValid = connection != null;

  const { organizationId } = useParams<{ organizationId: string }>();
  const queryClient = useQueryClient();

  const createServiceInstanceMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: {
        name: string;
        description?: string;
        hostname: string;
        apiKey: string;
      };
    }) => {
      return await baseOmninodeApiClient().serviceMicroservice.createServiceInstance({
        apiAuthentication: getApiAuthentication(session.access_token),
        request: {
          body: {
            service: Service.Acmp,
            organizationId: organizationId as string,
            name: variables.name,
            description: variables.description,
            config: {
              hostname: variables.hostname,
              apiKey: variables.apiKey,
            },
          },
        },
      });
    },
    onMutate: () => toast.loading("Creating service instance...", { id: "create-acmp-si" }),
    onError: (e: Error) =>
      toast.error(e.message || "Failed to create service instance", { id: "create-acmp-si" }),
    onSuccess: () => {
      toast.success("Service instance created", { id: "create-acmp-si" });
      // Invalidate organization service instances list so the new instance appears
      queryClient.invalidateQueries({
        queryKey: [
          "organizationServiceInstances",
          organizationId,
        ],
      });
      onConnect();
    },
  });

  return (
    <>
      <BaseServiceConfiguration
        title="ACMP Connector Configuration"
        rightBadges={
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="secondary" className="uppercase">
              API-based
            </Badge>
            <Badge variant="default" className="uppercase">
              Secure
            </Badge>
          </div>
        }
        iconSrc="/management-console/assets/services/acmp.svg"
        iconAlt="ACMP"
        connectorHeading="ACMP Connector"
        connectorBadgeLabel="New"
        description="Connect ACMP via hostname and API key to unlock insights."
        bullets={[
          {
            icon: <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />,
            text: "Read devices and software inventory",
          },
          {
            icon: <Zap className="mt-0.5 h-4 w-4 text-primary" />,
            text: "Leverage workspace automations",
          },
          {
            icon: <Shield className="mt-0.5 h-4 w-4 text-primary" />,
            text: "No data is stored in the system",
          },
        ]}
        tip={
          <>
            Tip: Ask your ACMP administrator to create an API key. You can
            rotate the key later in settings.
          </>
        }
      >
        {step === "basic" ? (
          <ServiceBasicInformation
            initialName={basicInfo.name}
            initialDescription={basicInfo.description}
            onChange={({ name, description, isValid }) => {
              setBasicInfo((prev) => {
                if (prev.name === name && prev.description === description) {
                  return prev;
                }

                return { name, description };
              });

              setIsBasicValid((prev) => (prev === isValid ? prev : isValid));
            }}
          />
        ) : (
          <AcmpConnectionDetails
            onTestSuccess={({ hostname, apiKey }) => {
              setConnection({ hostname, apiKey });
            }}
          />
        )}
      </BaseServiceConfiguration>
      <div className="flex justify-between">
        {step === "basic" ? (
          <Button variant="secondary" type="button" onClick={onBack}>
            Back
          </Button>
        ) : (
          <Button variant="secondary" type="button" onClick={() => setStep("basic")}>
            Back
          </Button>
        )}
        {step === "basic" ? (
          <Button
            type="button"
            disabled={!isBasicValid}
            onClick={() => setStep("connection")}
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            disabled={!isConnectionValid || !isBasicValid}
            onClick={() => {
              const trimmedName = basicInfo.name.trim();
              if (!connection || !trimmedName) return;
              void createServiceInstanceMutation.mutateAsync({
                name: trimmedName,
                description:
                  basicInfo.description && basicInfo.description.trim().length > 0
                    ? basicInfo.description
                    : undefined,
                hostname: connection.hostname,
                apiKey: connection.apiKey,
              });
            }}
            isLoading={createServiceInstanceMutation.isPending}
          >
            Add Service Instance
          </Button>
        )}
      </div>
    </>
  );
}
