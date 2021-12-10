import { NextApiRequest } from 'next';
import { Session } from 'next-session/lib/types';

/**
 * A NextApiRequest that includes a Session object.
 */
export type ISessionApiRequest = NextApiRequest & {
  session?: Session;
};