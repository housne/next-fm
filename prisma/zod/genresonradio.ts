import * as z from "zod"
import * as imports from "../null"
import { CompleteRadio, RelatedRadioModel, CompleteGenre, RelatedGenreModel } from "./index"

export const GenresOnRadioModel = z.object({
  radio_id: z.number().int(),
  genre_id: z.number().int(),
})

export interface CompleteGenresOnRadio extends z.infer<typeof GenresOnRadioModel> {
  radio: CompleteRadio
  genre: CompleteGenre
}

/**
 * RelatedGenresOnRadioModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGenresOnRadioModel: z.ZodSchema<CompleteGenresOnRadio> = z.lazy(() => GenresOnRadioModel.extend({
  radio: RelatedRadioModel,
  genre: RelatedGenreModel,
}))
