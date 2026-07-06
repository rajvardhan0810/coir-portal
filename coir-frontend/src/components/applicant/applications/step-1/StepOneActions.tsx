"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import type {
  PersonalDetails,
} from "./PersonalDetailsSection";

import {
  saveApplicationDetails,
} from "@/services/application.service";

import { getApiErrorMessage } from "@/lib/error";

import {
  hasValidationErrors,
  validateStepOneDocuments,
  validatePersonalDetails,
  type StepOneDocumentsValues,
  type ValidationErrors,
} from "@/components/applicant/applications/validation/applicationValidation";

type Props = {
  formData: PersonalDetails;

  documents: StepOneDocumentsValues;

  applicationId: number;

  setErrors: React.Dispatch<
    React.SetStateAction<ValidationErrors<PersonalDetails>>
  >;

  setDocumentErrors: React.Dispatch<
    React.SetStateAction<ValidationErrors<StepOneDocumentsValues>>
  >;
};

export function StepOneActions({
  formData,
  documents,
  applicationId,
  setErrors,
  setDocumentErrors,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  function validateBeforeSave() {
    const errors =
      validatePersonalDetails(
        formData,
      );
    const documentErrors =
      validateStepOneDocuments(
        documents,
      );

    setErrors(errors);
    setDocumentErrors(
      documentErrors,
    );

    if (
      hasValidationErrors(errors) ||
      hasValidationErrors(documentErrors)
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
          personalDetails:
            formData,

          documents,

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

  async function handleNext() {
    if (!validateBeforeSave()) {
      return;
    }

    try {
      setLoading(true);

      await saveApplicationDetails(
        applicationId,
        {
          personalDetails:
            formData,

          documents,

          currentStep: 2,
        },
      );

      router.push(
        `/applications/${applicationId}/step-2`,
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
        onClick={handleNext}
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Proceed To Next"}
      </button>
    </div>
  );
}
