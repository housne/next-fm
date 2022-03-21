import * as z from "zod"
import * as imports from "../null"
import { CompleteGenresOnRadio, RelatedGenresOnRadioModel, CompleteOrganization, RelatedOrganizationModel, CompleteChannel, RelatedChannelModel, CompleteLikeOnRadio, RelatedLikeOnRadioModel } from "./index"

export const RadioModel = z.object({
  id: z.number().int(),
  name: z.string(),
  thumbnail: z.string(),
  description: z.string().nullish(),
  stream_url: z.string(),
  is_featured: z.boolean().nullish(),
  is_hls: z.boolean().nullish(),
  org_id: z.number().int().nullish(),
  channel_id: z.number().int().nullish(),
  website: z.string().nullish(),
})

export interface CompleteRadio extends z.infer<typeof RadioModel> {
  genres: CompleteGenresOnRadio[]
  org?: CompleteOrganization | null
  channel?: CompleteChannel | null
  likes: CompleteLikeOnRadio[]
}

/**
 * RelatedRadioModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRadioModel: z.ZodSchema<CompleteRadio> = z.lazy(() => RadioModel.extend({
  genres: RelatedGenresOnRadioModel.array(),
  org: RelatedOrganizationModel.nullish(),
  channel: RelatedChannelModel.nullish(),
  likes: RelatedLikeOnRadioModel.array(),
}))
