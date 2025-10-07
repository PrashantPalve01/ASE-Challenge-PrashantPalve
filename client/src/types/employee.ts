// Employee interface matching backend model
export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  createdAt?: string;
  updatedAt?: string;
}

// Form data for creating/updating employee
export interface EmployeeFormData {
  name: string;
  email: string;
  position: string;
}

// API response structure
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Sort configuration
export type SortField = "name" | "email" | "position";
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}
