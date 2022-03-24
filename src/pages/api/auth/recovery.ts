// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { rendResetPasswordEmail, resetPassword } from '../../../lib/api'
import { ResetPasswordScheme } from '../../../scheme/user'

const sendResetEmailHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email } = req.body
  const result = z.string().email().safeParse(email)
  if (!result.success) {
    return res.status(400).json({message: 'bad request'})
  }
  await rendResetPasswordEmail(email)
  return res.status(200).json({message: 'ok'})
}

const resetPasswordHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { password, access_token } = req.body
  const result = ResetPasswordScheme.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({message: 'bad request'})
  }
  await resetPassword(access_token, password)
  return res.status(200).json({message: 'ok'})
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'not allowed'})
  }
  const { body } = req
  if (body.access_token && body.password) {
    return await resetPasswordHandler(req, res)
  }
  return await sendResetEmailHandler(req, res)
}