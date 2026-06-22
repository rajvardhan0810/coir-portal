import { DashboardLayout } from "@/components/applicant/dashboards/layout/DashboardLayout";
import { ApplyProgramSection } from "@/components/applicant/schemes/courses/section/ApplyProgramSection";

type PageProps = {
  params: Promise<{
    schemeId: string;
    programId: string;
  }>;
};

export default async function ApplyPage({
  params,
}: PageProps) {
  const {
    schemeId,
    programId,
  } = await params;

  return (
    <DashboardLayout>
      <ApplyProgramSection
        schemeCode={schemeId}
        programId={programId}
      />
    </DashboardLayout>
  );
}
