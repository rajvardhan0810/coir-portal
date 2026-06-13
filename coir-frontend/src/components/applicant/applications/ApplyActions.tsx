"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createApplication } from "@/services/application.service";

type Props = {
  schemeId: number;
  courseId: number;
};

export function ApplyActions({
  schemeId,
  courseId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleNext() {
    try {
      setLoading(true);

      const application =
        await createApplication(
          schemeId,
          courseId,
        );

      router.push(
        `/applications/${application.id}/step-1`,
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create application",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="application-page__footer">

      <button
        type="button"
        className="application-page__btn application-page__btn--secondary"
        onClick={() => router.back()}
      >
        Back
      </button>

      <button
        type="button"
        className="application-page__btn application-page__btn--outline"
      >
        Save Draft
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={loading}
        className="application-page__btn application-page__btn--primary"
      >
        {loading
          ? "Creating..."
          : "Process to Next"}
      </button>

    </div>
  );
}