// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserFromRequest } from '../../../helpers/api'
import { User } from '@supabase/supabase-js'
import { createProfile, getProfile, updateProfile } from '../../../lib/api/profile'
import { ProfileScheme } from '../../../scheme/profile'
import { z } from 'zod'

const getProfileHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  const profile = await getProfile(user.id)
  return res.status(200).json({profile})
}

const updateProfileHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User,
  data: z.infer<typeof ProfileScheme>
) => {
  const profile = await updateProfile(user.id, data)
  return res.status(200).json(profile)
}

const createProfileHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User,
  data: z.infer<typeof ProfileScheme>
) => {
  const profile = createProfile({...data, user_id: user.id})
  return res.status(200).json(profile)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserFromRequest(req)
  if (!user) {
    return res.status(401).json({"message": "unauthorized"})
  }
  if (req.method === 'POST') {
    const result = ProfileScheme.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({message: "bad request"})
    }
    const profile = await getProfile(user.id)
    if (!profile) {
      return createProfileHandler(req, res, user, result.data)
    } else {
      return updateProfileHandler(req, res, user, result.data)
    }
  }
  return getProfileHandler(req, res, user)
}
