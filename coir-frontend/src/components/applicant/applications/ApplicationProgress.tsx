type ApplicationProgressProps = {
  currentStep: 1 | 2 | 3 | 4;
};

const steps = [
  {
    title: "Application Details",
    description:
      "Documents and personal information",
  },
  {
    title: "Auto-Filled Information",
    description:
      "Applicant details verification",
  },
  {
    title:
      "Optional Attachment & Declaration",
    description:
      "Additional documents",
  },
  {
    title:
      "Review & Final Submission",
    description:
      "Verify before submit",
  },
];

export function ApplicationProgress({
  currentStep,
}: ApplicationProgressProps) {
  return (
    <section className="application-progress">
      <h3 className="application-progress__title">
        Your Application Progress
      </h3>

      <div className="application-progress__steps">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const isCompleted =
            currentStep > stepNumber;

          const isActive =
            currentStep === stepNumber;

          return (
            <div
              key={step.title}
              className={`progress-step
                ${
                  isCompleted
                    ? "progress-step--completed"
                    : ""
                }
                ${
                  isActive
                    ? "progress-step--active"
                    : ""
                }
              `}
            >
              <div className="progress-step__circle">
                {isCompleted
                  ? "✓"
                  : stepNumber}
              </div>

              <div className="progress-step__content">
                <h4>{step.title}</h4>

                <p>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}