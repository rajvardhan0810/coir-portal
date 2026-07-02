type ApplicationLayoutProps = {
  children: React.ReactNode;
  progress?: React.ReactNode;
};

export function ApplicationLayout({
  children,
  progress,
}: ApplicationLayoutProps) {
  return (
    <div
      className={`application-layout ${
        !progress ? "application-layout--full" : ""
      }`}
    >
      <main className="application-layout__content">
        {children}
      </main>

      {progress && (
        <aside className="application-layout__sidebar">
          {progress}
        </aside>
      )}
    </div>
  );
}