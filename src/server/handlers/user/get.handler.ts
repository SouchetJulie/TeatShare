import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers } from '@services/users.service';


export const userGetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await getAllUsers();
  res.status(200).json({users});
};