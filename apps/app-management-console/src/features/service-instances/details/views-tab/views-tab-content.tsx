"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  SearchInput,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  CardContent,
  GenericPagination,
} from "@repo/pkg-frontend-common-kit/components";
import { useState } from "react";
import {
  ComposedServiceViewReadModel,
  Service,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import RemoveServiceViewPopup from "./remove-service-view-popup";
import EditAcmpViewPopup from "./services/acmp/edit-acmp-view-popup";
import EditWeclappViewPopup from "./services/weclapp/edit-weclapp-view-popup";
import ViewGridLoading from "./loading/view-grid-loading";
import SwitchServiceView from "./services/switch-service-view";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import { useParams } from "next/navigation";

export default function ViewsTabContent() {
  const { organizationServiceInstanceId: serviceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const [search, setSearch] = useState("");
  const [selectedView, setSelectedView] = useState<
    ComposedServiceViewReadModel | undefined
  >(undefined);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useAuthedQuery({
    queryKey: ["serviceInstanceViews", serviceInstanceId, search, page],
    queryFn: async ({ session }) => {
      return await baseOmninodeApiClient().serviceMicroservice.findComposedPaginatedServiceViews(
        {
          request: {
            pathParams: { id: serviceInstanceId as string },
            queryParams: {
              pageSize: 9,
              page,
              searchTerm: search || undefined,
            },
          },
          apiAuthentication: getApiAuthentication(session.access_token),
        }
      );
    },
    enabled: Boolean(serviceInstanceId),
  });

  const views = (data?.body.data as ComposedServiceViewReadModel[]) || [];
  const totalItems = data?.body.total ?? 0;

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <Card>
            <CardHeader className="flex gap-2 justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>Service Views</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-500">
                Failed to load service views: {error.message}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Card>
          <CardHeader className="flex gap-2 justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Service Views</CardTitle>
              <p className="text-xs text-muted-foreground">
                Views are the different ways to view the service instance.
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a view type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">View Type 1</SelectItem>
                  <SelectItem value="2">View Type 2</SelectItem>
                  <SelectItem value="3">View Type 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>
      </div>
      {selectedView && (
        <>
          <RemoveServiceViewPopup
            show={showRemovePopup}
            view={selectedView}
            onClose={() => {
              setShowRemovePopup(false);
              setSelectedView(undefined);
            }}
          />
          {selectedView.service === Service.Acmp && (
            <EditAcmpViewPopup
              show={showEditPopup}
              view={selectedView}
              onClose={() => {
                setShowEditPopup(false);
                setSelectedView(undefined);
              }}
            />
          )}
          {selectedView.service === Service.Weclapp && (
            <EditWeclappViewPopup
              show={showEditPopup}
              view={selectedView}
              onClose={() => {
                setShowEditPopup(false);
                setSelectedView(undefined);
              }}
            />
          )}
        </>
      )}
      {isLoading ? (
        <ViewGridLoading rows={9} />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {views.map((serviceView) => (
            <SwitchServiceView
              key={serviceView.id}
              view={serviceView}
              onEdit={(view) => {
                setSelectedView(view);
                setShowEditPopup(true);
              }}
              onRemove={(view) => {
                setSelectedView(view);
                setShowRemovePopup(true);
              }}
            />
          ))}
        </div>
      )}
      <div className="mt-2">
        <GenericPagination
          page={page}
          pageSize={9}
          totalItems={totalItems}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
