import { NextRequest, NextResponse } from "next/server";
import { mockGetQuotations } from "./data";
import { FeQuotation } from "@/types/weclapp/quotation";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<FeQuotation>>|NextResponse<PaginatedResponse<unknown>>> {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("searchText") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    return NextResponse.json(await mockGetQuotations(searchText, page, pageSize));
}
