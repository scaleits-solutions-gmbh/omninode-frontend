import { NextRequest, NextResponse } from "next/server";
import { mockGetSalesOrderDocuments } from "./data";
import { FeWeclappDocument } from "@/types/weclapp/document";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: any }): Promise<NextResponse<PaginatedResponse<FeWeclappDocument>>|NextResponse<PaginatedResponse<unknown>>> {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("searchText") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    return NextResponse.json(await mockGetSalesOrderDocuments(id, searchText, page, pageSize));
}
