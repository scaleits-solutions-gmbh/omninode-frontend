import { usePathname } from "next/navigation";

export function useOrganizationId() {
  const pathname = usePathname();
  return pathname.split("/")[1] || "";
}