import { Prisma } from '@prisma/client'
export type { Genre, Organization } from '@prisma/client'

export type Radio = Prisma.RadioGetPayload<{include: { genres: { include: {genre: true }}, org: true }}>