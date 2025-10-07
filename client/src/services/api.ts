import axios from "axios";
import { Employee, EmployeeFormData, ApiResponse } from "../types/employee";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const employeeApi = {
  /**
   * Get all employees
   */
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get<ApiResponse<Employee[]>>("/employees");
    return response.data.data;
  },

  /**
   * Get single employee by ID
   */
  getById: async (id: number): Promise<Employee> => {
    const response = await api.get<ApiResponse<Employee>>(`/employees/${id}`);
    return response.data.data;
  },

  /**
   * Create new employee
   */
  create: async (data: EmployeeFormData): Promise<Employee> => {
    const response = await api.post<ApiResponse<Employee>>("/employees", data);
    return response.data.data;
  },

  /**
   * Update existing employee
   */
  update: async (
    id: number,
    data: Partial<EmployeeFormData>
  ): Promise<Employee> => {
    const response = await api.put<ApiResponse<Employee>>(
      `/employees/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * Delete employee
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },
};

// Add request interceptor for logging
if (import.meta.env.DEV) {
  api.interceptors.request.use(
    (config) => {
      console.log(`${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error("Request Error:", error);
      return Promise.reject(error);
    }
  );
}

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || "An error occurred";
      console.error("Server Error:", message);
      throw new Error(message);
    } else if (error.request) {
      console.error("Network Error: No response from server");
      throw new Error(
        "Unable to connect to server. Please check your connection."
      );
    } else {
      console.error("Error:", error.message);
      throw new Error(error.message);
    }
  }
);

export default api;
