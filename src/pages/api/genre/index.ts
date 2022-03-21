// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createGenre, listAllGenre } from '../../../lib/api'

const createHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name } = req.body
  if (!name || !name.toString().trim()) {
    return res.status(400).json({ error: 'error' })
  }
  const data = await createGenre(name)
  return res.status(200).json(data)
}

const listHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const list = await listAllGenre()
  return res.status(200).json(list)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return createHandler(req, res)
  } else if (req.method === 'GET') {
    return listHandler(req, res)
  }
  return res.status(405).json({ error: 'error' })
}