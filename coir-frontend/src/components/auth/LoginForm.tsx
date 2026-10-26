"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { CaptchaBox } from "@/components/auth/CaptchaBox";
import { OtpInput } from "@/components/auth/OtpInput";
import { ROUTES } from "@/constants/routes";
import { getCaptcha, loginWithOtp, sendUserTypeOtp } from "@/services/auth.service";
import { saveAuthSession } from "@/store/authStore";
import type { CaptchaResponse } from "@/types/auth.types";

type LoginFormProps = {
  userType?: "INDIVIDUAL" | "BUSINESS";
  defaultEmail?: string;
  defaultMobile?: string;
  defaultPassword?: string;
};

export function LoginForm({
  userType = "INDIVIDUAL",
  defaultEmail,
  defaultMobile,
  defaultPassword,
}: LoginFormProps) {
  const router = useRouter();
  const isBusinessUser = userType === "BUSINESS";
  const [email, setEmail] = useState(
    isBusinessUser ? (defaultEmail ?? "supplier@coirboard.gov.in") : "",
  );
  const [mobile, setMobile] = useState(
    isBusinessUser ? (defaultMobile ?? "9625732059") : "",
  );
  const [password, setPassword] = useState(
    isBusinessUser ? (defaultPassword ?? "123456789") : "",
  );
  const [otp, setOtp] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captcha, setCaptcha] = useState<CaptchaResponse | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [devOtp, setDevOtp] = useState("");

  async function loadCaptcha() {
    try {
      const nextCaptcha = await getCaptcha();
      setCaptcha(nextCaptcha);
      setCaptchaAnswer(
        isBusinessUser
          ? (nextCaptcha.devCaptchaCode ?? "")
          : "",
      );
    } catch {
      setMessage("Captcha load nahi ho paya. Backend server check karein.");
    }
  }

  useEffect(() => {
    let isActive = true;

    void getCaptcha()
      .then((nextCaptcha) => {
        if (isActive) {
          setCaptcha(nextCaptcha);
          setCaptchaAnswer(
            isBusinessUser
              ? (nextCaptcha.devCaptchaCode ?? "")
              : "",
          );
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
      const response = await sendUserTypeOtp(mobile, userType);
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
        ...(isBusinessUser
          ? {
              email,
              mobile: mobile || "9625732059",
              password,
              captchaId: captcha?.captchaId ?? "",
              captchaCode: captchaAnswer,
            }
          : {
              mobile,
              otp,
              captchaId: captcha?.captchaId ?? "",
              captchaCode: captchaAnswer,
            }),
        userType,
      });

      saveAuthSession(
        response.accessToken, 
        response.refreshToken,
        response.user
    );
      router.replace(
        isBusinessUser ? ROUTES.businessDashboard : ROUTES.dashboard,
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
      await loadCaptcha();
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Sign In">
      <div className="auth-tabs" role="tablist" aria-label="User type">
        <Link
          className={`auth-tab${isBusinessUser ? " auth-tab--active" : ""}`}
          href={ROUTES.businessLogin}
        >
          <span className="auth-tab__icon">Business</span>
          Business User
        </Link>
        <Link
          className={`auth-tab${!isBusinessUser ? " auth-tab--active" : ""}`}
          href={ROUTES.login}
        >
          <span className="auth-tab__icon">Individual</span>
          Individual User
        </Link>
      </div>

      <form className="auth-card" onSubmit={login}>
        {isBusinessUser ? (
          <>
            <label>
              Supplier Email Address <span className="required">*</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="supplier@coirboard.gov.in"
                type="email"
                required
              />
            </label>

            <label>
              Password <span className="required">*</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                type="password"
                required
              />
            </label>

            <CaptchaBox
              captcha={captcha}
              value={captchaAnswer}
              onChange={setCaptchaAnswer}
              onRefresh={loadCaptcha}
            />
          </>
        ) : (
          <>
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
              onRefresh={loadCaptcha}
            />
          </>
        )}

        <button className="auth-primary" disabled={loading} type="submit">
          Sign in
        </button>

        <div className="auth-divider">
          <span>OR Login with</span>
        </div>

        {isBusinessUser ? (
          <button className="auth-digilocker" type="button" disabled style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#ffffff", cursor: "not-allowed", border: "1px solid #cbd6e2", borderRadius: "8px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <span style={{ background: "#ff7a00", color: "#ffffff", padding: "2px 6px", borderRadius: "4px", fontSize: "14px", fontWeight: "800" }}>Entity</span>
              <span style={{ color: "#2d3748", fontWeight: "800", fontSize: "16px" }}>Locker</span>
            </span>
          </button>
        ) : (
          <button className="auth-digilocker" type="button" disabled>
            <span className="auth-pehchaan">Meri Pehchaan</span>
            <span>By</span>
            <span className="auth-digi">DigiLocker</span>
          </button>
        )}

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link href={isBusinessUser ? ROUTES.businessRegister : ROUTES.register}>
            New Registration
          </Link>
        </p>

        {isBusinessUser && (
          <div style={{ textAlign: "center", marginTop: "18px", borderTop: "1px dashed #e2e8f0", paddingTop: "14px" }}>
            <Link 
              href="/showroom/dashboard" 
              style={{ 
                color: "var(--brand-dark)", 
                fontWeight: "700", 
                fontSize: "15px", 
                textDecoration: "underline" 
              }}
            >
              Showroom Login
            </Link>
          </div>
        )}

        {message ? <p className="auth-message">{message}</p> : null}
      </form>
    </AuthShell>
  );
}
