import { NextRequest } from "next/server";
import {
  baseMiddleware,
} from "@repo/pkg-frontend-common-kit/utils";
import { MANAGEMENT_CONSOLE_BASE_URL } from "@repo/pkg-frontend-common-kit/constants";

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default async function middleware(request: NextRequest) {
  return await baseMiddleware(request, MANAGEMENT_CONSOLE_BASE_URL);
}
