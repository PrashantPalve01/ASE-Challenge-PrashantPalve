import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.toString() || "http://localhost:5000";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});
