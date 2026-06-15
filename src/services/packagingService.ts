import apiClient from './apiClient';
import endPointApi from '../config/endpoints';

export interface Packaging {
  _id?: string;
  productName: string;
  packSize: string;
  mtCapacity: number;
  packagingRate: number;
  createdAt?: string;
  updatedAt?: string;
}

export const packagingService = {
  getAll: async () => {
    return await apiClient.get(endPointApi.packaging) as Packaging[];
  },
  
  getById: async (id: string) => {
    return await apiClient.get(`${endPointApi.packaging}/${id}`) as Packaging;
  },
  
  create: async (data: Packaging) => {
    return await apiClient.post(endPointApi.packaging, data) as Packaging;
  },
  
  update: async (id: string, data: Partial<Packaging>) => {
    return await apiClient.put(`${endPointApi.packaging}/${id}`, data) as Packaging;
  },
  
  delete: async (id: string) => {
    return await apiClient.delete(`${endPointApi.packaging}/${id}`);
  }
};
