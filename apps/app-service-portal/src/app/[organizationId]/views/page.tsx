import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ organizationId: string }>;
};

/**
 * Views page - redirects to organization page which handles
 * finding the first accessible resource.
 */
export default async function ViewsPage({ params }: Props) {
  const { organizationId } = await params;
  redirect(`/${organizationId}`);
}
