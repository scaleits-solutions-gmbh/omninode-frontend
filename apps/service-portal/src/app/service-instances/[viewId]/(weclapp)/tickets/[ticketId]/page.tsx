import SideBarLayout from "@/components/layout/layoutSideBar/layoutSideBar";

export default function TicketDetailsPage() {
  return (
    <SideBarLayout
    autoBreadCrumbs={{
      category: "Weclapp",
      breadcrumbs: [
        {
          label: "Tickets"
        },
        {
          label: "Ticket Details"
        }
      ],
    }}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Ticket Details</h1>
      </div>
    </SideBarLayout>
  );
}
