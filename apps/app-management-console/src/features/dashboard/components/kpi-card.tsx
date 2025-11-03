import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/pkg-frontend-common-kit/components";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


interface KpiCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  href?: string;
}
export default function KpiCard({ label, value, icon, href }: KpiCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex flex-row items-end
       justify-between gap-2">
        <div className="text-2xl font-bold">{value}</div>
        {href && <Link href={href} className="cursor-pointer transition-colors duration-200 text-sm text-muted-foreground hover:text-primary flex items-center gap-1">view <ArrowRight className="h-4 w-4" /></Link>}
      </CardContent>
    </Card>
  );
}
