import { Badge, Card, CardTitle, CardHeader, CardContent } from "frontend-common-kit";
import {
  Calendar,
  Code,
  Database,
  Users,
  Briefcase,
  Settings,
} from "lucide-react";

const roadmapItems = [
  {
    title: "Q3 2024",
    items: [
      {
        title: "Platform Core",
        tag: "Functional",
        expectedDate: "Sep 2024",
      },
      {
        title: "ACMP Module",
        tag: "ACMP",
        expectedDate: "Oct 2024",
      },
    ],
  },
  {
    title: "Q4 2024",
    items: [
      {
        title: "Weclapp Module",
        tag: "Weclapp",
        expectedDate: "Nov 2024",
      },
      {
        title: "Status Page",
        tag: "Functional",
        expectedDate: "Oct 2024",
      },
      {
        title: "M365 Module",
        tag: "M365",
        expectedDate: "Dec 2024",
      },
    ],
  },
  {
    title: "Q1 2025",
    items: [
      {
        title: "Deals Module",
        tag: "Deals",
        expectedDate: "Feb 2025",
      },
      {
        title: "ACMP Security and Compliance",
        tag: "ACMP",
        expectedDate: "Mar 2025",
      },
    ],
  },
];

const getTagConfig = (tag: string) => {
  switch (tag) {
    case "Functional":
      return {
        color: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
        icon: Settings,
        lightBg: "bg-blue-50 dark:bg-blue-950/20",
      };
    case "ACMP":
      return {
        color: "bg-gradient-to-r from-red-500 to-red-600 text-white",
        icon: Database,
        lightBg: "bg-red-50 dark:bg-red-950/20",
      };
    case "Weclapp":
      return {
        color: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
        icon: Code,
        lightBg: "bg-emerald-50 dark:bg-emerald-950/20",
      };
    case "M365":
      return {
        color: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
        icon: Users,
        lightBg: "bg-cyan-50 dark:bg-cyan-950/20",
      };
    case "Deals":
      return {
        color: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
        icon: Briefcase,
        lightBg: "bg-purple-50 dark:bg-purple-950/20",
      };
    default:
      return {
        color: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
        icon: Settings,
        lightBg: "bg-gray-50 dark:bg-gray-950/20",
      };
  }
};

export default function Roadmap() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {roadmapItems.map((quarter, quarterIndex) => (
        <Card key={quarterIndex} className="pt-0">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-t-xl border-b">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-slate-600 shadow-md shadow-slate-600/20 flex items-center justify-center">
                <Calendar className="h-4 w-4" />
              </div>
              {quarter.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quarter.items.map((item, itemIndex) => {
              const tagConfig = getTagConfig(item.tag);
              const TagIcon = tagConfig.icon;

              return (
                <Card key={itemIndex}>
                  <CardContent className=" space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${tagConfig.color} border-0 font-medium px-3 py-1 flex items-center gap-2`}
                      >
                        <TagIcon className="h-3 w-3" />
                        {item.tag}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-foreground leading-tight">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 rounded-md px-3 py-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">
                        Expected: {item.expectedDate}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
