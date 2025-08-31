import { NextRequest } from "next/server";
import {
  baseMiddleware,
} from "@repo/pkg-frontend-common-kit/utils";
import { SERVICE_PORTAL_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default async function middleware(request: NextRequest) {
  return await baseMiddleware(request, SERVICE_PORTAL_BASE_URL);
}
