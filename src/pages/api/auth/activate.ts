// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { userActivation } from '../../../lib/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {code} = req.query
  if (!code || typeof code !== 'string') {
    return res.status(400).json({message: 'bad request'})
  }
  const result = await userActivation(code)
  if (!result) {
    return res.status(400).json({message: 'bad request'})
  }
  return res.status(200).json({message: "success"})
}