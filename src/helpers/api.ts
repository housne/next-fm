import { User } from "@supabase/supabase-js";
import { NextApiRequest } from "next";
import { supabase } from "../lib/supabase";

export function getJWTFromHeader(req: NextApiRequest): string | null {
  const auth = req.headers.authorization
  if (!auth) {
    return null
  }
  return auth.replace(/bearer\s/i, '')
}

export async function getUserFromRequest(req: NextApiRequest): Promise<User | null> {
  const jwt = getJWTFromHeader(req)
  if (!jwt) {
    return Promise.resolve(null)
  }
  const { user } = await supabase.auth.api.getUser(jwt)
  return user
}

export async function isAdminUser(req: NextApiRequest): Promise<boolean> {
  const adminUserEmail = process.env.ADMIN_USER_EMAIL
  if (!adminUserEmail) {
    return false
  }
  const user = await getUserFromRequest(req)
  if (!user) {
    return false
  }
  return user.email === adminUserEmail
}