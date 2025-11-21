import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  businessRegistered: z.string().min(1, "Please select an option"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpFormValues = z.infer<typeof authSchema>;