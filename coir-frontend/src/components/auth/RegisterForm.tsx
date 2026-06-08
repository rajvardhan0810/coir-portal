"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { ROUTES } from "@/constants/routes";
import { getCleanFormPayload } from "@/lib/utils";
import { registerUser } from "@/services/auth.service";

export function RegisterForm() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function register(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const payload = getCleanFormPayload(
      event.currentTarget,
    );

    try {
      const response =
        await registerUser(payload);

      setMessage(response.message);

      window.setTimeout(() => {
        router.push(ROUTES.login);
      }, 1500);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Register">
      <div
        className="auth-tabs"
        role="tablist"
        aria-label="User type"
      >
        <button
          className="auth-tab"
          type="button"
          disabled
        >
          <span className="auth-tab__icon">
            Business
          </span>
          Business User
        </button>

        <button
          className="auth-tab auth-tab--active"
          type="button"
        >
          <span className="auth-tab__icon">
            Individual
          </span>
          Individual User
        </button>
      </div>

      <form
        className="auth-card auth-card--wide"
        onSubmit={register}
      >
        <div className="auth-grid">
          <label>
            Full Name{" "}
            <span className="required">
              *
            </span>

            <input
              name="fullName"
              placeholder="Full Name"
              required
            />
          </label>

          <label>
            Mobile Number{" "}
            <span className="required">
              *
            </span>

            <input
              name="mobile"
              placeholder="9876543210"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              required
            />
          </label>

          <label>
            Email

            <input
              name="email"
              type="email"
              placeholder="john@example.com"
            />
          </label>

          <label>
            Date of Birth

            <input
              name="dateOfBirth"
              type="date"
            />
          </label>

          <label>
            Gender

            <select
              name="gender"
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </label>

          <label>
            Country

            <input
              name="country"
              placeholder="India"
              defaultValue="India"
            />
          </label>

          <label>
            State

            <input
              name="state"
              placeholder="State"
            />
          </label>

          <label>
            District

            <input
              name="district"
              placeholder="District"
            />
          </label>

          <label>
            City

            <input
              name="city"
              placeholder="City"
            />
          </label>

          <label>
            Pincode

            <input
              name="pincode"
              placeholder="462001"
              inputMode="numeric"
              maxLength={6}
            />
          </label>
        </div>

        <label>
          Address

          <textarea
            name="addressLine"
            placeholder="Enter Address"
            rows={3}
          />
        </label>

        <button
          className="auth-primary"
          disabled={loading}
          type="submit"
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>

        <p className="auth-switch">
          <Link href={ROUTES.login}>
            Already registered? Sign In
          </Link>
        </p>

        {message ? (
          <p className="auth-message">
            {message}
          </p>
        ) : null}
      </form>
    </AuthShell>
  );
}