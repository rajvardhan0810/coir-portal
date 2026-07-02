import type { ProfileFormData } from "../types/profile.types";

type Props = {
  formData: ProfileFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<ProfileFormData>
  >;
};

export function FamilyDetailsCard({
  formData,
  setFormData,
}: Props) {
  return (
    <section className="profile-card">
      <div className="profile-card__header">
        <i className="bx bx-group" />

        <h2>
          Family Details
        </h2>
      </div>

      <div className="profile-grid">

        <div className="profile-field">
          <label>
            Father / Husband Name
          </label>

          <input
            type="text"
            value={
              formData.fatherName
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                fatherName:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="profile-field">
          <label>
            Category / Caste
          </label>

          <input
            type="text"
            value={
              formData.caste
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                caste:
                  e.target.value,
              })
            }
          />
        </div>

      </div>
    </section>
  );
}