import { axiosInstance } from "@/lib/axios";

// --- INVENTORY ---
export async function getInventory() {
  const response = await axiosInstance.get("/showroom/inventory");
  return response.data;
}

export async function createInventoryItem(data: any) {
  const response = await axiosInstance.post("/showroom/inventory", data);
  return response.data;
}

export async function updateInventoryItem(id: number, data: any) {
  const response = await axiosInstance.put(`/showroom/inventory/${id}`, data);
  return response.data;
}

export async function deleteInventoryItem(id: number) {
  const response = await axiosInstance.delete(`/showroom/inventory/${id}`);
  return response.data;
}

// --- SUPPLIERS ---
export async function getSuppliers() {
  const response = await axiosInstance.get("/showroom/suppliers");
  return response.data;
}

export async function createSupplier(data: any) {
  const response = await axiosInstance.post("/showroom/suppliers", data);
  return response.data;
}

export async function deleteSupplier(id: string) {
  const response = await axiosInstance.delete(`/showroom/suppliers/${id}`);
  return response.data;
}

// --- DEMANDS ---
export async function getDemands() {
  const response = await axiosInstance.get("/showroom/demands");
  return response.data;
}

export async function createDemand(data: any) {
  const response = await axiosInstance.post("/showroom/demands", data);
  return response.data;
}

export async function placeOrder(demandId: string, data: any) {
  const response = await axiosInstance.post(`/showroom/demands/${demandId}/order`, data);
  return response.data;
}

// --- BUSINESS APIS ---
export async function getBusinessDemands() {
  const response = await axiosInstance.get("/business/demands");
  return response.data;
}

export async function submitBusinessResponse(demandId: string, data: any) {
  const response = await axiosInstance.post(`/business/demands/${demandId}/response`, data);
  return response.data;
}
