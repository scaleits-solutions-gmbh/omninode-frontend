import { NextRequest, NextResponse } from "next/server";
import { mockGetTickets } from "./data";
import { FeTicket } from "@/types/weclapp/ticket";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<FeTicket>>|NextResponse<PaginatedResponse<unknown>>> {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("searchText") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    return NextResponse.json(await mockGetTickets(searchText, page, pageSize));
}
