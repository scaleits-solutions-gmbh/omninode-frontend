import PageHeader from "@/components/display/pageHeader";
import { ProjectList } from "./list/ProjectList";

export default function ProjectsPageContent() {
  return (
    <>
      <PageHeader title="Projects" subtitle="Track and manage your Weclapp projects" />
      <ProjectList />
    </>
  );
}
