import * as z from "zod"
import * as imports from "../null"
import { CompleteRadio, RelatedRadioModel } from "./index"

export const OrganizationModel = z.object({
  id: z.number().int(),
  name: z.string(),
})

export interface CompleteOrganization extends z.infer<typeof OrganizationModel> {
  radios: CompleteRadio[]
}

/**
 * RelatedOrganizationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrganizationModel: z.ZodSchema<CompleteOrganization> = z.lazy(() => OrganizationModel.extend({
  radios: RelatedRadioModel.array(),
}))
