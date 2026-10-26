"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";
import { getApplication } from "@/services/application.service";

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

import type {
  BankDetailsValues,
  ExperienceDetailsValues,
  StepTwoDocumentsValues,
  ValidationErrors,
} from "@/components/applicant/applications/validation/applicationValidation";

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
    useState<ExperienceDetailsValues>({
      employerName: "",
      natureOfWork: "",
      dateOfJoining: "",
      totalExperience: "",
    });

  const [experienceErrors, setExperienceErrors] =
    useState<ValidationErrors<ExperienceDetailsValues>>(
      {},
    );

  const [
    trainingCentreError,
    setTrainingCentreError,
  ] = useState<string | undefined>(
    undefined,
  );

  const [bankDetails, setBankDetails] =
    useState<BankDetailsValues>({
      aadhaarNumber: "",
      panNumber: "",
      tenthMarks: "",
      twelfthMarks: "",
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
    });

  const [bankErrors, setBankErrors] =
    useState<ValidationErrors<BankDetailsValues>>(
      {},
    );

  // ✅ Sirf 2 documents
  const [documents, setDocuments] =
    useState<StepTwoDocumentsValues>({
      cancelCheque: "",
      experienceLetter: "",
    });

  const [documentErrors, setDocumentErrors] =
    useState<ValidationErrors<StepTwoDocumentsValues>>(
      {},
    );

  const [application, setApplication] =
    useState<any>(null);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const data =
          await getApplication(
            applicationId,
          );

        setApplication(data);

        if (data.trainingCentreId) {
          setTrainingCentreId(
            data.trainingCentreId,
          );
        }

        if (
          data.detail
            ?.experienceDetails
        ) {
          setExperience(
            data.detail
              .experienceDetails,
          );
        }

        if (
          data.detail
            ?.bankDetails
        ) {
          setBankDetails(
            data.detail
              .bankDetails,
          );
        }

        if (
          data.detail
            ?.documents
        ) {
          setDocuments(
            (prev) => ({
              ...prev,
              ...data.detail.documents,
            }),
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (applicationId) {
      fetchApplication();
    }
  }, [applicationId]);

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
            APPLICATION FORM {application?.scheme?.name ? `• ${application.scheme.name}` : ""}
          </p>

          <h1>
            {application?.program?.title || "Application Form"}
          </h1>
        </div>

        <ExperienceSection
          experience={experience}
          errors={
            experienceErrors
          }
          setErrors={
            setExperienceErrors
          }
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
          error={
            trainingCentreError
          }
          setError={
            setTrainingCentreError
          }
          setTrainingCentreId={
            setTrainingCentreId
          }
        />

        <BankDetailsSection
          bankDetails={
            bankDetails
          }
          errors={
            bankErrors
          }
          setErrors={
            setBankErrors
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
          errors={
            documentErrors
          }
          setErrors={
            setDocumentErrors
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
          setExperienceErrors={
            setExperienceErrors
          }
          bankDetails={
            bankDetails
          }
          setBankErrors={
            setBankErrors
          }
          documents={
            documents
          }
          setDocumentErrors={
            setDocumentErrors
          }
          setTrainingCentreError={
            setTrainingCentreError
          }
        />

      </ApplicationLayout>

    </ApplicationShell>
  );
}
