type Props = {
  onApprove: () => void;
  onClarification: () => void;
  onReview: () => void;
};

export function ApprovalActions({
  onApprove,
  onClarification,
  onReview,
}: Props) {
  return (
    <div className="approval-actions">

      <button
        className="btn btn-blue"
        onClick={onClarification}
      >
        Clarification Sought
      </button>

      <button
        className="btn btn-orange"
        onClick={onReview}
      >
        Send Back To Review
      </button>

      <button
        className="btn btn-green"
        onClick={onApprove}
      >
        Verify
      </button>

    </div>
  );
}