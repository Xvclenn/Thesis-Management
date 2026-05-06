// src/utils/fetcher.ts
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("RES", error);

        if (
            error.response?.status === 401 &&
            error.config?.headers?.Authorization
        ) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");

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
