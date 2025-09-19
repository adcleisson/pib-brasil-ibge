import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL
});

api.interceptors.request.use(async config => {
    config.headers["Content-Type"] = "application/json";
    return config;
});

export default api;