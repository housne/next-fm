import { z } from "zod";

export const RegisterScheme = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(15)
})

export const LoginScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(15)
})


export type RegisterData = z.infer<typeof RegisterScheme>
export type LoginData = z.infer<typeof LoginScheme>