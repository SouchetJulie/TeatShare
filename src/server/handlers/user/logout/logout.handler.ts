import { NextApiResponse } from 'next';

import { isUser } from '@services/users.service';
import { ISessionApiRequest } from '@typing/session-api-request.interface';
import { withSession } from '@middlewares/session.middleware';
import { IUserPublic } from '@typing/user.interface';

const handler = async (req: ISessionApiRequest, res: NextApiResponse) => {
  const user = req.session.get<IUserPublic>('user');

  if (!isUser(user)) {
    console.log(`[LOGOUT] Logout failed.`);
    return res.status(200).json({
      success: false,
      error: user['error'] || 'Logout failed.'
    });
  }

  req.session.destroy();
  console.log(`[LOGOUT] Removed session for ${user.email}.`);

  res.status(200).json({
    success: true
  });
};

export const logoutHandler = withSession(handler);
