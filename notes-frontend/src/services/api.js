import axios from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
    baseURL: `${BACKEND_BASE_URL}/api`,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;
