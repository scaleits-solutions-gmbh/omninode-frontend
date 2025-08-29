import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/ui/cn";

type StatBoxProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  iconclass?: string;
  bgclass?: string;
};

export default function StatBox({ icon: Icon, label, value, iconclass, bgclass }: StatBoxProps) {
  return (
    <Card>
      <CardContent className="flex gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarFallback className={cn(bgclass)}>
              <Icon className={cn("h-4 w-4", iconclass)} />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col">
          <span>{label}</span>
          <span className="font-medium">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
