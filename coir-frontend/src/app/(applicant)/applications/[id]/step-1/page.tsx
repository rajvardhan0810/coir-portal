"use client";

import {
  useState,
  useEffect,
} from "react";

import { useParams } from "next/navigation";

import { ApplicationLayout } from "@/components/applicant/applications/ApplicationLayout";
import { ApplicationProgress } from "@/components/applicant/applications/ApplicationProgress";
import { ApplicationShell } from "@/components/applicant/applications/layout/ApplicationShell";

import { DigiLockerSection } from "@/components/applicant/applications/step-1/DigiLockerSection";
import { DocumentsUploadSection } from "@/components/applicant/applications/step-1/DocumentsUploadSection";

import {
  PersonalDetailsSection,
  type PersonalDetails,
} from "@/components/applicant/applications/step-1/PersonalDetailsSection";

import { StepOneActions } from "@/components/applicant/applications/step-1/StepOneActions";

import {
  getApplication,
} from "@/services/application.service";

export default function StepOnePage() {
  const params = useParams();

  const applicationId = Number(
    params.id,
  );

  const [formData, setFormData] =
    useState<PersonalDetails>({
      fullName: "",
      dob: "",
      fatherName: "",
      gender: "",

      caste: "",
      mobile: "",
      email: "",
      address: "",

      city: "",
      state: "",
      pincode: "",
      country: "India",
    });

  const [documents, setDocuments] =
    useState({
      photo: "",
      aadhaar: "",
      pan: "",
      tenthMarksheet: "",
      twelfthMarksheet: "",
      graduationCertificate: "",
      casteCertificate: "",
    });

  useEffect(() => {
    async function fetchApplication() {
      try {
        const application =
          await getApplication(
            applicationId,
          );

        if (
          application.detail
            ?.personalDetails
        ) {
          setFormData(
            application.detail
              .personalDetails,
          );
        }

        if (
          application.detail
            ?.documents
        ) {
          setDocuments(
            (
              prev,
            ) => ({
              ...prev,
              ...application
                .detail
                .documents,
            }),
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (applicationId) {
      fetchApplication();
    }
  }, [applicationId]);

  return (
    <ApplicationShell>
      <ApplicationLayout
        progress={
          <ApplicationProgress
            currentStep={1}
          />
        }
      >
        <div className="application-page-header">
          <p>
            APPLICATION FORM
          </p>

          <h1>
            Diploma Course in Coir Technology
          </h1>
        </div>

        <DigiLockerSection />

        <div className="application-or">
          OR
        </div>

        <DocumentsUploadSection
          documents={
            documents
          }
          setDocuments={
            setDocuments
          }
        />

        <PersonalDetailsSection
          formData={
            formData
          }
          setFormData={
            setFormData
          }
          documents={
            documents
          }
          setDocuments={
            setDocuments
          }
        />

        <StepOneActions
          formData={
            formData
          }
          documents={
            documents
          }
          applicationId={
            applicationId
          }
        />
      </ApplicationLayout>
    </ApplicationShell>
  );
}