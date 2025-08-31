import WeclappEditConnectionDetailPopup from "./weclapp-edit-connection-detail-popup";
import {
  Card,
  CardContent,
  Badge,
  Button,
} from "frontend-common-kit";
import {
  Info,
  KeyRound,
  RefreshCcw,
  Copy,
  Check,
  CircleCheck,
} from "lucide-react";
import { useState } from "react";

export default function WeclappServiceInstanceDetails() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("1234***************");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Connection Details</h3>

      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <Info className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  Host Name
                </p>
              </div>
              <p className="text-sm font-mono bg-muted/50 p-2 rounded-md">
                https://scaleits.weclapp.com
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <KeyRound className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                  API Key
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono bg-muted/50 p-2 rounded-md flex-1">
                  1234***************
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <CircleCheck className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                Connection Status
              </p>
            </div>
            <Badge variant="success" className="text-xs">
              Connected
            </Badge>
          </div>
          <div className="flex gap-3">
            <WeclappEditConnectionDetailPopup />
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
