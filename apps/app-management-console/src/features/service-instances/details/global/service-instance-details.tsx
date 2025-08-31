import DeletePopup from "./delete-popup";
import EditPopup from "./edit-details-popup";
import { fetchServiceInstance } from "@/lib/api-client/service-instances";
import {
  Card,
  CardContent,
  Badge,
} from "frontend-common-kit";
import { useQuery } from "@tanstack/react-query";
import { Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function WeclappServiceInstanceDetails() {
  const { id } = useParams();
  const { data: serviceInstance, error } = useQuery({
    queryKey: ["serviceInstance", id],
    queryFn: () => fetchServiceInstance(id as string),
  });

  if (error || !serviceInstance) {
    return <div>Error: {error?.message || "Service instance not found"}</div>;
  }

  // Convert string dates to Date objects
  const updatedAt = new Date(serviceInstance.updatedAt);
  const createdAt = new Date(serviceInstance.createdAt);

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center border rounded-lg p-2 bg-muted/50">
            <Image
              src={`/assets/${serviceInstance.service}.svg`}
              alt={`${serviceInstance.service}`}
              width={48}
              height={48}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium">
              {serviceInstance.instanceName}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {serviceInstance.service}
              </Badge>
              <Badge variant="success" className="text-xs">
                Active
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{updatedAt.toLocaleDateString()}</p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm">
                by{" "}
                <span className="font-medium">{serviceInstance.updatedBy}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                Created At
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{createdAt.toLocaleDateString()}</p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm">
                by{" "}
                <span className="font-medium">{serviceInstance.createdBy}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <EditPopup />
          <DeletePopup />
        </div>
      </CardContent>
    </Card>
  );
}
