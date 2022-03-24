import { Radio } from '../../types/radio'
import { prisma } from '../prisma'

export async function like(userId: string, radioId: number) {
  const record = await prisma.like.findFirst({where: {
    user_id: userId,
    radios: {
      some: {
        radio: {
          id: radioId
        }
      }
    }
  }})
  if (!record) {
    await prisma.like.create({
      data: {
        user_id: userId,
        radios: {
          create: {
            radio: {
              connect: {
                id: radioId
              }
            }
          }
        }
      }
    })
  } else {
    await prisma.like.delete({ where: { id: record.id }})
  }
}

export async function listUserLikes(userId: string) {
  const records = await prisma.like.findMany({ 
    where: { 
      user_id: userId
    }, 
    include: { 
      radios: { 
        include: { 
          radio: { 
            include: {
              genres: {
                include: {
                  genre: true
                }
              },
              org: true
            }
          }
        }
      }
    }
  })
  return records.reduce<Radio[]>((list, like) => {
    const radios = like.radios.map(r => r.radio)
    return list.concat(radios)
  }, [])
}

export async function isLiked(userId: string, radioId: number) {
  const record = await prisma.like.findFirst({where: {
    user_id: userId,
    radios: {
      some: {
        radio: {
          id: radioId
        }
      }
    }
  }})
  return !!record
}