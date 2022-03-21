import { Prisma } from '@prisma/client'
import { RegisterData } from '../../scheme/user'
import { compare, hash } from '../crypto'
import { deta } from '../deta'
import { sendRegisterMail } from '../mail'
import { prisma } from '../prisma'

const userRegisterDeta = deta.Base(`${process.env.NODE_ENV}_fm_user_veri`)


export async function userRegister(data: RegisterData) {
  const hashStr = await hash(data.password)
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashStr
    }
  })
  const record = await userRegisterDeta.put({user_id: user.id})
  await sendRegisterMail(record?.key as string, user.email as string)
  return user
}

export async function userActivation(key: string) {
  const record = await userRegisterDeta.get(key)
  if (!record) {
    return false
  }
  const user_id = record.user_id as number
  await prisma.user.update({
    where: {id: user_id}, 
    data: {active: true}
  })
  await userRegisterDeta.delete(key)
  return true
}

export enum LOGIN_FAIL_REASON {
  NOT_ACTIVATED,
  WRONG_PASSWORD,
  USER_NOT_EXISTS
}

export async function userLogin(input: Prisma.UserWhereUniqueInput, pwd: string) {
  const user = await prisma.user.findUnique({where: input})
  if (!user) {
    return Promise.reject(LOGIN_FAIL_REASON.USER_NOT_EXISTS)
  }
  if (!user.active) {
    return Promise.reject(LOGIN_FAIL_REASON.NOT_ACTIVATED)
  }
  try {
    const result = await compare(pwd, user.password as string)
    if (!result) {
      return Promise.reject(LOGIN_FAIL_REASON.WRONG_PASSWORD)
    }
  } catch (e) {
    return Promise.reject(LOGIN_FAIL_REASON.WRONG_PASSWORD)
  }
  const {password, ...result} = user
  return result
}