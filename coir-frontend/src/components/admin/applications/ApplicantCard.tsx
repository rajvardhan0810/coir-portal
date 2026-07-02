type Props = {
  label: string;
  value: string;
};

export function ApplicantCard({
  label,
  value,
}: Props) {
  return (
    <div className="field-group">
      <label>{label}</label>

      <div className="field-value">
        {value}
      </div>
    </div>
  );
}