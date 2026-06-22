"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";

import { ApplicationShell }
from "@/components/applicant/applications/layout/ApplicationShell";

import { ApplicationLayout }
from "@/components/applicant/applications/ApplicationLayout";

import { ApplicationProgress }
from "@/components/applicant/applications/ApplicationProgress";

import { PreviewPersonalDetails }
from "@/components/applicant/applications/preview/PreviewPersonalDetails";

import { PreviewExperience }
from "@/components/applicant/applications/preview/PreviewExperience";

import { PreviewTrainingCentre }
from "@/components/applicant/applications/preview/PreviewTrainingCentre";

import { PreviewBankDetails }
from "@/components/applicant/applications/preview/PreviewBankDetails";

import { PreviewDocuments }
from "@/components/applicant/applications/preview/PreviewDocuments";

import { DeclarationSection }
from "@/components/applicant/applications/preview/DeclarationSection";

import { PreviewActions }
from "@/components/applicant/applications/preview/PreviewActions";

import {
  getApplication,
} from "@/services/application.service";

export default function PreviewPage() {
  const params = useParams();

  const applicationId = Number(
    params.id,
  );

  const [application, setApplication] =
    useState<any>(null);

  useEffect(() => {
    async function loadApplication() {
      try {
        const data =
          await getApplication(
            applicationId,
          );

        setApplication(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadApplication();
  }, [applicationId]);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <ApplicationShell>
      <ApplicationLayout
        progress={
          <ApplicationProgress
            currentStep={4}
          />
        }
      >
        <div className="application-page-header">
          <p>
            APPLICATION FORM - FINAL PREVIEW
          </p>

          <h1>
            Diploma Course in Coir Technology - Preview
          </h1>
        </div>

        <PreviewPersonalDetails
          application={application}
        />

        <PreviewExperience
          application={application}
        />

        <PreviewTrainingCentre
          application={application}
        />

        <PreviewBankDetails
          application={application}
        />

        <PreviewDocuments
          application={application}
        />

        

        <PreviewActions
          applicationId={applicationId}
        />
      </ApplicationLayout>
    </ApplicationShell>
  );
}