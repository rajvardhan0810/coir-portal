type Props = {
  application: any;
};

const BACKEND_URL =
  "http://localhost:4000";

export function PreviewPersonalDetails({
  application,
}: Props) {
  const details =
    application.detail
      ?.personalDetails ?? {};

  const documents =
    application.detail
      ?.documents ?? {};

  const photoUrl =
    documents.photo
      ? `${BACKEND_URL}${documents.photo}`
      : "/assets/images/user-img.jpg";

      console.log(
  "DOCUMENTS:",
  documents,
);

console.log(
  "PHOTO:",
  documents.photo,
);

console.log(
  "PHOTO URL:",
  photoUrl,
);

  return (
    <section className="application-card">

      <div className="preview-header">

        <div className="application-card__header">
          <h2>
            Personal Details
          </h2>
        </div>

        <div className="preview-photo-wrapper">

          <img
            src={photoUrl}
            alt="Applicant"
            className="preview-photo"
          />

        </div>

      </div>

      <div className="preview-grid">

        <div className="form-field">
          <label>Full Name</label>

          <div className="preview-value">
            {details.fullName ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>Date of Birth</label>

          <div className="preview-value">
            {details.dob ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            Father’s/Husband’s Name
          </label>

          <div className="preview-value">
            {details.fatherName ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>Gender</label>

          <div className="preview-value">
            {details.gender ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>Caste</label>

          <div className="preview-value">
            {details.caste ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>Mobile</label>

          <div className="preview-value">
            {details.mobile ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>Email ID</label>

          <div className="preview-value">
            {details.email ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>Address</label>

          <div className="preview-value preview-value--address">
            {details.address ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>City/Town</label>

          <div className="preview-value">
            {details.city ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>State</label>

          <div className="preview-value">
            {details.state ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>
            Zip/Postal Code
          </label>

          <div className="preview-value">
            {details.pincode ?? "-"}
          </div>
        </div>

        <div className="form-field">
          <label>Country</label>

          <div className="preview-value">
            {details.country ?? "-"}
          </div>
        </div>

      </div>

    </section>
  );
}