import { NextApiRequest } from 'next';
import { Session } from '@daiyam/next-iron-session';

/**
 * A NextApiRequest that includes a Session object.
 */
export type ISessionApiRequest = NextApiRequest & {
  session?: Session;
};