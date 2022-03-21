// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { LOGIN_FAIL_REASON, userLogin } from '../../../lib/api'
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
  try {
    const user = await userLogin({email: body.email}, body.password)
    res.status(200).json(user)
  } catch (e) {
    let message = ''
    if (e === LOGIN_FAIL_REASON.NOT_ACTIVATED) {
      message = '用户未激活'
    } else if (e === LOGIN_FAIL_REASON.USER_NOT_EXISTS) {
      message = '用户未注册'
    } else if (e === LOGIN_FAIL_REASON.WRONG_PASSWORD) {
      message = '密码错误'
    }
    res.status(400).json({message})
  }
}