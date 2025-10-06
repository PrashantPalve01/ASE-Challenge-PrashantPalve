import { z } from "zod";

export const employeeSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  position: z
    .string()
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must be less than 100 characters")
    .trim(),
});

export const updateEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .optional(),
  position: z
    .string()
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must be less than 100 characters")
    .trim()
    .optional(),
});

export type EmployeeInput = z.infer<typeof employeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
