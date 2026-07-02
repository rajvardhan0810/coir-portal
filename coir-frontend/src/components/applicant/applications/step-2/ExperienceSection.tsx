"use client";

type Props = {
  experience: {
    employerName: string;
    natureOfWork: string;
    dateOfJoining: string;
    totalExperience: string;
  };

  onChange: (
    field: string,
    value: string,
  ) => void;
};

export function ExperienceSection({
  experience,
  onChange,
}: Props) {
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
            Name of Employer
          </label>

          <input
            type="text"
            value={
              experience.employerName
            }
            onChange={(e) =>
              onChange(
                "employerName",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            Nature of Work
          </label>

          <input
            type="text"
            value={
              experience.natureOfWork
            }
            onChange={(e) =>
              onChange(
                "natureOfWork",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            Date of Joining
          </label>

          <input
            type="date"
            value={
              experience.dateOfJoining
            }
            onChange={(e) =>
              onChange(
                "dateOfJoining",
                e.target.value,
              )
            }
          />
        </div>

        <div className="form-field">
          <label>
            Total Experience (Years)
          </label>

          <input
            type="number"
            value={
              experience.totalExperience
            }
            onChange={(e) =>
              onChange(
                "totalExperience",
                e.target.value,
              )
            }
          />
        </div>

      </div>

    </section>
  );
}