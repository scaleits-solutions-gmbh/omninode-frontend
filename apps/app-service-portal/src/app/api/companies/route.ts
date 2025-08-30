import { NextResponse } from "next/server";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { FeCompany } from "@/types/fe-company";
const mockCompanies = [
    {
        id: "1",
        name: "Company 1",
        type: "company type",
    },
];
export async function GET(): Promise<NextResponse<PaginatedResponse<FeCompany>>|NextResponse<unknown>> {

   return NextResponse.json(mockCompanies);
}