"use client";

type Props = {
  bankDetails: {
    aadhaarNumber: string;
    panNumber: string;
    tenthMarks: string;
    twelfthMarks: string;
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };

  onChange: (
    field: string,
    value: string,
  ) => void;
};

export function BankDetailsSection({
  bankDetails,
  onChange,
}: Props) {
  return (
    <section className="application-card">

      <div className="application-card__header">
        <h2>
          Documents and Bank Details
        </h2>
      </div>

      <div className="form-grid form-grid--4">

        <div className="form-field">
          <label>
            Aadhaar Number
          </label>

          <input
            type="text"
            value={
              bankDetails.aadhaarNumber
            }
            onChange={(e) =>
              onChange(
                "aadhaarNumber",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            PAN Card Number
          </label>

          <input
            type="text"
            value={
              bankDetails.panNumber
            }
            onChange={(e) =>
              onChange(
                "panNumber",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            10th Std Marks
          </label>

          <input
            type="text"
            value={
              bankDetails.tenthMarks
            }
            onChange={(e) =>
              onChange(
                "tenthMarks",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            12th Std Marks
          </label>

          <input
            type="text"
            value={
              bankDetails.twelfthMarks
            }
            onChange={(e) =>
              onChange(
                "twelfthMarks",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            Bank Name
          </label>

          <input
            type="text"
            value={
              bankDetails.bankName
            }
            onChange={(e) =>
              onChange(
                "bankName",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            Account Holder Name
          </label>

          <input
            type="text"
            value={
              bankDetails.accountHolderName
            }
            onChange={(e) =>
              onChange(
                "accountHolderName",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            Account Number
          </label>

          <input
            type="text"
            value={
              bankDetails.accountNumber
            }
            onChange={(e) =>
              onChange(
                "accountNumber",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            IFSC Code
          </label>

          <input
            type="text"
            value={
              bankDetails.ifscCode
            }
            onChange={(e) =>
              onChange(
                "ifscCode",
                e.target.value,
              )
            }
          />
        </div>

      </div>

    </section>
  );
}