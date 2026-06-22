import { axiosInstance } from "@/lib/axios";

export async function getProfile() {
  const response =
    await axiosInstance.get(
      "/profile",
    );

  return response.data;
}

export async function updateProfile(
  data: any,
) {
  const response =
    await axiosInstance.put(
      "/profile",
      data,
    );

  return response.data;
}