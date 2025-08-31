import {
  Card,
  CardContent,
} from "@repo/pkg-frontend-common-kit/components";
import { AlertCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function IncorrectUserError() {
  const t = useTranslations('errors');

  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <div className="size-12 bg-muted rounded-md flex items-center justify-center">
            <AlertCircleIcon className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-lg font-bold">{t('incorrectUser')}</p>
            <p className="text-sm text-muted-foreground">
              {t('incorrectUserDescription')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
