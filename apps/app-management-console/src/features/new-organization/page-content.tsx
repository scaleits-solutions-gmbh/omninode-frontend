"use client";

import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import OrganizationDetailsForm from "./components/organization-details-form";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { USER_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";
import { getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";
export default function PageContent() {
  return (
    <>
      <div className="w-full ">
        <div className="space-y-2 mx-auto max-w-2xl">
          <Link href={getOriginUrl() + USER_PORTAL_BASE_URL} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-500">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to user portal
          </Link>
          <PageHeader
            title="Create organization"
            subtitle="Set up a new organization"
          />
          <OrganizationDetailsForm />
        </div>
      </div>
    </>
  );
}
