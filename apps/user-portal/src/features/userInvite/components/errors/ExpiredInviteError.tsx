import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon } from "lucide-react";

export default function ExpiredInviteError() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <div className="size-12 bg-muted rounded-md flex items-center justify-center">
            <AlertCircleIcon className="size-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-lg font-bold">Expired</p>
            <p className="text-sm text-muted-foreground">
              The invite link has expired
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 