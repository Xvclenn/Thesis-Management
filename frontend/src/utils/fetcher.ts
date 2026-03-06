// src/utils/fetcher.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

export const fetcher = async (path: string, options = {}) => {
    const res = await api({
        url: path,
        ...options,
    });

    return res.data;
};

// USAGE EXAMPLE

// GET By ID request example
// const data = await fetcher("/api/test/getTest/1", { method: "GET" });

// GET request example
// const data = await fetcher("/api/test/getTest", { method: "GET" });

// POST request example
// const data = await fetcher("/api/test/createTest", {
//     method: "POST",
//     data: { name: "Test Name", description: "Test Description" },
// });

// PUT request example
// const data = await fetcher("/api/test/updateTest/1", {
//     method: "PUT",
//     data: { name: "Updated Test Name", description: "Updated Test Description" },
// });

// DELETE request example
// const data = await fetcher("/api/test/deleteTest/1", { method: "DELETE" });
