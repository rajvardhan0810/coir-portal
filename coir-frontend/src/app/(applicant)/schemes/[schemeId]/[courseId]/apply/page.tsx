import { notFound } from "next/navigation";

import { DashboardLayout } from "@/components/applicant/dashboards/layout/DashboardLayout";
import { courses } from "@/components/applicant/schemes/courses/data/courses-data";

import { ApplyActions } from "@/components/applicant/applications/ApplyActions";

type PageProps = {
  params: Promise<{
    schemeId: string;
    courseId: string;
  }>;
};

export default async function ApplyPage({
  params,
}: PageProps) {
  const {
    schemeId,
    courseId,
  } = await params;

  const course = courses.find(
    (item) => item.id === courseId,
  );

  if (!course) {
    notFound();
  }

  // URL slug -> DB ID mapping
  const schemeIdMap: Record<
    string,
    number
  > = {
    cvy: 1,
  };

  const courseIdMap: Record<
    string,
    number
  > = {
    "diploma-coir-tech": 1,
    "certificate-artisan": 2,
    "vap-training": 3,
    "spinning-training": 4,
    edp: 5,
    "national-exposure": 6,
  };

  return (
    <DashboardLayout>
      <section className="application-page">
        <span className="application-page__label">
          APPLICATION FORM
        </span>

        <h1 className="application-page__title">
          {course.title}
        </h1>

        <div className="application-page__card">
          <h2 className="application-page__heading">
            <i
              className="bx bx-shield-quarter"
              aria-hidden="true"
            />
            INSTRUCTIONS
          </h2>

          <div className="application-page__content">
            <p>
              Candidates may pull their Aadhaar
              Card, Bank Account Statement,
              Class X, Class XII (as applicable)
              certificates, PAN Card (if available),
              Caste Certificate and Graduation
              Marksheet into their DigiLocker
              for auto filling of the application
              form.
            </p>

            <p>
              Alternatively, the attested copies
              of certificates in support of
              qualification, age, caste and
              PAN Card may be uploaded while
              filling the form.
            </p>

            <p>
              Aadhaar Card and photograph
              shall also need to be uploaded.
            </p>

            <p>
              Cancelled cheque and experience
              certificate may be kept handy
              for filling the following forms.
            </p>
          </div>
        </div>

        <ApplyActions
          schemeId={
            schemeIdMap[schemeId]
          }
          courseId={
            courseIdMap[courseId]
          }
        />
      </section>
    </DashboardLayout>
  );
}