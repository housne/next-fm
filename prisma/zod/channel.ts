import * as z from "zod"
import * as imports from "../null"
import { CompleteRadio, RelatedRadioModel } from "./index"

export const ChannelModel = z.object({
  id: z.number().int(),
  name: z.string(),
  thumbnail: z.string(),
  description: z.string().nullish(),
})

export interface CompleteChannel extends z.infer<typeof ChannelModel> {
  radios: CompleteRadio[]
}

/**
 * RelatedChannelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChannelModel: z.ZodSchema<CompleteChannel> = z.lazy(() => ChannelModel.extend({
  radios: RelatedRadioModel.array(),
}))
