import { z } from "zod";

// Employee validation schema - matches backend validation
export const employeeSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  position: z
    .string()
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must be less than 100 characters")
    .trim(),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
