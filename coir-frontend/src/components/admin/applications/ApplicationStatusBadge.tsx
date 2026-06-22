type Props = {
  status: string;
};

export function ApplicationStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`status-badge status-${status.toLowerCase()}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}