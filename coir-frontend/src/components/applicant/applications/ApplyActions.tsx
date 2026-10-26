"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { createApplication } from "@/services/application.service";

type Props = {
  schemeId: number;
  programId: number;
};

export function ApplyActions({
  schemeId,
  programId,
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
          programId,
        );

      router.push(
        `/applications/${application.id}/step-1`,
      );
    } catch (error: any) {
      console.error(error);

      if (error?.response?.status === 401) {
        toast.error("Please log in to apply for this scheme");
        router.push("/login");
        return;
      }

      toast.error(
        error?.response?.data?.message ||
        "Failed to create application. Please try again.",
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