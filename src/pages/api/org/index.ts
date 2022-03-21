// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createOrg, listAllOrg } from '../../../lib/api'

const createOrgHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name } = req.body
  if (!name || !name.toString().trim()) {
    return res.status(400).json({ error: 'error' })
  }
  const org = await createOrg(name)
  return res.status(200).json(org)
}

const listOrgHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const orgs = await listAllOrg()
  return res.status(200).json(orgs)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return createOrgHandler(req, res)
  } else if (req.method === 'GET') {
    return listOrgHandler(req, res)
  }
  return res.status(405).json({ error: 'error' })
}