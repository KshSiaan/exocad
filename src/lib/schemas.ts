import { z } from "zod";

export const registerStep1Schema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required"),
  // .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number"),
});

export const registerStep2DentistSchema = z.object({
  practiceName: z
    .string()
    .min(1, "Practice name is required")
    .min(2, "Practice name must be at least 2 characters"),
  location: z.string().min(1, "Location is required"),
  practiceType: z.string().min(1, "Please select a practice type"),
});

export const registerStep2DesignerSchema = z.object({
  specialization: z.string().min(1, "Please select your specialization"),
  experience: z.string().min(1, "Please select your experience level"),
  location: z.string().min(1, "Location is required"),
});

export type RegisterStep1 = z.infer<typeof registerStep1Schema>;
export type RegisterStep2Dentist = z.infer<typeof registerStep2DentistSchema>;
export type RegisterStep2Designer = z.infer<typeof registerStep2DesignerSchema>;
