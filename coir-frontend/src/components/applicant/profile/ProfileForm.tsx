"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  updateProfile,
} from "@/services/profile.service";

import { PersonalDetailsCard } from "./cards/PersonalDetailsCard";
import { FamilyDetailsCard } from "./cards/FamilyDetailsCard";
import { AddressDetailsCard } from "./cards/AddressDetailsCard";

import type { ProfileFormData } from "./types/profile.types";

export function ProfileForm() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState<ProfileFormData>({
      fullName: "",
      dob: "",
      gender: "",

      mobile: "",
      email: "",

      fatherName: "",
      caste: "",

      address: "",
      city: "",
      district: "",
      state: "",
      postalCode: "",
      country: "India",
    });

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile =
          await getProfile();

        if (profile) {
          setFormData({
            fullName:
              profile.fullName ?? "",

            dob: profile.dob
              ? profile.dob.slice(0, 10)
              : "",

            gender:
              profile.gender ?? "",

            mobile:
              profile.mobile ?? "",

            email:
              profile.email ?? "",

            fatherName:
              profile.fatherName ?? "",

            caste:
              profile.caste ?? "",

            address:
              profile.address ?? "",

            city:
              profile.city ?? "",

            district:
              profile.district ?? "",

            state:
              profile.state ?? "",

            postalCode:
              profile.postalCode ?? "",

            country:
              profile.country ??
              "India",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProfile(
        formData,
      );

      alert(
        "Profile updated successfully",
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="profile-page">
      <div className="profile-page__header">
        <h1>
          My Profile
        </h1>

        <p>
          Manage your personal information
        </p>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <PersonalDetailsCard
          formData={formData}
          setFormData={setFormData}
        />

        <FamilyDetailsCard
          formData={formData}
          setFormData={setFormData}
        />

        <AddressDetailsCard
          formData={formData}
          setFormData={setFormData}
        />

        <div className="profile-actions">
          <button
            type="submit"
            className="profile-save-btn"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Profile"}
          </button>
        </div>
      </form>
    </section>
  );
}