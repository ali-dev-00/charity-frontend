import {
    VolunteerCreateRequest,
    VolunteerUpdateRequest,
    VolunteerResponse,
    VolunteerListResponse,
  } from "./types/volunteerTypes";
  
  import {
    getFromServer,
    postToServer,
    putToServer,
    deleteFromServer,
  } from '@/lib/requests';
  
  class VolunteerService {
    static async create(data: VolunteerCreateRequest): Promise<VolunteerResponse> {
      const formData = new FormData();
  
      for (const key in data) {
        if (key === 'hobbies') {
          formData.append('hobbies', JSON.stringify(data.hobbies || {}));
        } else if (key === 'profilePhoto') {
          if (data.profilePhoto) {
            formData.append('profilePhoto', data.profilePhoto);
          }
        } else {
          const value = data[key as keyof VolunteerCreateRequest];
          if (value !== undefined && value !== null) {
            formData.append(key, value as any);
          }
        }
      }
  
      const response = await postToServer('volunteer', formData);
      return {
        ...response,
        message: response.message ?? '',
        data: response.data ?? null,
      };
    }
  
    static async getAll(page = 1, limit = 10): Promise<VolunteerListResponse> {
      const response = await getFromServer(`volunteer?page=${page}&limit=${limit}`);
      return {
        ...response,
        message: response.message ?? '',
        items: (response as any).items ?? [],
      };
    }
  
    static async getById(id: string): Promise<VolunteerResponse> {
      const response = await getFromServer(`volunteer/${id}`);
      return {
        ...response,
        message: response.message ?? '',
        data: response.data ?? null,
      };
    }
  
    static async update(id: string, data: VolunteerUpdateRequest): Promise<VolunteerResponse> {
      const response = await putToServer(`volunteer/${id}`, data);
      return {
        ...response,
        message: response.message ?? '',
        data: response.data ?? null,
      };
    }
  
    static async delete(id: string): Promise<{ status: boolean; message: string }> {
      const response = await deleteFromServer(`volunteer/${id}`);
      return { ...response, message: response.message ?? '' };
    }
  }
  
  export default VolunteerService;
  