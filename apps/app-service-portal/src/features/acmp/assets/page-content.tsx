import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import { AssetList } from "./list/asset-list";

export default function AssetsPageContent() {
  return (
    <>
      <PageHeader title="Assets" subtitle="View and manage your ACMP assets" />
      <AssetList />
    </>
  );
}


