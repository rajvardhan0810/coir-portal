"use client";

import {
  useEffect,
  useState,
} from "react";

import { ApplyActions } from "@/components/applicant/applications/ApplyActions";
import {
  getProgramsByScheme,
  getSchemes,
} from "@/services/scheme.service";
import type { Scheme } from "../../types/scheme.type";
import type { Program } from "../types/programs.type";

type Props = {
  schemeCode: string;
  programId: string;
};

export function ApplyProgramSection({
  schemeCode,
  programId,
}: Props) {
  const [scheme, setScheme] =
    useState<Scheme | null>(null);

  const [program, setProgram] =
    useState<Program | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProgram() {
      try {
        setLoading(true);

        const schemes: Scheme[] =
          await getSchemes();

        const currentScheme =
          schemes.find(
            (item) =>
              item.code.toLowerCase() ===
              schemeCode.toLowerCase(),
          ) ?? null;

        setScheme(currentScheme);

        if (!currentScheme) {
          setProgram(null);
          return;
        }

        const programs: Program[] =
          await getProgramsByScheme(
            currentScheme.id,
          );

        const currentProgram =
          programs.find(
            (item) =>
              item.id === Number(programId),
          ) ?? null;

        setProgram(currentProgram);
      } catch (error) {
        console.error(error);
        setScheme(null);
        setProgram(null);
      } finally {
        setLoading(false);
      }
    }

    loadProgram();
  }, [schemeCode, programId]);

  if (loading) {
    return (
      <section className="application-page">
        <p>Loading application...</p>
      </section>
    );
  }

  if (!scheme || !program) {
    return (
      <section className="application-page">
        <h1 className="application-page__title">
          Program not found
        </h1>
      </section>
    );
  }

  return (
    <section className="application-page">
      <span className="application-page__label">
        APPLICATION FORM
      </span>

      <h1 className="application-page__title">
        {program.title}
      </h1>

      <div className="application-page__card">
        <h2 className="application-page__heading">
          <i
            className="bx bx-shield-quarter"
            aria-hidden="true"
          />
          INSTRUCTIONS
        </h2>

        <div className="application-page__content">
          <p>
            Candidates may pull their Aadhaar
            Card, Bank Account Statement,
            Class X, Class XII (as applicable)
            certificates, PAN Card (if available),
            Caste Certificate and Graduation
            Marksheet into their DigiLocker
            for auto filling of the application
            form.
          </p>

          <p>
            Alternatively, the attested copies
            of certificates in support of
            qualification, age, caste and PAN
            Card may be uploaded while filling
            the form.
          </p>

          <p>
            Aadhaar Card and photograph shall
            also need to be uploaded.
          </p>

          <p>
            Cancelled cheque and experience
            certificate may be kept handy for
            filling the following forms.
          </p>
        </div>
      </div>

      <ApplyActions
        schemeId={scheme.id}
        programId={program.id}
      />
    </section>
  );
}
