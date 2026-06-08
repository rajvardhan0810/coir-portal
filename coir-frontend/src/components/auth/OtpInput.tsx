type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function OtpInput({ value, onChange }: OtpInputProps) {
  return (
    <label>
      Enter OTP <span className="required">*</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="1234"
        inputMode="numeric"
        maxLength={6}
        required
      />
    </label>
  );
}
