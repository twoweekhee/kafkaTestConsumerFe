import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8070", 
    timeout: 3000,
    headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
});
