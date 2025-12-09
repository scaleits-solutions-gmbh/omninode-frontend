"use client";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  PageHeader,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/pkg-frontend-common-kit/components";
import { GeneralTabContent } from "./general-tab/general-tab-content";
import ViewsTabContent from "./views-tab/views-tab-content";
import { EllipsisVertical, Plus } from "lucide-react";
import React from "react";
import EditServiceInstanceDetailsPopup from "./edit-service-instance-basic-information-popup";
import RemoveServiceInstancePopup from "./remove-service-instance-popup";
import { useParams } from "next/navigation";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { getServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import { ComposedOrganizationServiceInstanceReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import SwitchCreateServiceViewPopup from "./views-tab/services/switch-create-service-view-popup";

export default function PageContent() {
  const [showEditDetailsPopup, setShowEditDetailsPopup] = React.useState(false);
  const [showRemoveInstancePopup, setShowRemoveInstancePopup] =
    React.useState(false);
  const [showCreateViewPopup, setShowCreateViewPopup] = React.useState(false);
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();

  const { data, isLoading, error } = useAuthedQuery({
    queryKey: [
      "composedOrganizationServiceInstance",
      organizationServiceInstanceId,
    ],
    queryFn: async ({ session }) => {
      const response = await getServiceClient(session).findComposedOrganizationServiceInstanceById({
        pathParams: { id: organizationServiceInstanceId },
      });
      return response.data;
    },
    enabled: Boolean(organizationServiceInstanceId),
  });

  if (!isLoading && error) {
    return <div>Error loading service instance</div>;
  }

  if (!isLoading && !data) {
    return <div>Service instance not found</div>;
  }

  const serviceInstance = data as ComposedOrganizationServiceInstanceReadModel;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service Instance Details"
        subtitle="View and configure service instance settings"
        actions={
          !isLoading && !error && serviceInstance ? (
          <>
            <Button
              variant="default"
              onClick={() => {
                setShowCreateViewPopup(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Add View
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-9">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setShowEditDetailsPopup(true);
                  }}
                >
                  Edit details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive hidden"
                  onClick={() => {
                    setShowRemoveInstancePopup(true);
                  }}
                >
                  Remove service instance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <EditServiceInstanceDetailsPopup
              show={showEditDetailsPopup}
              serviceInstance={serviceInstance}
              onClose={() => setShowEditDetailsPopup(false)}
            />
            <SwitchCreateServiceViewPopup
              show={showCreateViewPopup}
              service={serviceInstance.service}
              onClose={() => setShowCreateViewPopup(false)}
              onCreated={() => {
                setShowCreateViewPopup(false);
              }}
            />
            <RemoveServiceInstancePopup
              show={showRemoveInstancePopup}
              serviceInstance={serviceInstance}
              onClose={() => setShowRemoveInstancePopup(false)}
            />
          </>
        ) : (<>
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-9" />
          </>
        )}
      />

      <Tabs defaultValue="general" className="gap-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="views">Views</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralTabContent
            isLoading={isLoading}
            error={error}
            serviceInstance={serviceInstance}
          />
        </TabsContent>
        <TabsContent value="views">
          <ViewsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
