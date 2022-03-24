import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export async function getProfile(userId: string) {
  return await prisma.profile.findUnique({ where: {user_id: userId }})
}

export async function updateProfile(userId: string, data: Prisma.ProfileUpdateInput) {
  return await prisma.profile.update({where: {user_id: userId}, data })
}

export async function createProfile(data: Prisma.ProfileCreateInput) {
  return await prisma.profile.create({ data })
}