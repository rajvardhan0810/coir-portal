"use client";

import { useState } from "react";

export function DeclarationSection() {
  const [accepted, setAccepted] =
    useState(false);

  return (
    <section className="application-card">

      <div className="application-card__header">
        <h2>Declaration</h2>
      </div>

      <div className="declaration-section">

        <label className="declaration-checkbox">

          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) =>
              setAccepted(
                e.target.checked,
              )
            }
          />

          <span>
            I hereby declare that all
            information provided by me
            in this application is true
            and correct to the best of
            my knowledge and belief.
          </span>

        </label>

        <p className="declaration-text">
          I understand that if any
          information or document is
          found to be false or
          misleading, my application
          may be rejected at any stage.
        </p>

      </div>

    </section>
  );
}