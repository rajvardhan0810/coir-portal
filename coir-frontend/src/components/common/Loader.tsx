export function Loader({ label = "Loading..." }: { label?: string }) {
  return <p className="auth-message">{label}</p>;
}
