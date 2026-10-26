import type { CaptchaResponse } from "@/types/auth.types";

type CaptchaBoxProps = {
  captcha: CaptchaResponse | null;
  value: string;
  onChange: (value: string) => void;
  onRefresh?: () => void;
};

export function CaptchaBox({ captcha, value, onChange, onRefresh }: CaptchaBoxProps) {
  return (
    <div className="auth-captcha-group">
      <label className="auth-captcha-label">
        Captcha <span className="required">*</span>
      </label>
      <div className="auth-captcha-row">
        <div 
          className="auth-captcha-badge" 
          onClick={onRefresh} 
          title="Click to refresh captcha"
        >
          <span>{captcha?.question ? captcha.question.replace(" = ?", "") : "----"}</span>
          {onRefresh && (
            <button
              type="button"
              className="auth-captcha-refresh"
              onClick={(e) => {
                e.stopPropagation();
                onRefresh();
              }}
              title="Refresh Captcha"
            >
              🔄
            </button>
          )}
        </div>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter captcha"
          required
        />
      </div>
    </div>
  );
}
