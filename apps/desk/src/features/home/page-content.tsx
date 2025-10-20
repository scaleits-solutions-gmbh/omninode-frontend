import { PageHeader } from "@repo/pkg-frontend-common-kit/components";
import Roadmap from "./components/Roadmap";
import Stats from "./components/Stats";

export default function PageContent() {
  return (
    <>
      <PageHeader
        title="Welcome to OmniNode Virtual Desk"
        subtitle="Your one-stop-shop for all your OmniNode needs"
      />
      <Stats />
      <div className="mt-4 space-x-6">
      <PageHeader
        title="Roadmap"
        subtitle="Our roadmap for the next quarters"
      />
      <Roadmap />
      </div>

    </>
  );
}
