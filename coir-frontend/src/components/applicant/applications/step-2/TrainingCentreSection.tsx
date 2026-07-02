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

  setTrainingCentreId: (
    id: number,
  ) => void;
};

export function TrainingCentreSection({
  trainingCentreId,
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
            Select Training Centre
          </label>

          <select
            value={
              trainingCentreId ?? ""
            }
            onChange={(e) =>
              setTrainingCentreId(
                Number(
                  e.target.value,
                ),
              )
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

        </div>

      </div>
    </section>
  );
}