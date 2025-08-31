import { useTranslations } from 'next-intl';
import { Button, Card, CardContent } from "@repo/pkg-frontend-common-kit/components";;
import { Search } from 'lucide-react';
import Link from 'next/link';
import LayoutCenteredXY from '@/components/layouts/layout-centered-xy/layout-centered-xy';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <LayoutCenteredXY>
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-muted">
              <Search className="h-6 w-6 text-foreground" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                {t('notFound.title')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('notFound.description')}
              </p>
            </div>

            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                {t('goHome')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </LayoutCenteredXY>
  );
}