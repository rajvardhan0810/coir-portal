import { axiosInstance } from "@/lib/axios";

export async function getSchemes() {
  const response =
    await axiosInstance.get(
      "/schemes",
    );

  return response.data;
}

export async function getProgramsByScheme(
  schemeId: number,
) {
  const response =
    await axiosInstance.get(
      `/schemes/${schemeId}/programs`,
    );

  return response.data;
}