import { BaseProvidersAggregate } from "@repo/pkg-frontend-common-kit/components";
import { NextIntlClientProvider } from "next-intl";

type AppProvidersAggregateProps = {
  messages: Record<string, string | Record<string, string>> | undefined;
  children: React.ReactNode;
};

export function AppProvidersAggregate({
  children,
  messages,
}: AppProvidersAggregateProps) {
  return (
    <NextIntlClientProvider messages={messages}>
      <BaseProvidersAggregate>{children}</BaseProvidersAggregate>
    </NextIntlClientProvider>
  );
}
