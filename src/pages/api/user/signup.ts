import { NextApiRequest, NextApiResponse } from 'next';
import { createNewUser } from '../../../server/services/users/users.service';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await postRoute(req, res);
      break;
    default:
      res.status(501).send('Not implemented');
  }
};

const postRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.body;
  if (!user.firstName ||
    !user.lastName ||
    !user.password ||
    !user.email) {
    res.status(400).json({error: 'Veuillez remplir le formulaire.'});
  }

  const result = await createNewUser(user);
  if (!result['error'] && result['acknowledged']) {
    res.status(200).json({
      success: true,
      result
    });
  }
  else {
    res.status(400).json({
      success: false,
      error: result['error']
    });
  }
};
