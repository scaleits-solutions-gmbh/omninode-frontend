import { decodeSessionJWT } from "@/lib/temp/sessionjwt";
import { UserInputSchema } from "@/schemas/userSchema";
import { FeUser } from "@/types/feUser";
import { UserCompanyService } from "@scaleits-solutions-gmbh/services";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const userCompanyService = new UserCompanyService();
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  

  const cookieStore = await cookies();
  const authorization = cookieStore.get("authorization")?.value as string;
 const decoded = await decodeSessionJWT(authorization);
const companyId = decoded.companyId as string;

if (!companyId) {
  return NextResponse.json({ error: "Company ID is required" }, { status: 400 });
}
const response = await userCompanyService.fetchUserCompanyById(id);

if (!response.result) {
  return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
}

const mappedResponse: FeUser = UserInputSchema.parse(response.result);

console.log(companyId, response.result.companyId)

if (companyId !== response.result.companyId) {
  return NextResponse.json({ error: "You are not authorized to access this resource" }, { status: 403 });
}

return NextResponse.json(mappedResponse);
};