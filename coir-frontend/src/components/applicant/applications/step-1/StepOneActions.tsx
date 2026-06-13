"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import type {
  PersonalDetails,
} from "./PersonalDetailsSection";

import {
  saveApplicationDetails,
} from "@/services/application.service";

type Documents = {
  photo: string;
  aadhaar: string;
  pan: string;
  tenthMarksheet: string;
  twelfthMarksheet: string;
  graduationCertificate: string;
  casteCertificate: string;
};

type Props = {
  formData: PersonalDetails;

  documents: Documents;

  applicationId: number;
};

export function StepOneActions({
  formData,
  documents,
  applicationId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleSaveDraft() {
    try {
      setLoading(true);

      await saveApplicationDetails(
        applicationId,
        {
          personalDetails:
            formData,

          documents,

          currentStep: 1,
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

  async function handleNext() {
    try {
      setLoading(true);

      await saveApplicationDetails(
        applicationId,
        {
          personalDetails:
            formData,

          documents,

          currentStep: 1,
        },
      );

      router.push(
        `/applications/${applicationId}/step-2`,
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