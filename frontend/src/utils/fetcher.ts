// src/utils/fetcher.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 🔥 TOKEN expired

            // token устгах
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");

            // login руу redirect
            window.location.href = "/expired";
        }

        return Promise.reject(error);
    },
);

// Token-ийг localStorage-с аваад Authorization header-д нэмэх
export const fetcher = async <T = any>(
    path: string,
    options: { method?: string; data?: any } = {},
): Promise<T> => {
    const token = localStorage.getItem("token");

    const headers: any = {};

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await api({
        url: path,
        method: options.method || "GET",
        data: options.data || undefined,
        headers,
    });

    return res.data;
};
