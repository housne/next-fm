// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateRadio } from '../../../scheme/create-radio';
import { createRadio, listRadios } from '../../../lib/api';
import { Prisma } from '@prisma/client';
import { isAdminUser } from '../../../helpers/api';

const createHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body } = req
  const data = CreateRadio.safeParse(body)
  if (!data.success) {
    return res.status(400).json(data.error)
  }
  const isAdmin = await isAdminUser(req)
  if (!isAdmin) { 
    return res.status(401).json({ error: 'unauthorized' }) 
  }
  const radio = await createRadio(body)
  res.status(200).json(radio)
}

const listRadiosHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { query } = req
  const { page = '1', limit = '10', ...where } = query
  const isNumReg = /^\d+$/
  if (
    typeof page !== 'string' || 
    typeof limit !== 'string' || 
    !isNumReg.test(page) || 
    !isNumReg.test(limit)
  ) {
    return res.status(400).json({"message": "bad request"})
  }
  const pageNum = +page - 1
  const pageCount = +limit
  const skip = pageNum * pageCount
  const take = pageCount
  const whereInput: Prisma.RadioWhereInput = {}
  if (typeof where.genre === 'string' && isNumReg.test(where.genre)) {
    whereInput.genres = {
      some: {
        genre: {
          id: +where.genre
        }
      }
    }
  }
  if (typeof where.org === 'string' && isNumReg.test(where.org)) {
    whereInput.org = {
      id: +where.org
    }
  }
  try {
    const radios = await listRadios(whereInput, skip, take)
    return res.status(200).json(radios)
  } catch (e) {
    console.log(e)
    return res.status(400).json({"message": "bad request"})
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return createHandler(req, res)
  } else if (req.method === 'GET') {
    return await listRadiosHandler(req, res)
  }
}
