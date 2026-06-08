"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { CaptchaBox } from "@/components/auth/CaptchaBox";
import { OtpInput } from "@/components/auth/OtpInput";
import { ROUTES } from "@/constants/routes";
import { getCaptcha, loginWithOtp, sendOtp } from "@/services/auth.service";
import { saveAuthSession } from "@/store/authStore";
import type { CaptchaResponse } from "@/types/auth.types";

export function LoginForm() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaResponse | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [devOtp, setDevOtp] = useState("");

  async function loadCaptcha() {
    const nextCaptcha = await getCaptcha();
    setCaptcha(nextCaptcha);
    setCaptchaAnswer("");
  }

  useEffect(() => {
    let isActive = true;

    void getCaptcha()
      .then((nextCaptcha) => {
        if (isActive) {
          setCaptcha(nextCaptcha);
          setCaptchaAnswer("");
        }
      })
      .catch(() => {
        if (isActive) {
          setMessage("Captcha load nahi ho paya. Backend server check karein.");
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  async function handleSendOtp() {
    setLoading(true);
    setMessage("");
    try {
      const response = await sendOtp(mobile);
      setDevOtp(response.devOtp ?? "");
      setMessage(response.message);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await loginWithOtp({
        mobile,
        otp,
        captchaId: captcha?.captchaId ?? "",
        captchaCode: captchaAnswer,
      });

      saveAuthSession(
        response.accessToken, 
        response.refreshToken,
        response.user
    );
      router.push(ROUTES.dashboard);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
      await loadCaptcha().catch(() => {
        setMessage("Captcha refresh nahi ho paya. Backend server check karein.");
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Sign In">
      <div className="auth-tabs" role="tablist" aria-label="User type">
        <Link className="auth-tab" href={ROUTES.register}>
          <span className="auth-tab__icon">Business</span>
          Business User
        </Link>
        <button className="auth-tab auth-tab--active" type="button">
          <span className="auth-tab__icon">Individual</span>
          Individual User
        </button>
      </div>

      <form className="auth-card" onSubmit={login}>
        <label>
          Mobile Number <span className="required">*</span>
          <span className="auth-input-action">
            <input
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="9812345678"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              required
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading || mobile.length !== 10}
            >
              Get OTP
            </button>
          </span>
        </label>

        {devOtp ? <p className="dev-otp">Dev OTP: {devOtp}</p> : null}

        <OtpInput value={otp} onChange={setOtp} />
        <CaptchaBox
          captcha={captcha}
          value={captchaAnswer}
          onChange={setCaptchaAnswer}
        />

        <button className="auth-primary" disabled={loading} type="submit">
          Sign in
        </button>

        <div className="auth-divider">
          <span>OR Login with</span>
        </div>

        <button className="auth-digilocker" type="button" disabled>
          <span className="auth-pehchaan">Meri Pehchaan</span>
          <span>By</span>
          <span className="auth-digi">DigiLocker</span>
        </button>

        <p className="auth-switch">
          <Link href={ROUTES.register}>New user registration</Link>
        </p>

        {message ? <p className="auth-message">{message}</p> : null}
      </form>
    </AuthShell>
  );
}
