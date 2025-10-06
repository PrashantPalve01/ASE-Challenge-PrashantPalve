import axios from "axios";
import type { Employee } from "../types/employee";

const API_URL =
  (import.meta as any).env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

type ListParams = { search?: string; page?: number; limit?: number };

export async function listEmployees({
  search = "",
  page = 1,
  limit = 10,
}: ListParams) {
  const url = search
    ? `/api/employees?search=${encodeURIComponent(search)}`
    : "/api/employees";
  const res = await api.get(url);
  const all: Employee[] = res.data.data ?? res.data ?? [];
  const total = Array.isArray(all) ? all.length : res.data.count ?? 0;
  const start = (page - 1) * limit;
  const data = Array.isArray(all) ? all.slice(start, start + limit) : [];
  return { data, total } as { data: Employee[]; total: number };
}

export async function createEmployee(
  values: Pick<Employee, "name" | "email" | "position">
) {
  const res = await api.post("/api/employees", values);
  return res.data?.data ?? res.data;
}

export async function updateEmployee(
  id: number,
  values: Partial<Pick<Employee, "name" | "email" | "position">>
) {
  const res = await api.put(`/api/employees/${id}`, values);
  return res.data?.data ?? res.data;
}

export async function deleteEmployee(id: number) {
  const res = await api.delete(`/api/employees/${id}`);
  return res.data;
}

export default api;
