type Props = {
  application: any;
};

export function PreviewBankDetails({
  application,
}: Props) {
  const bankDetails =
    application.detail
      ?.bankDetails ?? {};

  const documents =
    application.detail
      ?.documents ?? {};

  return (
    <section className="application-card">

      <div className="application-card__header">
        <h2>
          Documents and Bank Details
        </h2>
      </div>

      <div className="preview-grid">

        <div className="form-field">
          <label>
            Aadhaar Number
          </label>

          <div className="preview-value">
            {documents.aadhaarNumber ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            PAN Card Number
          </label>

          <div className="preview-value">
            {documents.panNumber ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            10th Std Marks
          </label>

          <div className="preview-value">
            {documents.tenthMarks ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            12th Std Marks
          </label>

          <div className="preview-value">
            {documents.twelfthMarks ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            Bank Name
          </label>

          <div className="preview-value">
            {bankDetails.bankName ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            Account Holder Name
          </label>

          <div className="preview-value">
            {bankDetails.accountHolderName ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            Account Number
          </label>

          <div className="preview-value">
            {bankDetails.accountNumber ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            IFSC Code
          </label>

          <div className="preview-value">
            {bankDetails.ifscCode ??
              "-"}
          </div>
        </div>

      </div>

    </section>
  );
}