import { NextApiResponse } from 'next';

import { checkCredentials, getUserByEmail } from '@services/users.service';
import { ISessionApiRequest } from '@typing/session-api-request.interface';
import { withSession } from '@middlewares/session.middleware';

const handler = async (req: ISessionApiRequest, res: NextApiResponse) => {
  const user = req.body;
  if (!user.password || !user.email) {
    res.status(400).json({error: 'Veuillez remplir le formulaire.'});
  }

  const result = await checkCredentials(user);
  if (result) {
    console.log(`[LOGIN] Credentials OK for ${user.email}.`);
    const userDB = await getUserByEmail(user.email);
    req.session.set('user', userDB);
    await req.session.save();
    console.log(`[LOGIN] Started session for ${user.email} from DB.`);

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

export const loginPostHandler = withSession(handler);
