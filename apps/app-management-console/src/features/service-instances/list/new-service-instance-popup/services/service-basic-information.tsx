import { Input, Label, Textarea } from "@repo/pkg-frontend-common-kit/components";
import React from "react";
import { useForm } from "@tanstack/react-form";

interface ServiceBasicInformationProps {
  initialName?: string;
  initialDescription?: string;
  onChange?: (value: { name: string; description: string; isValid: boolean }) => void;
}

type BasicFieldProps = {
  name: string;
  state: { value: string };
  handleBlur: () => void;
  handleChange: (value: string) => void;
};

type BasicInfoForm = {
  Subscribe: React.ComponentType<{
    selector: (s: { values: { name?: unknown; description?: unknown } }) => {
      name: string;
      description: string;
    };
    children: (value: { name: string; description: string }) => React.ReactNode;
  }>;
};

function BasicInfoSync({
  form,
  onChange,
}: {
  form: BasicInfoForm;
  onChange?: (value: { name: string; description: string; isValid: boolean }) => void;
}) {
  if (!onChange) return null;

  return (
    <form.Subscribe
      selector={(s: { values: { name?: unknown; description?: unknown } }) => ({
        name: String(s.values.name ?? ""),
        description: String(s.values.description ?? ""),
      })}
    >
      {({ name, description }: { name: string; description: string }) => {
        const isValid = name.trim().length > 0;
        onChange({ name, description, isValid });
        return null;
      }}
    </form.Subscribe>
  );
}

export default function ServiceBasicInformation({
  initialName = "",
  initialDescription = "",
  onChange,
}: ServiceBasicInformationProps) {
  const form = useForm({
    defaultValues: {
      name: initialName,
      description: initialDescription,
    },
  });

  return (
    <>
      <div>
        <div className="text-sm font-medium mb-2">Basic information</div>
        <p className="text-xs text-muted-foreground">
          Provide a clear name and optional description for this connection. Users
          will see this information in lists and details.
        </p>
      </div>
      <div className="space-y-6">
        <form.Field name="name">
          {(field: BasicFieldProps) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Name</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. My Service Instance"
              />
              {field.state.value.trim().length === 0 && (
                <em role="alert" className="text-sm text-red-500">
                  Name is required
                </em>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="description">
          {(field: BasicFieldProps) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Description</Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Short description to help teammates recognize this connection"
                rows={3}
              />
            </div>
          )}
        </form.Field>
      </div>
      <BasicInfoSync form={form} onChange={onChange} />
    </>
  );
}
