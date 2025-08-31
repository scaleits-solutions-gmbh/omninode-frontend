"use client";

import {
  ApiError,
  getCompanyById,
  getCompanyByIdQueryKey,
  NotFoundError,
  ValidationError,
} from "@/lib/api-client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Skeleton,
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import { CompanyStatus, CompanyType } from "@scaleits-solutions-gmbh/services";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";

export default function OrganizationInfo() {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: getCompanyByIdQueryKey(id as string),
    queryFn: () => getCompanyById(id as string),
    retry: false,
  });

  // Enhanced error handling with specific error types
  if (error) {
    const getErrorVariant = () => {
      if (error instanceof NotFoundError) return "default";
      if (error instanceof ValidationError) return "default";
      return "destructive";
    };

    const getErrorTitle = () => {
      if (error instanceof NotFoundError) return "Company Not Found";
      if (error instanceof ValidationError) return "Invalid Request";
      if (error instanceof ApiError) return `Error ${error.status}`;
      return "Error";
    };

    const getErrorDescription = () => {
      if (error instanceof NotFoundError) {
        return "The company you're looking for doesn't exist or has been removed.";
      }
      if (error instanceof ValidationError) {
        return error.message;
      }
      if (error instanceof ApiError) {
        return error.message;
      }
      return (
        error?.message ||
        "An unexpected error occurred while loading company information."
      );
    };

    return (
      <Alert variant={getErrorVariant()}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{getErrorTitle()}</AlertTitle>
        <AlertDescription className="mt-2">
          {getErrorDescription()}
          {!(error instanceof ValidationError) && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading)
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="size-16 rounded-md" />
        <div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-4 w-32 mt-1" />
        </div>
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-16 rounded-md">
        <AvatarImage src={""} />
        <AvatarFallback seed={data?.id}>{data?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-medium">{data?.name}</h1>
          <Badge
            variant={
              data?.status === CompanyStatus.ACTIVE
                ? "success"
                : data?.status === CompanyStatus.INACTIVE
                  ? "error"
                  : "secondary"
            }
          >
            {data?.status === null ? "Not retrieved by API" : data?.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">
          {data?.type === CompanyType.PROVIDER
            ? "Service Provider"
            : "Customer"}
        </p>
      </div>
    </div>
  );
}
