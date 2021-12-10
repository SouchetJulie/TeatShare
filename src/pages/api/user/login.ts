import { NextApiRequest, NextApiResponse } from 'next';

import { checkCredentials } from '../../../server/services/users/users.service';
import { ISessionApiRequest } from '../../../types/session-api-request.interface';
import { getSession } from '../../../server/middlewares/session.middleware';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await postRoute(req, res);
      break;
    default:
      res.status(501).send('Not implemented');
  }
};

const postRoute = async (req: ISessionApiRequest, res: NextApiResponse) => {
  const user = req.body;
  if (!user.password || !user.email) {
    res.status(400).json({error: 'Veuillez remplir le formulaire.'});
  }

  const result = await checkCredentials(user);
  if (result) {
    const session = await getSession(req, res);
    // Save user session
    session.user = user;
    await session.commit();

    res.status(200).json({
      success: true
    });
  }
  else {
    res.status(400).json({
      success: false,
      error: result['error'] || 'Login failed'
    });
  }
};
