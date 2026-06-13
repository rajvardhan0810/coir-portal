type Props = {
  application: any;
};

export function PreviewExperience({
  application,
}: Props) {
  const experience =
    application.detail
      ?.experienceDetails;

  return (
    <section className="application-card">

      <div className="application-card__header">
        <h2>
          Details of Experience in Coir Industry
        </h2>
      </div>

      <div className="preview-grid">

        <div className="form-field">
          <label>
            Name of Employer
          </label>

          <div className="preview-value">
            {experience?.employerName ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            Nature of Work
          </label>

          <div className="preview-value">
            {experience?.natureOfWork ??
              "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            Date of Joining
          </label>

          <div className="preview-value">
            {experience?.dateOfJoining
              ? new Date(
                  experience.dateOfJoining,
                ).toLocaleDateString(
                  "en-GB",
                )
              : "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            Total Experience
          </label>

          <div className="preview-value">
            {experience?.totalExperience
              ? `${experience.totalExperience} Years`
              : "-"}
          </div>
        </div>

      </div>

    </section>
  );
}