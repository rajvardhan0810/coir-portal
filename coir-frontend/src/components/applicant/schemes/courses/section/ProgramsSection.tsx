"use client";

import {
  useEffect,
  useState,
} from "react";

import { ProgramsCard } from "../cards/ProgramsCard";
import type { Program } from "../types/programs.type";
import type { Scheme } from "../../types/scheme.type";

import {
  getProgramsByScheme,
  getSchemes,
} from "@/services/scheme.service";

type Props = {
  schemeCode: string;
};

export function ProgramsSection({
  schemeCode,
}: Props) {
  const [scheme, setScheme] =
    useState<Scheme | null>(null);

  const [programs, setPrograms] =
    useState<Program[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadPrograms() {
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
          setPrograms([]);
          return;
        }

        const data: Program[] =
          await getProgramsByScheme(
            currentScheme.id,
          );

        setPrograms(data);
      } catch (error) {
        console.error(error);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    }

    loadPrograms();
  }, [schemeCode]);

  if (loading) {
    return (
      <section className="courses-layout">
        <div className="courses-content">
          <p>Loading programs...</p>
        </div>
      </section>
    );
  }

  if (!scheme) {
    return (
      <section className="courses-layout">
        <div className="courses-content">
          <p>Scheme not found.</p>
        </div>
      </section>
    );
  }

  const schemePath =
    scheme.code.toLowerCase();

  const footerText = programs.length
    ? `Showing 1 to ${programs.length} of ${programs.length}`
    : "No programs found";

  return (
    <section className="courses-layout">
      {/* LEFT FILTER PANEL */}

      <aside className="courses-filters">
        <div className="courses-filter-group">
          <div className="courses-filter-title">
            Scheme Type
          </div>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Science & Technology (S&T)
          </label>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Skill Upgradation
          </label>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Marketing Promotion
          </label>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Procurement
          </label>

          <label>
            <input
              type="checkbox"
              defaultChecked
            />
            Finance and Subsidy
          </label>

          <label>
            <input type="checkbox" />
            Welfare Measures
          </label>
        </div>

        <div className="courses-filter-group">
          <div className="courses-filter-title">
            Type of Beneficiary
          </div>

          <label>
            <input type="checkbox" />
            Coir Artisans
          </label>

          <label>
            <input type="checkbox" />
            Exporters
          </label>

          <label>
            <input type="checkbox" />
            Showrooms
          </label>

          <label>
            <input type="checkbox" />
            Sales Depot
          </label>

          <label>
            <input type="checkbox" />
            Trainers
          </label>
        </div>

        <button
          type="button"
          className="courses-search-btn"
        >
          Search
        </button>
      </aside>

      {/* RIGHT CONTENT */}

      <div className="courses-content">
        <div className="courses-page__header">
          <div>
            <span className="courses-page__eyebrow">
              {scheme.code}
            </span>

            <h1 className="courses-page__title">
              {scheme.name}
            </h1>
          </div>

          <div className="courses-toolbar">
            <select>
              <option>
                Latest Schemes
              </option>

              <option>
                Oldest Schemes
              </option>
            </select>

            <button
              type="button"
              aria-label="Grid view"
            >
              <i
                className="bx bx-grid-alt"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              aria-label="List view"
            >
              <i
                className="bx bx-list-ul"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="courses-page__grid">
          {programs.map((program) => (
            <ProgramsCard
              key={program.id}
              program={program}
              schemeId={schemePath}
            />
          ))}
        </div>

        <div className="courses-footer">
          <button
            type="button"
            className="courses-back-btn"
          >
            Back
          </button>

          <div className="courses-pagination">
            <span>{footerText}</span>

            <div>
              <button>{"<"}</button>

              <button className="active">
                1
              </button>

              <button>{">"}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
