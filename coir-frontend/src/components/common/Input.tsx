import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  requiredLabel?: boolean;
};

export function Input({ label, requiredLabel = false, ...props }: InputProps) {
  if (!label) {
    return <input {...props} />;
  }

  return (
    <label>
      {label} {requiredLabel ? <span className="required">*</span> : null}
      <input {...props} required={props.required ?? requiredLabel} />
    </label>
  );
}
