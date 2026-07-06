"use client";

import {
  uploadFile,
} from "@/services/application.service";

import type {
  StepTwoDocumentsValues,
  ValidationErrors,
} from "@/components/applicant/applications/validation/applicationValidation";

type Props = {
  documents: StepTwoDocumentsValues;

  errors?: ValidationErrors<StepTwoDocumentsValues>;

  setErrors?: React.Dispatch<
    React.SetStateAction<ValidationErrors<StepTwoDocumentsValues>>
  >;

  setDocuments: React.Dispatch<
    React.SetStateAction<StepTwoDocumentsValues>
  >;
};

const documentFields: {
  key: keyof StepTwoDocumentsValues;
  label: string;
}[] = [
  {
    key: "cancelCheque",
    label: "CANCEL CHEQUE",
  },
  {
    key: "experienceLetter",
    label:
      "EXPERIENCE LETTER",
  },
];

export function UploadDocumentsSection({
  documents,
  errors = {},
  setErrors,
  setDocuments,
}: Props) {
  async function handleUpload(
    file: File,
    field: keyof StepTwoDocumentsValues,
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
        <h2>
          Upload Document
        </h2>
      </div>

      <div className="upload-doc-grid">

        {documentFields.map(
          (document) => (
            <div
              key={document.key}
              className="upload-item"
            >
              <label className="upload-label">
                {document.label}{" "}
                <span className="required">
                  *
                </span>
              </label>

              <div className="upload-wrapper">

                <input
                  type="file"
                  id={document.key}
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

                <label
                  htmlFor={
                    document.key
                  }
                  className="upload-file"
                >
                  {documents[
                    document.key
                  ]
                    ? "Uploaded ✓"
                    : "Choose File"}
                </label>

              </div>

              {errors[document.key] ? (
                <p className="form-field__error">
                  {errors[document.key]}
                </p>
              ) : null}

            </div>
          ),
        )}

      </div>

    </section>
  );
}
