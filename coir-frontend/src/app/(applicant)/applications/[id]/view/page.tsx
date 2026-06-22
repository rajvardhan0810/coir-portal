"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

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

import {
  getApplication,
} from "@/services/application.service";

export default function ViewPage() {
  const params = useParams();

  const router = useRouter();

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
    <div className="application-view-page">

      <div className="view-header">

        <h1>
          Application Details
        </h1>

        <div className="view-meta">

          <span>
            <strong>
              Application No:
            </strong>{" "}
            {
              application.applicationNo
            }
          </span>

          <span>
            <strong>
              Status:
            </strong>{" "}
            {
              application.status
            }
          </span>

        </div>

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

      <div className="application-actions">

        <button
          type="button"
          className="application-btn application-btn--secondary"
          onClick={() =>
            router.back()
          }
        >
          Close
        </button>

      </div>

    </div>
  );
}