// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getJWTFromHeader } from '../../../helpers/api'
import { supabase } from '../../../lib/supabase'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt = getJWTFromHeader(req)
  if (!jwt) {
    return res.status(400).json({message: "bad request"})
  }
  await supabase.auth.api.signOut(jwt)
  res.status(200).json({ message: "ok" })
}
