import * as z from "zod"
import * as imports from "../null"
import { CompleteGenresOnRadio, RelatedGenresOnRadioModel } from "./index"

export const GenreModel = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface CompleteGenre extends z.infer<typeof GenreModel> {
  radios: CompleteGenresOnRadio[]
}

/**
 * RelatedGenreModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGenreModel: z.ZodSchema<CompleteGenre> = z.lazy(() => GenreModel.extend({
  radios: RelatedGenresOnRadioModel.array(),
}))
