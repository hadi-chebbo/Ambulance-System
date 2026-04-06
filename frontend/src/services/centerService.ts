import api from "./api";

import type { CenterResponse } from "../types/center";

export const getCenters = async (page: number = 1): Promise<CenterResponse> => {
    const response = await api.get(`/super-admin/centers?page=${page}`);
    return response.data;
}
