import { z } from "zod";

// Strict email regex matching RFC 5322 compatible patterns with proper TLD
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Safe characters for human names across international latin alphabets (disallowing line breaks)
const NAME_REGEX = /^[a-zA-Z0-9 .,'’\-À-ž]{2,100}$/;

export const contactTopics = [
  "ground_tip",
  "scarf_swap",
  "collaboration",
  "general",
] as const;

export type ContactTopic = (typeof contactTopics)[number];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" })
    .regex(NAME_REGEX, { message: "Name contains invalid characters" }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, { message: "Email address is too short" })
    .max(255, { message: "Email address cannot exceed 255 characters" })
    .regex(EMAIL_REGEX, { message: "Please enter a valid email address" }),

  topic: z.string().optional(),

  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message cannot exceed 2,000 characters" }),

  // Honeypot field (hidden from human users, must remain empty)
  _hp_verification: z.string().optional(),

  // Cloudflare Turnstile token
  turnstileToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
