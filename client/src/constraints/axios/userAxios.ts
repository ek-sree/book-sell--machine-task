import axios from "axios";
import { BASE_URL } from "../endpoints/userEndpoints";

export const userkAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});