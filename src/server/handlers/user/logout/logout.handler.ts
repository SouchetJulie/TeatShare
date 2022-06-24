import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const logoutHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const user: IUserPublic | undefined = req.session.user;

  if (!user) {
    console.log("[LOGOUT] Logout failed: no user was logged in.");
    return res.status(404).json({
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
