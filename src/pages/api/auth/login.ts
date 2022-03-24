// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { userLogin } from '../../../lib/api'
import { LoginScheme } from '../../../scheme/user'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ "message": "error" })
  }
  const { body } = req
  const result = LoginScheme.safeParse(body)
  if (!result.success) {
    return res.status(400).json(result.error)
  }
  const { error, session } = await userLogin(body.email, body.password)
  if (error) {
    return res.status(400).json({error})
  }
  return res.status(200).json(session)
}