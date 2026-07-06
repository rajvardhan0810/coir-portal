"use client";

import {
  validateExperienceDetails,
  type ExperienceDetailsValues,
  type ValidationErrors,
} from "@/components/applicant/applications/validation/applicationValidation";

type Props = {
  experience: ExperienceDetailsValues;

  errors?: ValidationErrors<ExperienceDetailsValues>;

  setErrors?: React.Dispatch<
    React.SetStateAction<ValidationErrors<ExperienceDetailsValues>>
  >;

  onChange: (
    field: keyof ExperienceDetailsValues,
    value: string,
  ) => void;
};

export function ExperienceSection({
  experience,
  errors = {},
  setErrors,
  onChange,
}: Props) {
  function handleChange(
    field: keyof ExperienceDetailsValues,
    value: string,
  ) {
    const nextExperience = {
      ...experience,
      [field]: value,
    };

    onChange(
      field,
      value,
    );

    setErrors?.((prev) => ({
      ...prev,
      [field]:
        validateExperienceDetails(
          nextExperience,
        )[field],
    }));
  }

  return (
    <section className="application-card">

      <div className="application-card__header">
        <h2>
          Details of Experience in Coir Industry
        </h2>
      </div>

      <div className="form-grid form-grid--2">

        <div className="form-field">
          <label>
            Name of Employer{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            value={
              experience.employerName
            }
            onChange={(e) =>
              handleChange(
                "employerName",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.employerName)
            }
          />

          {errors.employerName ? (
            <p className="form-field__error">
              {errors.employerName}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            Nature of Work{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="text"
            value={
              experience.natureOfWork
            }
            onChange={(e) =>
              handleChange(
                "natureOfWork",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.natureOfWork)
            }
          />

          {errors.natureOfWork ? (
            <p className="form-field__error">
              {errors.natureOfWork}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            Date of Joining{" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="date"
            value={
              experience.dateOfJoining
            }
            onChange={(e) =>
              handleChange(
                "dateOfJoining",
                e.target.value,
              )
            }
            aria-invalid={
              Boolean(errors.dateOfJoining)
            }
          />

          {errors.dateOfJoining ? (
            <p className="form-field__error">
              {errors.dateOfJoining}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label>
            Total Experience (Years){" "}
            <span className="required">
              *
            </span>
          </label>

          <input
            type="number"
            value={
              experience.totalExperience
            }
            onChange={(e) =>
              handleChange(
                "totalExperience",
                e.target.value,
              )
            }
            min={0}
            aria-invalid={
              Boolean(errors.totalExperience)
            }
          />

          {errors.totalExperience ? (
            <p className="form-field__error">
              {errors.totalExperience}
            </p>
          ) : null}
        </div>

      </div>

    </section>
  );
}
