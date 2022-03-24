// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserFromRequest } from '../../../helpers/api'
import { isID } from '../../../helpers/helpers'
import { isLiked, like, listUserLikes } from '../../../lib/api/like'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { radioId } = req.body
    if (!radioId || typeof radioId !== 'string' || !isID(radioId)) {
      return res.status(400).json({message: 'bad request'})
    }
    const user = await getUserFromRequest(req)
    if (!user) {
      return res.status(401).json({message: 'unauthorized'})
    }
    await like(user.id, +radioId)
    return res.status(200).json({message: 'ok'})
  }
  const user = await getUserFromRequest(req)
  if (!user) {
    return res.status(401).json({message: 'unauthorized'})
  }
  if (req.query.id && typeof req.query.id === 'string' && isID(req.query.id)) {
    const liked = await isLiked(user.id, +req.query.id)
    return res.status(200).json({liked})
  }
  const radios = await listUserLikes(user.id)
  return res.status(200).json(radios)
}
