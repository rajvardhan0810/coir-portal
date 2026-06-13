import { DashboardLayout } from "@/components/applicant/dashboards/layout/DashboardLayout";
import { CoursesSection } from "@/components/applicant/schemes/courses/section/CoursesSection";

type PageProps = {
  params: Promise<{
    schemeId: string;
  }>;
};

const schemeTitles: Record<string, string> = {
  cvy: "Skill Upgradation & Mahila Coir Yojana",
  st: "Science & Technology",
  dmp: "Domestic Market Promotion",
  emp: "Export Market Promotion",
  tifss:
    "Trade & Industry Functional Support Services",
  wm: "Welfare Measures",
};

export default async function SchemeCoursesPage({
  params,
}: PageProps) {
  const { schemeId } = await params;

  const schemeTitle =
    schemeTitles[schemeId] ??
    "Scheme Details";

  return (
    <DashboardLayout>
      <CoursesSection
        schemeId={schemeId}
        schemeTitle={schemeTitle}
      />
    </DashboardLayout>
  );
}