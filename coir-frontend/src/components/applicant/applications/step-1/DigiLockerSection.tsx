"use client";

export function DigiLockerSection() {
  return (
    <section className="digilocker-card">
      <div className="digilocker-card__left">

        {/* DigiLocker Logo */}

        <div className="digilocker-card__logo">
          <img
            src="/assets/images/digilocker.png"
            alt="DigiLocker"
          />
        </div>

        <div className="digilocker-card__content">
          <h3>
            Instant Data Fetch via DigiLocker
          </h3>

          <p>
            Save time by automatically pulling
            your verified name, DOB and Aadhaar
            document directly from your
            DigiLocker account.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="digilocker-card__button"
      >
        <i className="bx bx-cloud-upload" />

        <span>
          Fetch from
          <br />
          DigiLocker
        </span>
      </button>
    </section>
  );
}