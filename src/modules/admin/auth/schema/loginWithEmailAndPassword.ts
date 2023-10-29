import { z } from "zod";

export const loginWithEmailAndPasswordSchema = z.object({
  body: z.object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  }),
});

export type LoginWithEmailAndPasswordSchema = z.infer<
  typeof loginWithEmailAndPasswordSchema
>;
