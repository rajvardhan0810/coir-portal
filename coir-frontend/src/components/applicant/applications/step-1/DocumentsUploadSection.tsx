"use client";

import {
  uploadFile,
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
  documents: Documents;

  setDocuments: React.Dispatch<
    React.SetStateAction<Documents>
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
  setDocuments,
}: Props) {
  async function handleUpload(
    file: File,
    field: keyof Documents,
  ) {
    try {
      const response =
        await uploadFile(file);

      setDocuments((prev) => ({
        ...prev,
        [field]:
          response.url,
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
                {document.title}
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
            </label>
          ),
        )}
      </div>
    </section>
  );
}