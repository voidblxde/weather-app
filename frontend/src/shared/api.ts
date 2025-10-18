import axios from "axios";
export const api = axios.create({
    baseURL: "/api", // в dev Vite проксирует на бэк
    timeout: 10000,
});
