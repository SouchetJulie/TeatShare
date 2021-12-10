import { NextApiRequest, NextApiResponse } from 'next';

export const defaultHandler = (req: NextApiRequest, res: NextApiResponse) => res.status(501).send('Not implemented');