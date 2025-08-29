import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";
export default function UsersPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Company",
      breadcrumbs: [
        {
          label: "Home"
        },
      ],
    }}
    >
      Home
    </SideBarLayout>
  );
}
