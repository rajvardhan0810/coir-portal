"use client";

import { 
  useEffect,
  useState ,

} from "react";

import {
  uploadFile,
} from "@/services/application.service";

export type PersonalDetails = {
  fullName: string;
  dob: string;
  fatherName: string;
  gender: string;

  caste: string;
  mobile: string;
  email: string;
  address: string;

  city: string;
  state: string;
  pincode: string;
  country: string;
};

type Props = {
  formData: PersonalDetails;

  setFormData: React.Dispatch<
    React.SetStateAction<PersonalDetails>
  >;

  documents: {
    photo: string;
  };

  setDocuments: React.Dispatch<any>;
};

export function PersonalDetailsSection({
  formData,
  setFormData,
  documents,
  setDocuments,
}: Props) {
  const [
    photoPreview,
    setPhotoPreview,
  ] = useState<string | null>(
    documents.photo
      ? `http://localhost:4000${documents.photo}`
      : null,
  );

  useEffect(() => {
    if (documents.photo) {
      setPhotoPreview(
        `http://localhost:4000${documents.photo}`,
      );
    } else {
      setPhotoPreview(null);
    }
  }, [documents.photo]);

  function handleChange(
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >,
  ) {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handlePhotoUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      const response =
        await uploadFile(file);

      setDocuments(
        (prev: any) => ({
          ...prev,
          photo:
            response.url,
        }),
      );

      setPhotoPreview(
        `http://localhost:4000${response.url}`,
      );

      alert(
        "Photo uploaded successfully",
      );
    } catch (error) {
      console.error(error);

      alert(
        "Photo upload failed",
      );
    }
  }

  return (
    <section className="application-card">

      <div className="personal-details">

        <div className="personal-details__header">

          <h2>
            Personal Details
          </h2>

          <div className="personal-details__photo">

            <label className="photo-upload-box">

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handlePhotoUpload
                }
              />

              {photoPreview ? (
                <img
                  src={
                    photoPreview
                  }
                  alt="Applicant"
                  className="photo-preview"
                />
              ) : (
                <>
                  <i className="bx bx-image-add" />

                  <span>
                    Upload Photo
                  </span>
                </>
              )}

            </label>

          </div>

        </div>

        <div className="personal-details__form">

          <div className="form-grid">

            <div className="form-field">
              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field">
              <label>
                Date of Birth
              </label>

              <input
                type="date"
                name="dob"
                value={
                  formData.dob
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field">
              <label>
                Father / Husband Name
              </label>

              <input
                type="text"
                name="fatherName"
                value={
                  formData.fatherName
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field">
              <label>
                Gender
              </label>

              <select
                name="gender"
                value={
                  formData.gender
                }
                onChange={
                  handleChange
                }
              >
                <option value="">
                  Select
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

            <div className="form-field">
              <label>
                Caste
              </label>

              <input
                type="text"
                name="caste"
                value={
                  formData.caste
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field">
              <label>
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                value={
                  formData.mobile
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field">
              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field form-field--full">
              <label>
                Address
              </label>

              <textarea
                name="address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                rows={4}
              />
            </div>

            <div className="form-field">
              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field">
              <label>
                State
              </label>

              <input
                type="text"
                name="state"
                value={
                  formData.state
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field">
              <label>
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <div className="form-field">
              <label>
                Country
              </label>

              <input
                type="text"
                name="country"
                value={
                  formData.country
                }
                onChange={
                  handleChange
                }
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}