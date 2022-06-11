import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import { withSession } from "@middlewares/authentication/session.middleware";

export default withSession(
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<{ user?: IUserPublic }>>
  ) => {
    const { user } = req.session;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Il faut être connecté.",
      });
    }

    return res.status(200).json({
      success: true,
      data: { user },
    });
  }
);
