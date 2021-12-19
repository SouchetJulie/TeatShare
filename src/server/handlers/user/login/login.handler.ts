import { NextApiResponse } from 'next';

import { checkCredentials, getUserByEmail, isUser } from '@services/users.service';
import { ISessionApiRequest } from '@typing/session-api-request.interface';
import { withSession } from '@middlewares/session.middleware';
import { IUserPublic } from '@typing/user.interface';

const handler = async (req: ISessionApiRequest, res: NextApiResponse) => {
  const userCredentials = req.body;
  if (!userCredentials.password || !userCredentials.email) {
    res.status(400).json({error: 'Veuillez remplir le formulaire.'});
  }

  const result = await checkCredentials(userCredentials);
  if (result) {
    console.log(`[LOGIN] Credentials OK for ${userCredentials.email}.`);
    const user = await getUserByEmail(userCredentials.email);

    if (!isUser(user)) {
      return res.status(400).json({
        success: false,
        error: user['error'] || 'Login failed'
      });
    }

    req.session.set<IUserPublic>('user', user);
    await req.session.save();
    console.log(`[LOGIN] Started session for ${userCredentials.email}.`);

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

export const loginHandler = withSession(handler);
