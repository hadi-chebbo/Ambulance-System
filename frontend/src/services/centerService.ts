import api from "./api";

import type { CenterResponse, Center } from "../types/center";

type CreateCenterResponse = {
    message : string;
    data : Center;
}

export const getCenters = async (page: number = 1): Promise<CenterResponse> => {
    const response = await api.get(`/super-admin/centers?page=${page}`);
    return response.data;
}

export const createCenter = async (payload: Omit<Center, 'id'>): Promise<CreateCenterResponse> => {
    const response = await api.post(`/super-admin/center`, payload);
    return response.data;
}