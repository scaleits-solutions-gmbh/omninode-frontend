import { BaseProvidersAggregate } from "@repo/pkg-frontend-common-kit/components";
export default function ProvidersAggregate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseProvidersAggregate>{children}</BaseProvidersAggregate>;
}
