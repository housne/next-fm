import bcrypt from 'bcrypt'

export async function hash(text: string) {
  const saltRounds = 10
  return await bcrypt.hash(text, saltRounds)
}

export async function compare(text: string, hash: string) {
  return await bcrypt.compare(text, hash)
}