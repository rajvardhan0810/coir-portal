import { axiosInstance } from "@/lib/axios";

import {
  API_ENDPOINTS,
} from "@/constants/api-endpoints";

export async function getMyApplications() {
  const response =
    await axiosInstance.get(
      API_ENDPOINTS.applications.my,
    );

  return response.data;
}

export async function createApplication(
  schemeId: number,
  programId: number,
) {
  const response =
    await axiosInstance.post(
      API_ENDPOINTS.applications.create,
      {
        schemeId,
        programId,
      },
    );

  return response.data;
}

export async function saveApplicationDetails(
  applicationId: number,
  data: any,
) {
  const response =
    await axiosInstance.post(
      API_ENDPOINTS.applications.details(
        applicationId,
      ),
      data,
    );

  return response.data;
}

export async function getApplication(
  applicationId: number,
) {
  const response =
    await axiosInstance.get(
      API_ENDPOINTS.applications.byId(
        applicationId,
      ),
    );

  return response.data;
}

export async function submitApplication(
  applicationId: number,
) {
  const response =
    await axiosInstance.post(
      API_ENDPOINTS.applications.submit(
        applicationId,
      ),
    );

  return response.data;
}

export async function uploadFile(
  file: File,
) {
  const formData =
    new FormData();

  formData.append(
    "file",
    file,
  );

  const response =
    await axiosInstance.post(
      API_ENDPOINTS.upload.file,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return response.data;
}

export async function getAllApplications() {
  const response = await axiosInstance.get("/applications");
  return response.data;
}

export async function bulkApproveApplications(ids: number[]) {
  const response = await axiosInstance.post("/applications/bulk-approve", { ids });
  return response.data;
}

export async function bulkFinalApproveApplications(remarks?: string) {
  const response = await axiosInstance.post("/applications/final-approve", { remarks });
  return response.data;
}

export async function approveApplication(id: number) {
  const response = await axiosInstance.post(`/applications/${id}/approve`);
  return response.data;
}

export async function seekClarification(id: number, remarks?: string) {
  const response = await axiosInstance.post(`/applications/${id}/clarification`, { remarks });
  return response.data;
}

export async function sendToReview(id: number, remarks?: string) {
  const response = await axiosInstance.post(`/applications/${id}/review`, { remarks });
  return response.data;
}