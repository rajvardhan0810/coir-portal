type Props = {
  application: any;
};

const BACKEND_URL =
  "http://localhost:4000";

const documentFields = [
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

export function PreviewDocuments({
  application,
}: Props) {
  const documents =
    application.detail
      ?.documents ?? {};

  return (
    <section className="application-card">

      <div className="application-card__header">
        <h2>
          Upload Document
        </h2>
      </div>

      <div className="preview-doc-grid">

        {documentFields.map(
          (document) => {
            const fileUrl =
              documents[
                document.key
              ];

            return (
              <div
                key={
                  document.key
                }
                className="preview-doc-item"
              >
                <label>
                  {
                    document.label
                  }
                </label>

                <div className="preview-doc-box">

                  <div className="preview-doc-name">
                    {fileUrl
                      ? fileUrl
                          .split("/")
                          .pop()
                      : "Not Uploaded"}
                  </div>

                  {fileUrl && (
                    <a
                      href={`${BACKEND_URL}${fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="preview-doc-link"
                    >
                      View Attachment
                    </a>
                  )}

                  <div className="preview-doc-status">
                    {fileUrl
                      ? "Uploaded"
                      : "Pending"}
                  </div>

                </div>

              </div>
            );
          },
        )}

      </div>

    </section>
  );
}