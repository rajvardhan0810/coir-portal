"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getTrainingCentres,
} from "@/services/training-centre.service";

type TrainingCentre = {
  id: number;
  name: string;
  district: string;
  state: string;
  address: string;
};

type Props = {
  trainingCentreId: number | null;

  error?: string;

  setError?: (
    error: string | undefined,
  ) => void;

  setTrainingCentreId: (
    id: number,
  ) => void;
};

export function TrainingCentreSection({
  trainingCentreId,
  error,
  setError,
  setTrainingCentreId,
}: Props) {
  const [centres, setCentres] =
    useState<TrainingCentre[]>(
      [],
    );

  useEffect(() => {
    async function loadCentres() {
      try {
        const data =
          await getTrainingCentres();

        setCentres(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCentres();
  }, []);

  return (
    <section className="application-card">
      <div className="training-centre">

        <div className="application-card__header">
          <h2>
            Training Centre
          </h2>
        </div>

        <div className="training-centre__field">

          <label>
            Select Training Centre{" "}
            <span className="required">
              *
            </span>
          </label>

          <select
            value={
              trainingCentreId ?? ""
            }
            onChange={(e) => {
              setTrainingCentreId(
                Number(
                  e.target.value,
                ),
              );
              setError?.(undefined);
            }}
            aria-invalid={
              Boolean(error)
            }
          >
            <option value="">
              Select Training Centre
            </option>

            {centres.map(
              (centre) => (
                <option
                  key={centre.id}
                  value={centre.id}
                >
                  {centre.district},{" "}
                  {centre.state}
                </option>
              ),
            )}
          </select>

          {error ? (
            <p className="form-field__error">
              {error}
            </p>
          ) : null}

        </div>

      </div>
    </section>
  );
}
