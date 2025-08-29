import { Card, CardContent, CardHeader, CardTitle } from "@scaleits-solutions-gmbh/omninode-frontend-common-kit/components";
import { TrendingUp, MessageSquare, CheckCircle } from "lucide-react";

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-muted-foreground text-sm">
            Total Ideas Submitted
          </CardTitle>
          <div className="h-10 w-10 rounded-md bg-primary shadow-md shadow-primary/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-foreground">156</div>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  +12%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-muted-foreground text-sm">
            Total Feedbacks Received
          </CardTitle>
          <div className="h-10 w-10 rounded-md bg-primary shadow-md shadow-primary/20 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-foreground">89</div>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  +8%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-muted-foreground text-sm">
            Total Tickets Resolved
          </CardTitle>
          <div className="h-10 w-10 rounded-md bg-primary shadow-md shadow-primary/20 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-foreground">234</div>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  +24%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
