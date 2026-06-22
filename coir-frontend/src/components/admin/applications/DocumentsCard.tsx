type Props = {
  title: string;
  fileName: string;
};

export function DocumentsCard({
  title,
  fileName,
}: Props) {
  return (
    <div className="document-card">

      <h4>{title}</h4>

      <div className="document-preview">
        Preview
      </div>

      <p>{fileName}</p>

      <button className="btn btn-outline">
        View PDF
      </button>

    </div>
  );
}