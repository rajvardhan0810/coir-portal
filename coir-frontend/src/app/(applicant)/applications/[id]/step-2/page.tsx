"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { ApplicationShell }
from "@/components/applicant/applications/layout/ApplicationShell";

import { ApplicationLayout }
from "@/components/applicant/applications/ApplicationLayout";

import { ApplicationProgress }
from "@/components/applicant/applications/ApplicationProgress";

import { ExperienceSection }
from "@/components/applicant/applications/step-2/ExperienceSection";

import { TrainingCentreSection }
from "@/components/applicant/applications/step-2/TrainingCentreSection";

import { BankDetailsSection }
from "@/components/applicant/applications/step-2/BankDetailsSection";

import { UploadDocumentsSection }
from "@/components/applicant/applications/step-2/UploadDocumentsSection";

import { StepTwoActions }
from "@/components/applicant/applications/step-2/StepTwoActions";

export default function StepTwoPage() {
  const params = useParams();

  const applicationId = Number(
    params.id,
  );

  const [
    trainingCentreId,
    setTrainingCentreId,
  ] = useState<number | null>(
    null,
  );

  const [experience, setExperience] =
    useState({
      employerName: "",
      natureOfWork: "",
      dateOfJoining: "",
      totalExperience: "",
    });

  const [bankDetails, setBankDetails] =
    useState({
      aadhaarNumber: "",
      panNumber: "",
      tenthMarks: "",
      twelfthMarks: "",
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
    });

  // ✅ Sirf 2 documents
  const [documents, setDocuments] =
    useState({
      cancelCheque: "",
      experienceLetter: "",
    });

  return (
    <ApplicationShell>

      <ApplicationLayout
        progress={
          <ApplicationProgress
            currentStep={2}
          />
        }
      >
        <div className="application-page-header">
          <p>
            APPLICATION FORM
          </p>

          <h1>
            Diploma Course in Coir Technology
          </h1>
        </div>

        <ExperienceSection
          experience={experience}
          onChange={(
            field,
            value,
          ) =>
            setExperience(
              (prev) => ({
                ...prev,
                [field]: value,
              }),
            )
          }
        />

        <TrainingCentreSection
          trainingCentreId={
            trainingCentreId
          }
          setTrainingCentreId={
            setTrainingCentreId
          }
        />

        <BankDetailsSection
          bankDetails={
            bankDetails
          }
          onChange={(
            field,
            value,
          ) =>
            setBankDetails(
              (prev) => ({
                ...prev,
                [field]:
                  value,
              }),
            )
          }
        />

        <UploadDocumentsSection
          documents={
            documents
          }
          setDocuments={
            setDocuments
          }
        />

        <StepTwoActions
          applicationId={
            applicationId
          }
          trainingCentreId={
            trainingCentreId
          }
          experience={
            experience
          }
          bankDetails={
            bankDetails
          }
          documents={
            documents
          }
        />

      </ApplicationLayout>

    </ApplicationShell>
  );
}