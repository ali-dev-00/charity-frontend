import { AlumniCreateRequest, AlumniUpdateRequest, AlumniResponse, AlumniListResponse } from "./types/alumniTypes";
import { postToServer, getFromServer, putToServer, deleteFromServer } from "@/lib/requests";

class AlumniService {
  static async create(data: AlumniCreateRequest): Promise<AlumniResponse> {
    const response = await postToServer("alumni", data);
    return { ...response, message: response.message ?? "", data: response.data ?? null };
  }

  static async getAll(page = 1, limit = 10): Promise<AlumniListResponse> {
    const response = await getFromServer(`alumni?page=${page}&limit=${limit}`);
    return { ...response, items: (response as any).items ?? [], message: response.message ?? "" };
  }

  static async getById(id: string): Promise<AlumniResponse> {
    const response = await getFromServer(`alumni/${id}`);
    return { ...response, message: response.message ?? "", data: response.data ?? null };
  }

  static async update(id: string, data: AlumniUpdateRequest): Promise<AlumniResponse> {
    const response = await putToServer(`alumni/${id}`, data);
    return { ...response, message: response.message ?? "", data: response.data ?? null };
  }

  static async delete(id: string): Promise<{ status: boolean; message: string }> {
    const response = await deleteFromServer(`alumni/${id}`);
    return { ...response, message: response.message ?? "" };
  }
  
}

export default AlumniService;
