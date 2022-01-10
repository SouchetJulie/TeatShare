import { NextApiHandler, NextApiResponse } from 'next';
import { withIronSession } from '@daiyam/next-iron-session';
import { ISessionApiRequest } from '@typing/session-api-request.interface';

/**
 * Adds a `IronSession` to the request before it is handled (under `req.session`).
 * @see withIronSession, Session
 * @param {NextApiHandler} apiHandler
 * @return {NextApiHandler}
 */
export const withSession = (apiHandler: (req: ISessionApiRequest, res: NextApiResponse) => Promise<unknown>): NextApiHandler => {
  return withIronSession(apiHandler, {
    cookieName: 'session_id',
    cookieOptions: {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    },
    password: process.env.SESSION_SECRET
  })
};