import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withSession } from "@middlewares/session.middleware";
import { IUserPublic } from "@typing/user.interface";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user: IUserPublic | undefined = req.session.user;

  if (!user) {
    console.log("[LOGOUT] Logout failed: no user was logged in.");
    return res.status(400).json({
      success: false,
      error: "Logout failed.",
    });
  }

  req.session.destroy();
  console.log(`[LOGOUT] Removed session for ${user.email}.`);

  res.status(200).json({
    success: true,
  });
};

export const logoutHandler: NextApiHandler = withSession(handler);
