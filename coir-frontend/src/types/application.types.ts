export interface StepOneData {
  photo?: File | null;

  aadhaar?: File | null;
  pan?: File | null;
  tenthMarksheet?: File | null;
  twelfthMarksheet?: File | null;
  graduationCertificate?: File | null;
  casteCertificate?: File | null;

  fatherName: string;
  gender: string;
  caste: string;
}