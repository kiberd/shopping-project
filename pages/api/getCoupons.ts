// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { coupons } from '../../data';
// import { coupons } from '../../data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 res.status(200).send(JSON.stringify(coupons));
}
