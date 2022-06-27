import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ user: IUserPublic }>>
): Promise<void> => {
  const user = req.session.user;

  if (!user) {
    return res.status(200).json({
      success: false,
      error: "La session a expiré",
    });
  }

  return res.status(200).json({
    success: true,
    data: { user },
  });
};

export const autoLoginHandler: NextApiHandler = handler;
