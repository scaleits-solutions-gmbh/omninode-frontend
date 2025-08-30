import {
  Badge,
  Button,
  Card,
  CardContent,
} from "frontend-common-kit/components";
import { Calendar, Clock, Pencil, Trash } from "lucide-react";
import Image from "next/image";

export default function WeclappServiceInstanceDetails() {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center border rounded-lg p-2 bg-muted/50">
            <Image
              src="/assets/weclapp.svg"
              alt="Weclapp"
              width={48}
              height={48}
              className="p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium">ScaleITS Weclapp Prod</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Weclapp
              </Badge>
              <Badge variant="success" className="text-xs">
                Active
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                Last Updated
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">2025-02-01</p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm">
                by <span className="font-medium">John Doe</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                Created At
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">2025-01-01</p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm">
                by <span className="font-medium">John Doe</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="default" size="sm" className="gap-2">
            <Pencil className="h-4 w-4" />
            Edit Instance
          </Button>
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash className="h-4 w-4" />
            Delete Instance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
