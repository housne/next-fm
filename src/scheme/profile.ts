import { z } from "zod";

export const ProfileScheme = z.object({
  nickname: z.string().min(2).max(12),
  avatar: z.string().url().optional().or(z.literal(''))
})