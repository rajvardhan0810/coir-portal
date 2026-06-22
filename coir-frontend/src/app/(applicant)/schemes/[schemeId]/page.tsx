import { DashboardLayout } from "@/components/applicant/dashboards/layout/DashboardLayout";
import { ProgramsSection } from "@/components/applicant/schemes/courses/section/ProgramsSection";

type PageProps = {
  params: Promise<{
    schemeId: string;
  }>;
};

export default async function SchemeCoursesPage({
  params,
}: PageProps) {
  const { schemeId } = await params;

  return (
    <DashboardLayout>
      <ProgramsSection
        schemeCode={schemeId}
      />
    </DashboardLayout>
  );
}
