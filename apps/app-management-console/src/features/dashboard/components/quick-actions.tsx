import { Card, CardContent, CardHeader, CardTitle, Button } from "@repo/pkg-frontend-common-kit/components";
import { UserPlus, SmilePlus, Layers2 } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Button asChild>
            <Link href="../users" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Invite User</span>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="../service-instances" className="flex items-center gap-2">
              <Layers2 className="h-4 w-4" />
              <span>Add Service Instance</span>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="../organization-relationships" className="flex items-center gap-2">
              <SmilePlus className="h-4 w-4" />
              <span>Invite Organization</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


