'use client';

import { useEffect } from 'react';
import { Button, Card, CardContent } from "@repo/pkg-frontend-common-kit/components";
import { AlertCircle } from 'lucide-react';
import LayoutCenteredXY from '@/components/layouts/layout-centered-xy/layout-centered-xy';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <LayoutCenteredXY>
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-muted">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                Something went wrong
              </h2>
              <p className="text-sm text-muted-foreground">
                An unexpected error occurred. Please try again.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full">
              <Button
                onClick={reset}
                className="w-full sm:w-auto"
              >
                Try again
              </Button>
              
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Go home
              </Button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="w-full text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Technical details
                </summary>
                <pre className="mt-2 text-xs text-muted-foreground bg-muted p-3 rounded-md overflow-auto">
                  {error.message}
                  {error.stack && '\n\n' + error.stack}
                </pre>
              </details>
            )}
          </div>
        </CardContent>
      </Card>
    </LayoutCenteredXY>
  );
}