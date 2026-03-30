import axios from "axios";
import { env } from "./env";

export const AxiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
