/*
company name
company type
company industry
company status
company created at
*/

import { FeCompany } from "@/types/fe/fe-company";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
} from "frontend-common-kit/components";
import { CompanyStatus, CompanyType } from "@scaleits-solutions-gmbh/services";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";

const getStatusVariant = (status: CompanyStatus) => {
  switch (status) {
    case CompanyStatus.ACTIVE:
      return "success";
    case CompanyStatus.INACTIVE:
      return "secondary";
    case CompanyStatus.PENDING:
      return "warning";
    case CompanyStatus.SUSPENDED:
      return "error";
    default:
      return "secondary";
  }
};

const formatCompanyType = (type: CompanyType) => {
  return type === CompanyType.CUSTOMER ? "Customer" : "Provider";
};

const formatIndustry = (industry: string) => {
  return industry
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const companyColumns: ColumnDef<FeCompany>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
    size: 35, // 35% width
    minSize: 250, // 250px minimum width
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src={""} alt={company.name} />
            <AvatarFallback seed={company.id}>
              {company.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{company.name}</span>
            <span className="text-xs text-muted-foreground">
              {company.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "companyType",
    header: "Company Type",
    size: 15, // 15% width
    minSize: 120, // 120px minimum width
    cell: ({ getValue }) => {
      const type = getValue() as CompanyType;
      return (
        <Badge
          variant={type === CompanyType.CUSTOMER ? "secondary" : "default"}
        >
          {formatCompanyType(type)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "industry",
    header: "Industry",
    size: 20, // 20% width
    minSize: 150, // 150px minimum width
    cell: ({ getValue }) => {
      const industry = getValue() as string;
      return (
        <span>
          {formatIndustry(industry.charAt(0).toUpperCase() + industry.slice(1))}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 12, // 12% width
    minSize: 100, // 100px minimum width
    cell: ({ getValue }) => {
      const status = getValue() as CompanyStatus;
      return (
        <Badge variant={getStatusVariant(status)}>
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    size: 13, // 13% width
    minSize: 120, // 120px minimum width
    cell: ({ getValue }) => {
      const createdAt = getValue() as string;
      return <span className="text-sm">{formatDate(createdAt)}</span>;
    },
  },
  {
    id: "actions",
    size: 5, // 5% width
    minSize: 60, // 60px minimum width
    cell: () => {
      return (
        <Button variant="secondary" size="icon" className="cursor-pointer">
          <EyeIcon className="h-4 w-4" />
        </Button>
      );
    },
  },
];
