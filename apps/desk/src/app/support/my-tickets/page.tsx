import LayoutSideBar from "@/components/layout/layout-side-bar/layout-side-bar";

export default function MyTicketsPage() {
  return (
    <LayoutSideBar autoBreadCrumbs={{ category: "Support", breadcrumbs: [] }}>
      <div>MyTicketsPage</div>
    </LayoutSideBar>
  );
}
