import { z } from 'zod'

export const CreateRadio = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(1),
  stream_url: z.string().url(),
  is_featured: z.boolean().optional(),
  is_hls: z.boolean().optional(),
  genres: z.array(z.number()),
  org_id: z.number(),
  thumbnail: z.string().url(),
})

export type CreateRadioScheme = z.infer<typeof CreateRadio>