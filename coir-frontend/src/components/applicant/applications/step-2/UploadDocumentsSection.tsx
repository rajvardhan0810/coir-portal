"use client";

import {
  uploadFile,
} from "@/services/application.service";

type Documents = {
  cancelCheque: string;
  experienceLetter: string;
};

type Props = {
  documents: Documents;

  setDocuments: React.Dispatch<
    React.SetStateAction<Documents>
  >;
};

const documentFields: {
  key: keyof Documents;
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
                {document.label}
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

            </div>
          ),
        )}

      </div>

    </section>
  );
}