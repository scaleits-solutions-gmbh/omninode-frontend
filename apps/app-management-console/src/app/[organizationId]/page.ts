import { redirect } from "next/navigation";

export default async function OrganizationDashboard({ params }: { params: Promise<{ organizationId: string }> }) {
  const { organizationId } = await params;
  redirect(`/${organizationId}/dashboard`);
}