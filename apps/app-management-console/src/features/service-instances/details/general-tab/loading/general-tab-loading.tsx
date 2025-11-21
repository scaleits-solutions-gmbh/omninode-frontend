import BasicInformationCardLoading from "./basic-information-card-loading";
import OrganizationRelationshipGrantsCardLoading from "./organization-relationship-grants-card-loading";
import MembershipGrantsCardLoading from "./membership-grants-card-loading";
import ConnectionDetailsCardLoading from "./connection-details-card-loading";

export default function GeneralTabLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div className="col-span-1 space-y-6">
        <BasicInformationCardLoading />
        <ConnectionDetailsCardLoading />
      </div>
      <div className="col-span-2 space-y-6">
        <OrganizationRelationshipGrantsCardLoading
          rows={5}
          cols={{
            col1: { width: 50, minWidth: 100 },
            col2: { width: 49, minWidth: 100 },
            col3: { width: 1, minWidth: 50 },
          }}
        />
        <MembershipGrantsCardLoading
          rows={5}
          cols={{
            col1: { width: 50, minWidth: 100 },
            col2: { width: 49, minWidth: 100 },
            col3: { width: 1, minWidth: 50 },
          }}
        />
      </div>
    </div>
  );
}
