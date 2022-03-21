import {  Prisma } from '@prisma/client'
import { prisma } from '../prisma'

export async function createOrg(name: string) {
  return prisma.organization.create({
    data: {
      name
    }
  })
}

export async function listAllOrg(where?: Prisma.OrganizationWhereInput) {
  return prisma.organization.findMany({ where })
}

export async function getOrgById(id: number) {
  return prisma.organization.findUnique({where: {id}})
}