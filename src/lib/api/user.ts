import { z } from 'zod'
import { Session } from '../../types/auth'
import { prisma } from '../prisma'
import { supabase } from '../supabase'

export async function userRegister(email: string, password: string) {
  const s = await supabase.auth.signUp({
    email,
    password
  })
  if (!s.user || s.error) {
    return {
      ...s
    }
  }
  const profile = await prisma.profile.create({data: {user_id: s.user.id}})
  return {
    ...s,
    profile
  }
}

export async function userLogin(email: string, password: string) {
  const s = await supabase.auth.signIn({
    email,
    password
  })
  if (!s.user || s.error) {
    return {
      ...s
    }
  }
  const profile = await prisma.profile.findUnique({where: { user_id: s.user.id }})
  return {
    ...s,
    profile
  }
}

export async function authorize(jwt: string): Promise<Session | null> {
  const { user, error } = await supabase.auth.api.getUser(jwt)
  if (!user || error) {
    return null
  }
  const profile = await prisma.profile.findUnique({where: { user_id: user.id }})
  return {
    user,
    profile,
    access_token: jwt,
    token_type: 'bearer'
  }
}

export async function rendResetPasswordEmail(email: string) {
  return await supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/recovery`
  })
}

export async function resetPassword(accessToken: string, password: string) {
  return await supabase.auth.api.updateUserById(accessToken, {
    password
  })
}