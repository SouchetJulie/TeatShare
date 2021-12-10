import { NextApiResponse } from 'next';

import { checkCredentials } from '@services/users.service';
import { getSession } from '@middlewares/session.middleware';
import { ISessionApiRequest } from '@typing/session-api-request.interface';

export const loginPostHandler = async (req: ISessionApiRequest, res: NextApiResponse) => {
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
  } else {
    res.status(400).json({
      success: false,
      error: result['error'] || 'Login failed'
    });
  }
};