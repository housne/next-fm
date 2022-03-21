import * as z from "zod"
import * as imports from "../null"
import { CompleteLike, RelatedLikeModel, CompleteRadio, RelatedRadioModel } from "./index"

export const LikeOnRadioModel = z.object({
  like_id: z.number().int(),
  radio_id: z.number().int(),
})

export interface CompleteLikeOnRadio extends z.infer<typeof LikeOnRadioModel> {
  like: CompleteLike
  radio: CompleteRadio
}

/**
 * RelatedLikeOnRadioModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLikeOnRadioModel: z.ZodSchema<CompleteLikeOnRadio> = z.lazy(() => LikeOnRadioModel.extend({
  like: RelatedLikeModel,
  radio: RelatedRadioModel,
}))
