export type PersonalDetailsValues = {
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

export type BankDetailsValues = {
  aadhaarNumber: string;
  panNumber: string;
  tenthMarks: string;
  twelfthMarks: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
};

export type StepOneDocumentsValues = {
  photo: string;
  aadhaar: string;
  pan: string;
  tenthMarksheet: string;
  twelfthMarksheet: string;
  graduationCertificate: string;
  casteCertificate: string;
};

export type ExperienceDetailsValues = {
  employerName: string;
  natureOfWork: string;
  dateOfJoining: string;
  totalExperience: string;
};

export type StepTwoDocumentsValues = {
  cancelCheque: string;
  experienceLetter: string;
};

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

type BankDetailsField = keyof BankDetailsValues;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[6-9]\d{9}$/;
const pincodePattern = /^\d{6}$/;
const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const accountNumberPattern = /^\d{9,18}$/;

function cleanDigits(value: string, maxLength: number) {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

function cleanAlphaNumeric(value: string, maxLength: number) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, maxLength);
}

function isValidAadhaarNumber(value: string) {
  return /^[2-9]\d{11}$/.test(value);
}

export function normalizeBankDetailsField(
  field: BankDetailsField,
  value: string,
) {
  if (field === "aadhaarNumber") {
    return cleanDigits(value, 12);
  }

  if (field === "panNumber") {
    return cleanAlphaNumeric(value, 10);
  }

  if (field === "accountNumber") {
    return cleanDigits(value, 18);
  }

  if (field === "ifscCode") {
    return cleanAlphaNumeric(value, 11);
  }

  return value;
}

export function validatePersonalDetails(
  details: PersonalDetailsValues,
): ValidationErrors<PersonalDetailsValues> {
  const errors: ValidationErrors<PersonalDetailsValues> = {};

  if (!details.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!details.dob.trim()) {
    errors.dob = "Date of birth is required";
  }

  if (!details.fatherName.trim()) {
    errors.fatherName = "Father / husband name is required";
  }

  if (!details.gender.trim()) {
    errors.gender = "Gender is required";
  }

  if (!details.caste.trim()) {
    errors.caste = "Caste is required";
  }

  if (!details.mobile.trim() || !mobilePattern.test(details.mobile.trim())) {
    errors.mobile = "Invalid mobile number";
  }

  if (!details.email.trim() || !emailPattern.test(details.email.trim())) {
    errors.email = "Invalid email address";
  }

  if (!details.address.trim()) {
    errors.address = "Address is required";
  }

  if (!details.city.trim()) {
    errors.city = "City is required";
  }

  if (!details.state.trim()) {
    errors.state = "State is required";
  }

  if (!details.pincode.trim() || !pincodePattern.test(details.pincode.trim())) {
    errors.pincode = "Invalid pincode";
  }

  if (!details.country.trim()) {
    errors.country = "Country is required";
  }

  return errors;
}

export function validateBankDetails(
  details: BankDetailsValues,
): ValidationErrors<BankDetailsValues> {
  const errors: ValidationErrors<BankDetailsValues> = {};
  const aadhaarNumber = details.aadhaarNumber.trim();
  const panNumber = details.panNumber.trim().toUpperCase();
  const accountNumber = details.accountNumber.trim();
  const ifscCode = details.ifscCode.trim().toUpperCase();

  if (!aadhaarNumber || !isValidAadhaarNumber(aadhaarNumber)) {
    errors.aadhaarNumber = "Invalid Aadhaar number";
  }

  if (!panNumber || !panPattern.test(panNumber)) {
    errors.panNumber = "Invalid PAN number";
  }

  const tenthMarks = Number(details.tenthMarks);

  if (
    !details.tenthMarks.trim() ||
    Number.isNaN(tenthMarks) ||
    tenthMarks < 0 ||
    tenthMarks > 100
  ) {
    errors.tenthMarks = "Valid 10th marks are required";
  }

  const twelfthMarks = Number(details.twelfthMarks);

  if (
    !details.twelfthMarks.trim() ||
    Number.isNaN(twelfthMarks) ||
    twelfthMarks < 0 ||
    twelfthMarks > 100
  ) {
    errors.twelfthMarks = "Valid 12th marks are required";
  }

  if (!details.bankName.trim()) {
    errors.bankName = "Bank name is required";
  }

  if (!details.accountHolderName.trim()) {
    errors.accountHolderName = "Account holder name is required";
  }

  if (!accountNumber || !accountNumberPattern.test(accountNumber)) {
    errors.accountNumber = "Invalid account number";
  }

  if (!ifscCode || !ifscPattern.test(ifscCode)) {
    errors.ifscCode = "Invalid IFSC code";
  }

  return errors;
}

export function validateStepOneDocuments(
  documents: StepOneDocumentsValues,
): ValidationErrors<StepOneDocumentsValues> {
  const errors: ValidationErrors<StepOneDocumentsValues> = {};

  if (!documents.photo) {
    errors.photo = "Photo is required";
  }

  if (!documents.aadhaar) {
    errors.aadhaar = "Aadhaar document is required";
  }

  if (!documents.pan) {
    errors.pan = "PAN document is required";
  }

  if (!documents.tenthMarksheet) {
    errors.tenthMarksheet = "10th marksheet is required";
  }

  if (!documents.twelfthMarksheet) {
    errors.twelfthMarksheet = "12th marksheet is required";
  }

  if (!documents.graduationCertificate) {
    errors.graduationCertificate = "Graduation marksheet is required";
  }

  if (!documents.casteCertificate) {
    errors.casteCertificate = "Caste certificate is required";
  }

  return errors;
}

export function validateExperienceDetails(
  experience: ExperienceDetailsValues,
): ValidationErrors<ExperienceDetailsValues> {
  const errors: ValidationErrors<ExperienceDetailsValues> = {};

  if (!experience.employerName.trim()) {
    errors.employerName = "Employer name is required";
  }

  if (!experience.natureOfWork.trim()) {
    errors.natureOfWork = "Nature of work is required";
  }

  if (!experience.dateOfJoining.trim()) {
    errors.dateOfJoining = "Date of joining is required";
  }

  const totalExperience = Number(experience.totalExperience);

  if (
    !experience.totalExperience.trim() ||
    Number.isNaN(totalExperience) ||
    totalExperience < 0
  ) {
    errors.totalExperience = "Valid total experience is required";
  }

  return errors;
}

export function validateStepTwoDocuments(
  documents: StepTwoDocumentsValues,
): ValidationErrors<StepTwoDocumentsValues> {
  const errors: ValidationErrors<StepTwoDocumentsValues> = {};

  if (!documents.cancelCheque) {
    errors.cancelCheque = "Cancel cheque is required";
  }

  if (!documents.experienceLetter) {
    errors.experienceLetter = "Experience letter is required";
  }

  return errors;
}

export function hasValidationErrors<T extends object>(
  errors: ValidationErrors<T>,
) {
  return Object.values(errors).some(Boolean);
}
