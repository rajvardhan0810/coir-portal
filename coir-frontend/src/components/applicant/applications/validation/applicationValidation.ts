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
  _details: PersonalDetailsValues,
): ValidationErrors<PersonalDetailsValues> {
  return {};
}

export function validateBankDetails(
  _details: BankDetailsValues,
): ValidationErrors<BankDetailsValues> {
  return {};
}

export function validateStepOneDocuments(
  _documents: StepOneDocumentsValues,
): ValidationErrors<StepOneDocumentsValues> {
  return {};
}

export function validateExperienceDetails(
  _experience: ExperienceDetailsValues,
): ValidationErrors<ExperienceDetailsValues> {
  return {};
}

export function validateStepTwoDocuments(
  _documents: StepTwoDocumentsValues,
): ValidationErrors<StepTwoDocumentsValues> {
  return {};
}

export function hasValidationErrors<T extends object>(
  errors: ValidationErrors<T>,
) {
  return Object.values(errors).some(Boolean);
}
