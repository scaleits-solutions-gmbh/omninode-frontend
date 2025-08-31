import {
  ScrollArea,
  Checkbox,
  Label,
} from "frontend-common-kit";

interface AcmpPermissionsForm {
  canViewDashboard: boolean;
  canViewClients: boolean;
  canViewClientCommands: boolean;
  canViewRollouts: boolean;
  canPushClientCommands: boolean;
  canPushRollouts: boolean;
}

interface AcmpPermissionsSelectorProps {
  form: {
    Field: (props: {
      name: keyof AcmpPermissionsForm;
      children: (field: {
        name: string;
        state: { value: boolean };
        handleChange: (value: boolean) => void;
      }) => React.ReactNode;
    }) => React.ReactNode;
  };
}

export default function AcmpPermissionsSelector({
  form,
}: AcmpPermissionsSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Permissions</h3>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          <form.Field name="canViewDashboard">
            {(field) => (
              <div className="flex items-center space-x-4">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked as boolean);
                  }}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={field.name}
                  className="cursor-pointer flex flex-col items-start"
                >
                  View Dashboard
                  <span className="text-xs text-muted-foreground">
                    Allow this company to view the dashboard.
                  </span>
                </Label>
              </div>
            )}
          </form.Field>

          <form.Field name="canViewClients">
            {(field) => (
              <div className="flex items-center space-x-4">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked as boolean);
                  }}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={field.name}
                  className="cursor-pointer flex flex-col items-start"
                >
                  View Clients
                  <span className="text-xs text-muted-foreground">
                    Allow this company to view clients.
                  </span>
                </Label>
              </div>
            )}
          </form.Field>

          <form.Field name="canViewClientCommands">
            {(field) => (
              <div className="flex items-center space-x-4">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked as boolean);
                  }}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={field.name}
                  className="cursor-pointer flex flex-col items-start"
                >
                  View Client Commands
                  <span className="text-xs text-muted-foreground">
                    Allow this company to view client commands.
                  </span>
                </Label>
              </div>
            )}
          </form.Field>

          <form.Field name="canViewRollouts">
            {(field) => (
              <div className="flex items-center space-x-4">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked as boolean);
                  }}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={field.name}
                  className="cursor-pointer flex flex-col items-start"
                >
                  View Rollouts
                  <span className="text-xs text-muted-foreground">
                    Allow this company to view rollouts.
                  </span>
                </Label>
              </div>
            )}
          </form.Field>

          <form.Field name="canPushClientCommands">
            {(field) => (
              <div className="flex items-center space-x-4">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked as boolean);
                  }}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={field.name}
                  className="cursor-pointer flex flex-col items-start"
                >
                  Push Client Commands
                  <span className="text-xs text-muted-foreground">
                    Allow this company to push client commands to the client.
                  </span>
                </Label>
              </div>
            )}
          </form.Field>

          <form.Field name="canPushRollouts">
            {(field) => (
              <div className="flex items-center space-x-4">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked as boolean);
                  }}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={field.name}
                  className="cursor-pointer flex flex-col items-start"
                >
                  Push Rollouts
                  <span className="text-xs text-muted-foreground">
                    Allow this company to push rollouts to the client.
                  </span>
                </Label>
              </div>
            )}
          </form.Field>
        </div>
      </ScrollArea>
    </div>
  );
}
