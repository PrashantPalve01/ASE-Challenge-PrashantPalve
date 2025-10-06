export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmployeeDTO {
  name: string;
  email: string;
  position: string;
}

export interface UpdateEmployeeDTO {
  name?: string;
  email?: string;
  position?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  errors?: any[];
}
