"use client";

import {
  uploadFile,
} from "@/services/application.service";

import {
  validatePersonalDetails,
  type StepOneDocumentsValues,
  type ValidationErrors,
} from "@/components/applicant/applications/validation/applicationValidation";

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

  errors?: ValidationErrors<PersonalDetails>;

  setErrors?: React.Dispatch<
    React.SetStateAction<ValidationErrors<PersonalDetails>>
  >;

  documentErrors?: ValidationErrors<StepOneDocumentsValues>;

  setDocumentErrors?: React.Dispatch<
    React.SetStateAction<ValidationErrors<StepOneDocumentsValues>>
  >;

  documents: StepOneDocumentsValues;

  setDocuments: React.Dispatch<
    React.SetStateAction<StepOneDocumentsValues>
  >;
};

export function PersonalDetailsSection({
  formData,
  setFormData,
  errors = {},
  setErrors,
  documentErrors = {},
  setDocumentErrors,
  documents,
  setDocuments,
}: Props) {
  const photoPreview =
    documents.photo
      ? `http://localhost:4000${documents.photo}`
      : null;

  function handleChange(
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >,
  ) {
    const { name, value } =
      e.target;

    const field =
      name as keyof PersonalDetails;

    const nextFormData = {
      ...formData,
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors?.((prev) => ({
      ...prev,
      [field]:
        validatePersonalDetails(
          nextFormData,
        )[field],
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
        (prev) => ({
          ...prev,
          photo:
            response.url,
        }),
      );

      setDocumentErrors?.((prev) => ({
        ...prev,
        photo:
          undefined,
      }));

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
                    Upload Photo{" "}
                    <span className="required">
                      *
                    </span>
                  </span>
                </>
              )}

            </label>

            {documentErrors.photo ? (
              <p className="form-field__error photo-upload-error">
                {documentErrors.photo}
              </p>
            ) : null}

          </div>

        </div>

        <div className="personal-details__form">

          <div className="form-grid">

            <div className="form-field">
              <label>
                Full Name{" "}
                <span className="required">
                  *
                </span>
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
                aria-invalid={
                  Boolean(errors.fullName)
                }
              />

              {errors.fullName ? (
                <p className="form-field__error">
                  {errors.fullName}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                Date of Birth{" "}
                <span className="required">
                  *
                </span>
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
                aria-invalid={
                  Boolean(errors.dob)
                }
              />

              {errors.dob ? (
                <p className="form-field__error">
                  {errors.dob}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                Father / Husband Name{" "}
                <span className="required">
                  *
                </span>
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
                aria-invalid={
                  Boolean(errors.fatherName)
                }
              />

              {errors.fatherName ? (
                <p className="form-field__error">
                  {errors.fatherName}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                Gender{" "}
                <span className="required">
                  *
                </span>
              </label>

              <select
                name="gender"
                value={
                  formData.gender
                }
                onChange={
                  handleChange
                }
                aria-invalid={
                  Boolean(errors.gender)
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

              {errors.gender ? (
                <p className="form-field__error">
                  {errors.gender}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                Caste{" "}
                <span className="required">
                  *
                </span>
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
                aria-invalid={
                  Boolean(errors.caste)
                }
              />

              {errors.caste ? (
                <p className="form-field__error">
                  {errors.caste}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                Mobile Number{" "}
                <span className="required">
                  *
                </span>
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
                inputMode="numeric"
                maxLength={10}
                aria-invalid={
                  Boolean(errors.mobile)
                }
              />

              {errors.mobile ? (
                <p className="form-field__error">
                  {errors.mobile}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                Email{" "}
                <span className="required">
                  *
                </span>
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
                aria-invalid={
                  Boolean(errors.email)
                }
              />

              {errors.email ? (
                <p className="form-field__error">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="form-field form-field--full">
              <label>
                Address{" "}
                <span className="required">
                  *
                </span>
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
                aria-invalid={
                  Boolean(errors.address)
                }
              />

              {errors.address ? (
                <p className="form-field__error">
                  {errors.address}
                </p>
              ) : null}
            </div>

            <div className="form-field form-field--wide">
              <label>
                City{" "}
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="text"
                name="city"
                autoComplete="address-level2"
                maxLength={80}
                title={
                  formData.city
                }
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
                aria-invalid={
                  Boolean(errors.city)
                }
              />

              {errors.city ? (
                <p className="form-field__error">
                  {errors.city}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                State{" "}
                <span className="required">
                  *
                </span>
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
                aria-invalid={
                  Boolean(errors.state)
                }
              />

              {errors.state ? (
                <p className="form-field__error">
                  {errors.state}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                Pincode{" "}
                <span className="required">
                  *
                </span>
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
                inputMode="numeric"
                maxLength={6}
                aria-invalid={
                  Boolean(errors.pincode)
                }
              />

              {errors.pincode ? (
                <p className="form-field__error">
                  {errors.pincode}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label>
                Country{" "}
                <span className="required">
                  *
                </span>
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
                aria-invalid={
                  Boolean(errors.country)
                }
              />

              {errors.country ? (
                <p className="form-field__error">
                  {errors.country}
                </p>
              ) : null}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
