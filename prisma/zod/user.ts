import * as z from "zod"
import * as imports from "../null"
import { CompleteProfile, RelatedProfileModel, CompleteLike, RelatedLikeModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string(),
  nickname: z.string().nullish(),
  email: z.string().nullish(),
  password: z.string().nullish(),
  avatar: z.string().nullish(),
  active: z.boolean(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  profile?: CompleteProfile | null
  likes: CompleteLike[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  profile: RelatedProfileModel.nullish(),
  likes: RelatedLikeModel.array(),
}))
