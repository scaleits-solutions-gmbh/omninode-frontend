import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardContent,
  CardTitle
} from "@repo/pkg-frontend-common-kit/components";
import {
  TerminalIcon,
  MonitorIcon,
  CheckCircle,
} from "lucide-react";
import { FeClientCommand } from "@/types/acmp/client-command";
import { FeClient } from "@/types/acmp/client";

interface PushClientCommandPopupStep3Props {
  clientCommand: FeClientCommand;
  clients: FeClient[];
  onFinish: () => void;
  onBack: () => void;
}

export default function PushClientCommandPopupStep3({
  clientCommand,
  clients,
  onFinish,
  onBack,
}: PushClientCommandPopupStep3Props) {
  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 bg-primary/10 rounded-md">
            <TerminalIcon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Ready to Push Command</h2>
        <p className="text-sm text-muted-foreground">
          Review the details below before pushing the command to selected
          clients
        </p>
      </div>

      {/* Command Details */}
      <Card>
        <CardContent className="space-y-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TerminalIcon className="w-4 h-4" />
            Selected Command
          </CardTitle>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-base">{clientCommand.name}</h3>
              <p className="text-xs text-muted-foreground">
                Command details and description
              </p>
            </div>
            <Badge variant="secondary">v{clientCommand.version}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Clients Summary */}
      <Card>

        <CardContent>
          <div className="space-y-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MonitorIcon className="w-4 h-4" />
              Target Clients
            </CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Total clients selected:
              </span>
              <Badge variant="outline">
                {clients.length} client{clients.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            {/* Client List */}
            <div className="max-h-48 overflow-y-auto space-y-2">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-primary/10 rounded">
                      <MonitorIcon className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {client.computerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Client #{client.clientNo}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {client.name}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Alert */}
      <Alert variant="default">
        <CheckCircle />
        <AlertDescription>
          <span className="font-medium">Ready to execute</span>
          The command &quot;{clientCommand.name}&quot; will be pushed to {clients.length}{" "}
          client{clients.length !== 1 ? "s" : ""}
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onFinish}>Push Command</Button>
      </div>
    </div>
  );
}
