"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  saveApplicationDetails,
} from "@/services/application.service";

type Props = {
  applicationId: number;

  trainingCentreId:
    number | null;

  experience: {
    employerName: string;
    natureOfWork: string;
    dateOfJoining: string;
    totalExperience: string;
  };

  bankDetails: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };

  documents: any;
};

export function StepTwoActions({
  applicationId,
  trainingCentreId,
  experience,
  bankDetails,
  documents,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  function handleBack() {
    router.push(
      `/applications/${applicationId}/step-1`,
    );
  }

  async function handleSaveDraft() {
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
        "Failed to save draft",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePreview() {
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
        "Failed to save data",
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