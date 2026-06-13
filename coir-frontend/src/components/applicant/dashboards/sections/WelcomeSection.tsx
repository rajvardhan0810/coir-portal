type WelcomeSectionProps = {
  userName: string;
};

export function WelcomeSection({
  userName,
}: WelcomeSectionProps) {
  return (
    <section className="welcome-section">
      <span className="welcome-section__eyebrow">
        COIR BOARD
      </span>

      <h1 className="welcome-section__title">
        Welcome, {userName}
      </h1>
    </section>
  );
}