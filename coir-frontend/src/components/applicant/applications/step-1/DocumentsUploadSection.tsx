"use client";

import {
  uploadFile,
} from "@/services/application.service";

import type {
  StepOneDocumentsValues,
  ValidationErrors,
} from "@/components/applicant/applications/validation/applicationValidation";

type Props = {
  documents: StepOneDocumentsValues;

  errors?: ValidationErrors<StepOneDocumentsValues>;

  setErrors?: React.Dispatch<
    React.SetStateAction<ValidationErrors<StepOneDocumentsValues>>
  >;

  setDocuments: React.Dispatch<
    React.SetStateAction<StepOneDocumentsValues>
  >;
};

const requiredDocuments = [
  {
    key: "aadhaar",
    title: "AADHAAR",
    size: "PDF, JPG (Max 2MB)",
  },
  {
    key: "pan",
    title: "PAN NUMBER",
    size: "PDF, JPG (Max 5MB)",
  },
  {
    key: "tenthMarksheet",
    title: "10TH MARKSHEET",
    size: "PDF, JPG (Max 5MB)",
  },
  {
    key: "twelfthMarksheet",
    title: "12TH MARKSHEET",
    size: "PDF, JPG (Max 5MB)",
  },
  {
    key: "graduationCertificate",
    title:
      "GRADUATION MARKSHEET",
    size: "PDF, JPG (Max 5MB)",
  },
  {
    key: "casteCertificate",
    title:
      "CASTE CERTIFICATE",
    size: "PDF, JPG (Max 5MB)",
  },
] as const;

export function DocumentsUploadSection({
  documents,
  errors = {},
  setErrors,
  setDocuments,
}: Props) {
  async function handleUpload(
    file: File,
    field: keyof StepOneDocumentsValues,
  ) {
    try {
      const response =
        await uploadFile(file);

      setDocuments((prev) => ({
        ...prev,
        [field]:
          response.url,
      }));

      setErrors?.((prev) => ({
        ...prev,
        [field]:
          undefined,
      }));

      alert(
        "File uploaded successfully",
      );
    } catch (error) {
      console.error(error);

      alert(
        "File upload failed",
      );
    }
  }

  return (
    <section className="application-card">
      <div className="application-card__header">
        <h2 className="documents-section-title">
          <i className="bx bx-shield" />
          Upload Documents
        </h2>
      </div>

      <div className="documents-grid">
        {requiredDocuments.map(
          (document) => (
            <label
              key={document.key}
              className="document-upload-card"
            >
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                hidden
                onChange={async (
                  e,
                ) => {
                  const file =
                    e.target
                      .files?.[0];

                  if (file) {
                    await handleUpload(
                      file,
                      document.key,
                    );
                  }
                }}
              />

              <i
                className="bx bx-cloud-upload document-upload-card__icon"
                aria-hidden="true"
              />

              <h4>
                {document.title}{" "}
                <span className="required">
                  *
                </span>
              </h4>

              <span className="document-upload-card__hint">
                {document.size}
              </span>

              {documents[
                document.key
              ] ? (
                <span className="document-upload-card__file">
                  Uploaded ✓
                </span>
              ) : (
                <span className="document-upload-card__placeholder">
                  Click to Upload
                </span>
              )}

              {errors[document.key] ? (
                <span className="document-upload-card__error">
                  {errors[document.key]}
                </span>
              ) : null}
            </label>
          ),
        )}
      </div>
    </section>
  );
}
