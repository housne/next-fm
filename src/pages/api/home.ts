// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Genre } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getFeaturedRadios, getRadiosByGenre, listAllGenre } from '../../lib/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allGenre = await listAllGenre()
  const getGenreRadios = async (genre: Genre) => {
    const radios = await getRadiosByGenre(genre.id)
    return {
      genre,
      radios
    }
  }
  const radioList = await Promise.all(allGenre.map(genre => getGenreRadios(genre)))
  const data = {
    featuredRadios: await getFeaturedRadios(),
    radioList
  }
  return res.status(200).json(data)
}
