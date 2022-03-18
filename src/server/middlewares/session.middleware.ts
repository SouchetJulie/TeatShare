import { NextApiHandler } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { IUserPublic } from "@typing/user.interface";

/**
 * Adds a `IronSession` to the request before it is handled (under `req.session`).
 * @see withIronSession, Session
 * @param {NextApiHandler} apiHandler
 * @return {NextApiHandler}
 */
export const withSession = (apiHandler: NextApiHandler): NextApiHandler => {
  return withIronSessionApiRoute(apiHandler, {
    cookieName: "session_id",
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
    },
    password: process.env.SESSION_SECRET || "",
  });
};

declare module "iron-session" {
  // Do not delete: this is used indirectly to type req.session /!\
  // eslint-disable-next-line no-unused-vars
  interface IronSessionData {
    user?: IUserPublic;
  }
}
