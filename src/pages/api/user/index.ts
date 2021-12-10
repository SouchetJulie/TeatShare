import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers } from '../../../server/services/users/users.service';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getRoute(req, res);
      break;
    default:
      res.status(501).send('Not implemented');
  }
};

const getRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await getAllUsers();
  res.status(200).json({users});
};
