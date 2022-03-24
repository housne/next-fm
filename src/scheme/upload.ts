import { z } from "zod";

export const ImageUploadScheme = z.object({
  file: z.string().regex(/^data:image\/(jpeg|jpg|png|gif|webp);base64,.+/),
  dir: z.string().optional()
})