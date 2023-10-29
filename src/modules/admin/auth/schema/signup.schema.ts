import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email().min(1),
    password: z.string().min(6),
  }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
