import apiClient from './apiClient';
import endPointApi from '../config/endpoints';

export interface Settings {
  _id?: string;
  usdInrRate: number;
  inlandFreight: number;
  customsThc: number;
  companyName: string;
}

export const settingService = {
  getSettings: async () => {
    return await apiClient.get(`${endPointApi.settings}`);
  },
  updateSettings: async (settingsData: Partial<Settings>) => {
    return await apiClient.put(`${endPointApi.settings}`, settingsData);
  },
};
