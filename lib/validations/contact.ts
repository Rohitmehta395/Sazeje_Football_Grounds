import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name is too long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email is too long" }),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters" })
    .max(5000, { message: "Message is too long" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
