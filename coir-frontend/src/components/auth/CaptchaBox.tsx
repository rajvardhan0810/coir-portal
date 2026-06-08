import type { CaptchaResponse } from "@/types/auth.types";

type CaptchaBoxProps = {
  captcha: CaptchaResponse | null;
  value: string;
  onChange: (value: string) => void;
};

export function CaptchaBox({ captcha, value, onChange }: CaptchaBoxProps) {
  return (
    <label>
      Captcha <span className="required">*</span>
      <span className="auth-captcha-row">
        <span className="auth-captcha-code">
          {captcha?.question.replace(" = ?", "") ?? "----"}
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter captcha"
          required
        />
      </span>
    </label>
  );
}
