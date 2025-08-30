import SideBarLayout from "@/components/layout/layout-side-bar/layout-side-bar";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home",
  description: "OmniNode Management Console - manage your company resources",
};

export default function UsersPage() {
  redirect("/service-instances");
  return (
    <SideBarLayout
      autoBreadCrumbs={{
        category: "Company",
        breadcrumbs: [
          {
            label: "Home",
          },
        ],
      }}
    >
      <div>
        <h1>Home</h1>
      </div>
    </SideBarLayout>
  );
}
