import { NextApiHandler } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { IUserPublic } from "@typing/user.interface";
import { ApiResponse } from "@typing/api-response.interface";

/**
 * Adds a `IronSession` to the request before it is handled (under `req.session`).
 * @param {NextApiHandler} apiHandler
 * @return {NextApiHandler}
 */
export const withSession = <T = ApiResponse>(
  apiHandler: NextApiHandler<T>
): NextApiHandler<T> => {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be defined in environment");
  }

  return withIronSessionApiRoute(apiHandler, {
    cookieName: "session_id",
    cookieOptions: {
      httpOnly: true,
      sameSite: "strict",
    },
    password: process.env.SESSION_SECRET,
  });
};

declare module "iron-session" {
  // Do not delete: this is used indirectly to type req.session /!\
  // eslint-disable-next-line no-unused-vars
  interface IronSessionData {
    user?: IUserPublic;
  }
}
