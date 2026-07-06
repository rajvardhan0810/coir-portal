"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  saveApplicationDetails,
} from "@/services/application.service";

import { getApiErrorMessage } from "@/lib/error";

import {
  hasValidationErrors,
  validateBankDetails,
  validateExperienceDetails,
  validateStepTwoDocuments,
  type BankDetailsValues,
  type ExperienceDetailsValues,
  type StepTwoDocumentsValues,
  type ValidationErrors,
} from "@/components/applicant/applications/validation/applicationValidation";

type Props = {
  applicationId: number;

  trainingCentreId:
    number | null;

  experience: ExperienceDetailsValues;

  setExperienceErrors: React.Dispatch<
    React.SetStateAction<ValidationErrors<ExperienceDetailsValues>>
  >;

  bankDetails: BankDetailsValues;

  setBankErrors: React.Dispatch<
    React.SetStateAction<ValidationErrors<BankDetailsValues>>
  >;

  documents: StepTwoDocumentsValues;

  setDocumentErrors: React.Dispatch<
    React.SetStateAction<ValidationErrors<StepTwoDocumentsValues>>
  >;

  setTrainingCentreError: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
};

export function StepTwoActions({
  applicationId,
  trainingCentreId,
  experience,
  setExperienceErrors,
  bankDetails,
  setBankErrors,
  documents,
  setDocumentErrors,
  setTrainingCentreError,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  function handleBack() {
    router.push(
      `/applications/${applicationId}/step-1`,
    );
  }

  function validateBeforeSave() {
    const experienceErrors =
      validateExperienceDetails(
        experience,
      );
    const bankErrors =
      validateBankDetails(
        bankDetails,
      );
    const documentErrors =
      validateStepTwoDocuments(
        documents,
      );
    const trainingError =
      trainingCentreId
        ? undefined
        : "Training centre is required";

    setExperienceErrors(
      experienceErrors,
    );
    setBankErrors(bankErrors);
    setDocumentErrors(
      documentErrors,
    );
    setTrainingCentreError(
      trainingError,
    );

    if (
      hasValidationErrors(experienceErrors) ||
      hasValidationErrors(bankErrors) ||
      hasValidationErrors(documentErrors) ||
      trainingError
    ) {
      alert(
        "Please correct the highlighted fields.",
      );

      return false;
    }

    return true;
  }

  async function handleSaveDraft() {
    if (!validateBeforeSave()) {
      return;
    }

    try {
      setLoading(true);

      await saveApplicationDetails(
        applicationId,
        {
          experienceDetails:
            experience,

          bankDetails,

          documents,

          trainingCentreId,

          currentStep: 2,
        },
      );

      alert(
        "Draft saved successfully",
      );
    } catch (error) {
      console.error(error);

      alert(
        getApiErrorMessage(
          error,
          "Failed to save draft",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePreview() {
    if (!validateBeforeSave()) {
      return;
    }

    try {
      setLoading(true);

      await saveApplicationDetails(
        applicationId,
        {
          experienceDetails:
            experience,

          bankDetails,

          documents,

          trainingCentreId,

          currentStep: 3,
        },
      );

      router.push(
        `/applications/${applicationId}/preview`,
      );
    } catch (error) {
      console.error(error);

      alert(
        getApiErrorMessage(
          error,
          "Failed to save data",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="application-actions">

      <button
        type="button"
        className="application-btn application-btn--secondary"
        onClick={handleBack}
      >
        Back
      </button>

      <button
        type="button"
        className="application-btn application-btn--outline"
        onClick={handleSaveDraft}
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Draft"}
      </button>

      <button
        type="button"
        className="application-btn application-btn--primary"
        onClick={handlePreview}
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Process to Final Preview"}
      </button>

    </div>
  );
}
