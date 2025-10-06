import { z } from "zod";

export const employeeSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string().email("Invalid email address").toLowerCase(),
  position: z
    .string()
    .min(2, "Position must be at least 2 characters")
    .max(100, "Position must not exceed 100 characters"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
