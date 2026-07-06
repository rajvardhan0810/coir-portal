"use client";

import {
  normalizeBankDetailsField,
  validateBankDetails,
  type BankDetailsValues,
  type ValidationErrors,
} from "@/components/applicant/applications/validation/applicationValidation";

type Props = {
  bankDetails: BankDetailsValues;

  errors?: ValidationErrors<BankDetailsValues>;

  setErrors?: React.Dispatch<
    React.SetStateAction<ValidationErrors<BankDetailsValues>>
  >;

  onChange: (
    field: keyof BankDetailsValues,
    value: string,
  ) => void;
};

export function BankDetailsSection({
  bankDetails,
  errors = {},
  setErrors,
  onChange,
}: Props) {
  function handleChange(
    field: keyof BankDetailsValues,
    value: string,
  ) {
    const nextValue =
      normalizeBankDetailsField(
        field,
        value,
      );

    const nextBankDetails = {
      ...bankDetails,
      [field]: nextValue,
    };

    onChange(
      field,
      nextValue,
    );

    setErrors?.((prev) => ({
      ...prev,
      [field]:
        validateBankDetails(
          nextBankDetails,
        )[field],
    }));
  }

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
            Aadhaar Number{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={12}
            value={
              bankDetails.aadhaarNumber
            }
            onChange={(e) =>
              handleChange(
                "aadhaarNumber",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.aadhaarNumber)
            }
          />

          {errors.aadhaarNumber ? (
            <p className="form-field__error">
              {errors.aadhaarNumber}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            PAN Card Number{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            maxLength={10}
            value={
              bankDetails.panNumber
            }
            onChange={(e) =>
              handleChange(
                "panNumber",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.panNumber)
            }
          />

          {errors.panNumber ? (
            <p className="form-field__error">
              {errors.panNumber}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            10th Std Marks{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            inputMode="decimal"
            value={
              bankDetails.tenthMarks
            }
            onChange={(e) =>
              handleChange(
                "tenthMarks",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.tenthMarks)
            }
          />

          {errors.tenthMarks ? (
            <p className="form-field__error">
              {errors.tenthMarks}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            12th Std Marks{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            inputMode="decimal"
            value={
              bankDetails.twelfthMarks
            }
            onChange={(e) =>
              handleChange(
                "twelfthMarks",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.twelfthMarks)
            }
          />

          {errors.twelfthMarks ? (
            <p className="form-field__error">
              {errors.twelfthMarks}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            Bank Name{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            value={
              bankDetails.bankName
            }
            onChange={(e) =>
              handleChange(
                "bankName",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.bankName)
            }
          />

          {errors.bankName ? (
            <p className="form-field__error">
              {errors.bankName}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            Account Holder Name{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            value={
              bankDetails.accountHolderName
            }
            onChange={(e) =>
              handleChange(
                "accountHolderName",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.accountHolderName)
            }
          />

          {errors.accountHolderName ? (
            <p className="form-field__error">
              {errors.accountHolderName}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            Account Number{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={18}
            value={
              bankDetails.accountNumber
            }
            onChange={(e) =>
              handleChange(
                "accountNumber",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.accountNumber)
            }
          />

          {errors.accountNumber ? (
            <p className="form-field__error">
              {errors.accountNumber}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            IFSC Code{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            maxLength={11}
            value={
              bankDetails.ifscCode
            }
            onChange={(e) =>
              handleChange(
                "ifscCode",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.ifscCode)
            }
          />

          {errors.ifscCode ? (
            <p className="form-field__error">
              {errors.ifscCode}
            </p>
          ) : null}
        </div>

      </div>

    </section>
  );
}
