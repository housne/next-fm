// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { userRegister } from '../../../lib/api'
import { RegisterScheme } from '../../../scheme/user'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ "message": "error" })
  }
  const { body } = req
  const result = RegisterScheme.safeParse(body)
  if (!result.success) {
    return res.status(400).json(result.error)
  }
  const user = await userRegister(result.data)
  res.status(200).json(user)
}