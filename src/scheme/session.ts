import { z } from "zod";

export const SessionScheme = z.object({
  access_token: z.string()
})