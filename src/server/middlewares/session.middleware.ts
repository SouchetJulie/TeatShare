import nextSession from "next-session";
import { promisifyStore } from 'next-session/lib/compat';
import MongoStore from 'connect-mongo';

import { getClient } from '../services/database';

const mongoStore = promisifyStore(MongoStore.create({
  clientPromise: getClient()
}));

/**
 * Middleware that gets the current session?? TODO look into this
 *
 * /!\ When modifying the session, `req.session.commit()` must be called to save the changes.
 */
export const getSession = nextSession({
  autoCommit: false,
  cookie: {
    httpOnly: true,
    sameSite: "strict"
  },
  store: mongoStore
});