// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { File } from 'formidable'
import { promisify } from 'util'
import { supabase } from '../../lib/supabase';
import fs from 'fs/promises'

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'error' })
  }
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({"message": "error"})
    }
    const file = files.file as File
    const buffer = await fs.readFile(file.filepath)
    const extension = file.mimetype?.split('/')[1]
    const { data, error } = await supabase
      .storage
      .from('fm')
      .upload(`radio/thumbnail/${file.newFilename}.${extension}`, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.mimetype || 'image/jpg'
      })
    if (error) {
      console.log(error)
      res.status(500).json({error: 'error'})
      return
    }
    const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data?.Key}`
    res.status(200).json({url})
  })
}
