type Props = {
  application: any;
};

export function PreviewTrainingCentre({
  application,
}: Props) {
  const trainingCentre =
    application.trainingCentre;

  return (
    <section className="application-card">

      <div className="application-card__header">
        <h2>
          Training Centre
        </h2>
      </div>

      <div className="preview-training">

        <div className="form-field">
          <label>
            Selected Training Centre
          </label>

          <div className="preview-value">
            {trainingCentre
              ? `${trainingCentre.name}, ${trainingCentre.state}`
              : "-"}
          </div>
        </div>

      </div>

    </section>
  );
}