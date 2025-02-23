import axios from "axios";
console.log(import.meta.env.VITE_API_URL);


const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Automatically attach the token to requests
API.interceptors.request.use((req) => {
    console.log( import.meta.env.VITE_API_URL)
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;
