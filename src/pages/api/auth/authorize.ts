// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getJWTFromHeader } from '../../../helpers/api'
import { authorize } from '../../../lib/api'

const authorizeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const jwt = getJWTFromHeader(req)
  if (!jwt || typeof jwt !== 'string') {
    return res.status(400).json({message: "bad request"})
  }
  const session = await authorize(jwt)
  res.status(200).json(session)
}

const authCallbackHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res
    .status(200)
    .setHeader('Content-Type', 'text/html')
    .write(setupCallbackHTML())
    res.end()
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return authCallbackHandler(req, res)
  } else if (req.method === 'POST') {
    return authorizeHandler(req, res)
  }
  return authCallbackHandler(req, res)
}

function setupCallbackHTML() {
  return `
    <!doctype html>
    <html>
      <head>
        <script>
          (function() {
            const { hash } = window.location
            if (!hash) {
              return
            }
            const hashQuery = new URLSearchParams(hash.replace(/#/g, ''))
            const jwt = hashQuery.get('access_token')
            if (!jwt) {
              return
            }
            console.log(jwt)
            window.opener && window.opener.postMessage({type: 'authorize', data: jwt})
            window.close()
          })()
        </script>
      </head>
    </html>
  
  `
}
