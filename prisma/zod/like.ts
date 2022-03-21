import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, CompleteLikeOnRadio, RelatedLikeOnRadioModel } from "./index"

export const LikeModel = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
})

export interface CompleteLike extends z.infer<typeof LikeModel> {
  user: CompleteUser
  radios: CompleteLikeOnRadio[]
}

/**
 * RelatedLikeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLikeModel: z.ZodSchema<CompleteLike> = z.lazy(() => LikeModel.extend({
  user: RelatedUserModel,
  radios: RelatedLikeOnRadioModel.array(),
}))
