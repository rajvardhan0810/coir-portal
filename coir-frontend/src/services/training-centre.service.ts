import { axiosInstance } from "@/lib/axios";

export async function getTrainingCentres() {
  const response = await axiosInstance.get(
    "/training-centres",
  );

  return response.data;
}