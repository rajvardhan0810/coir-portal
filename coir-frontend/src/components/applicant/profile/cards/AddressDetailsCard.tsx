import type { ProfileFormData } from "../types/profile.types";

type Props = {
  formData: ProfileFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<ProfileFormData>
  >;
};

export function AddressDetailsCard({
  formData,
  setFormData,
}: Props) {
  return (
    <section className="profile-card">
      <div className="profile-card__header">
        <i className="bx bx-map" />

        <h2>
          Address Details
        </h2>
      </div>

      <div className="profile-grid">

        <div className="profile-field profile-field--full">
          <label>
            Address
          </label>

          <textarea
            rows={4}
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="profile-field">
          <label>
            City
          </label>

          <input
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="profile-field">
          <label>
            District
          </label>

          <input
            value={
              formData.district
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                district:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="profile-field">
          <label>
            State
          </label>

          <input
            value={formData.state}
            onChange={(e) =>
              setFormData({
                ...formData,
                state:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="profile-field">
          <label>
            Postal Code
          </label>

          <input
            value={
              formData.postalCode
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                postalCode:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="profile-field">
          <label>
            Country
          </label>

          <input
            value={
              formData.country
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                country:
                  e.target.value,
              })
            }
          />
        </div>

      </div>
    </section>
  );
}