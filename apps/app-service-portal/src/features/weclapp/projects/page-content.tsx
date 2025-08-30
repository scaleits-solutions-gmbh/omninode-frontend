import { PageHeader } from "frontend-common-kit/components";
import { ProjectList } from "./list/project-list";

export default function ProjectsPageContent() {
  return (
    <>
      <PageHeader title="Projects" subtitle="Track and manage your Weclapp projects" />
      <ProjectList />
    </>
  );
}
