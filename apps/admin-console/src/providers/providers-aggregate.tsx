import { BaseProvidersAggregate } from "frontend-common-kit";

export default function ProvidersAggregate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseProvidersAggregate>{children}</BaseProvidersAggregate>;
}
