import { Prisma } from '@prisma/client'
import { prisma } from '../prisma'

export async function createGenre(name: string) {
  return prisma.genre.create({
    data: {
      name
    }
  })
}

export async function listAllGenre(where?: Prisma.GenreWhereInput) {
  return prisma.genre.findMany({ where })
}

export async function getGenreById(id: number) {
  return prisma.genre.findUnique({where: { id }})
}

export async function getRadiosByGenre(genreId: number, where: Prisma.RadioWhereInput = {},  skip = 0, take = 10) {
  return await prisma.radio.findMany({
    where: {
      ...where,
      genres: {
        some: {
          genre: {
            id: genreId
          }
        }
      }
    },
    include: {genres: {include: {genre: true}}, org: true},
    skip,
    take
  })
}
