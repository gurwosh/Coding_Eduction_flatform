// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
var fs = require('fs');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

    res.json({'hello':'hi'});

}
