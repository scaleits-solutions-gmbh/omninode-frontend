"use client";

import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import { Badge, Button } from "@repo/pkg-frontend-common-kit/components";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { Service } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { CheckCircle2, Shield, Zap } from "lucide-react";
import type { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import BaseServiceConfiguration from "../base-service-configuration";
import ServiceBasicInformation from "../service-basic-information";
import WeclappConnectionDetails from "./weclapp-connection-details";

export default function WeclappForm({
  onBack,
  onConnect,
}: {
  onBack: () => void;
  onConnect: () => void;
}) {
  // Step state
  const [step, setStep] = useState<"basic" | "connection">("basic");
  const [basicInfo, setBasicInfo] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });
  const [isBasicValid, setIsBasicValid] = useState(false);
  // Connection details (filled after test success)
  const [connection, setConnection] = useState<{
    hostname: string;
    apiKey: string;
  } | null>(null);

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
      return await baseOmninodeApiClient().serviceMicroservice.createServiceInstance(
        {
          apiAuthentication: getApiAuthentication(session.access_token),
          request: {
            body: {
              service: Service.Weclapp,
              organizationId: organizationId as string,
              name: variables.name,
              description: variables.description,
              config: {
                hostname: variables.hostname,
                apiKey: variables.apiKey,
              },
            },
          },
        }
      );
    },
    onMutate: () =>
      toast.loading("Creating service instance...", { id: "create-si" }),
    onError: (e: Error) =>
      toast.error(e.message || "Failed to create service instance", {
        id: "create-si",
      }),
    onSuccess: () => {
      toast.success("Service instance created", { id: "create-si" });
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
        title="Weclapp Connector Configuration"
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
        iconSrc="/management-console/assets/services/weclapp.svg"
        iconAlt="Weclapp"
        connectorHeading="Weclapp Connector"
        connectorBadgeLabel="New"
        description="Connect your Weclapp tenant securely using an API key."
        bullets={[
          {
            icon: <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />,
            text: "Sync contacts, companies and products",
          },
          {
            icon: <Zap className="mt-0.5 h-4 w-4 text-primary" />,
            text: "Automate workflows with service views",
          },
          {
            icon: <Shield className="mt-0.5 h-4 w-4 text-primary" />,
            text: "Granular access for teams and partners",
          },
        ]}
        tip={
          <>Tip: Find the API key under My Settings → API tokens in Weclapp.</>
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
          <WeclappConnectionDetails
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
          <Button
            variant="secondary"
            type="button"
            onClick={() => setStep("basic")}
          >
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
              createServiceInstanceMutation.mutateAsync({
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
