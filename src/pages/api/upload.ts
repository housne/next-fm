// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { upload } from '../../lib/upload'
import { ImageUploadScheme } from '../../scheme/upload'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'error' })
  }
  const result = ImageUploadScheme.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({message: 'bad request'})
  }
  const data = result.data
  const uploadResponse = await upload(data.file, {
    folder: data.dir
  })
  return res.status(200).json({url: uploadResponse.url})
}
