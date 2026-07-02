"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { submitApplication } from "@/services/application.service";

type Props = {
  applicationId: number;
};

export function PreviewActions({
  applicationId,
}: Props) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showConfirmModal, setShowConfirmModal] =
    useState(false);

  const [showSuccessModal, setShowSuccessModal] =
    useState(false);

  const [
    isDeclarationAccepted,
    setIsDeclarationAccepted,
  ] = useState(false);

  function handleBack() {
    router.push(
      `/applications/${applicationId}/step-2`,
    );
  }

  function handleEdit() {
    router.push(
      `/applications/${applicationId}/step-1`,
    );
  }

  async function handleSubmit() {
    if (!isDeclarationAccepted) {
      alert(
        "Please accept the declaration before submitting.",
      );

      return;
    }

    try {
      setIsSubmitting(true);

      const response =
        await submitApplication(
          applicationId,
        );

      console.log(response);

      setShowConfirmModal(false);

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to submit application",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDashboard() {
    setShowSuccessModal(false);

    router.push("/dashboard");
  }

  return (
    <>
      <section className="application-card">
        <div className="application-card__header">
          <h2>Declaration</h2>
        </div>

        <div className="declaration-box">
          <label className="declaration-checkbox">
            <input
              type="checkbox"
              checked={
                isDeclarationAccepted
              }
              onChange={(e) =>
                setIsDeclarationAccepted(
                  e.target.checked,
                )
              }
            />

            <span>
              I hereby declare that all
              information provided by me
              in this application is
              true and correct to the
              best of my knowledge and
              belief.
            </span>
          </label>

          <p className="declaration-note">
            I understand that if any
            information or document is
            found to be false or
            misleading, my application
            may be rejected at any
            stage.
          </p>
        </div>
      </section>

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
          onClick={handleEdit}
        >
          Edit
        </button>

        <button
          type="button"
          className="application-btn application-btn--primary preview-submit-btn"
          onClick={() =>
            setShowConfirmModal(true)
          }
          disabled={
            isSubmitting ||
            !isDeclarationAccepted
          }
        >
          Final Submit
        </button>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="submit-modal">
            <div className="submit-modal__icon">
              ✓
            </div>

            <h2>
              Are you sure?
            </h2>

            <p>
              Are you sure you want to
              submit the Application
              Form:
            </p>

            <strong>
              "Diploma Course in Coir
              Technology"
            </strong>

            <button
              type="button"
              className="submit-modal__primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Yes, Submit"}
            </button>

            <button
              type="button"
              className="submit-modal__cancel"
              onClick={() =>
                setShowConfirmModal(
                  false,
                )
              }
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="submit-modal">
            <div className="submit-modal__success">
              ✓
            </div>

            <h2>
              Submitted Successfully
            </h2>

            <p>
              Application submitted
              for
            </p>

            <strong>
              "Diploma Course in Coir
              Technology"
            </strong>

            <button
              type="button"
              className="submit-modal__primary"
              onClick={
                handleDashboard
              }
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
}