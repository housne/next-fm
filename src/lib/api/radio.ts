import { Prisma } from '@prisma/client'
import { CreateRadioScheme } from '../../scheme/create-radio'
import { prisma } from '../prisma'

export async function getRadio(id: number) {
  return await prisma.radio.findUnique({ 
      where: { id }, 
      include: {genres: {include: {genre: true}}, org: true}
    })
}

export async function listRadios(where?: Prisma.RadioWhereInput, skip = 0, take = 5) {
  return await prisma.radio.findMany({
    where, 
    include: {genres: {include: {genre: true}}, org: true},
    skip,
    take
  })
}

export async function getFeaturedRadios(take: number = 5) {
  return await listRadios({is_featured: true })
}

export async function createRadio({org_id, genres, ...data }: CreateRadioScheme) {
  return prisma.radio.create({
    data: {
      ...data,
      org: {
        connect: {
          id: org_id
        }
      },
      genres: {
        create: genres.map(id => ({genre: { connect: {id }}}))
      }
    }
  })
}