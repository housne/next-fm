import { z } from "zod";

export const RegisterScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(24)
})

export const LoginScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(24)
})

export const ResetPasswordScheme = z.object({
  password: z.string().min(6).max(24),
  access_token: z.string()
})


export type RegisterData = z.infer<typeof RegisterScheme>
export type LoginData = z.infer<typeof LoginScheme>