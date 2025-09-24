import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://health-reviewing-joint-keyboards.trycloudflare.com/api" : "/api",
  withCredentials: true,
});