import type { ProfileFormData } from "../types/profile.types";

type Props = {
  formData: ProfileFormData;
  setFormData: React.Dispatch<
    React.SetStateAction<ProfileFormData>
  >;
};

export function PersonalDetailsCard({
  formData,
  setFormData,
}: Props) {
  return (
    <section className="profile-card">
      <div className="profile-card__header">
        <i className="bx bx-user" />

        <h2>
          Personal Details
        </h2>
      </div>

      <div className="profile-grid">

        <div className="profile-field">
          <label>
            Full Name
          </label>

          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({
                ...formData,
                fullName:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="profile-field">
          <label>
            Date Of Birth
          </label>

          <input
            type="date"
            value={formData.dob}
            onChange={(e) =>
              setFormData({
                ...formData,
                dob:
                  e.target.value,
              })
            }
          />
        </div>

        <div className="profile-field">
          <label>
            Gender
          </label>

          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender:
                  e.target.value,
              })
            }
          >
            <option value="">
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
        </div>

        <div className="profile-field">
          <label>
            Mobile Number
          </label>

          <input
            type="text"
            value={formData.mobile}
            disabled
          />
        </div>

        <div className="profile-field">
          <label>
            Email Address
          </label>

          <input
            type="email"
            value={formData.email}
            disabled
          />
        </div>

      </div>
    </section>
  );
}