import { Card, CardContent } from "@/components/ui/card";
import ThemePersonalSettings from "./themePersonalSettings";

export default function PersonalSettingsCard() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Personal settings</h3>
      <Card>
        <CardContent className="space-y-4">
          <ThemePersonalSettings />
        </CardContent>
      </Card>
    </div>
  );
}
