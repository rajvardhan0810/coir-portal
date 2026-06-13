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
  courseId: number,
) {
  const response =
    await axiosInstance.post(
      API_ENDPOINTS.applications.create,
      {
        schemeId,
        courseId,
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