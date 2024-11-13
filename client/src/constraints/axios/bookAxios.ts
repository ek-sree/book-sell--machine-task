import axios from "axios";
import { BASE_URL } from "../endpoints/booksEndpoints";

export const bookAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});