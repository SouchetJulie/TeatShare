import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { checkCredentials, getUserByEmail } from "@services/users.service";
import { withSession } from "@middlewares/session.middleware";
import { LoginRequest } from "@typing/login-request.interface";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ user: IUserPublic }>>
): Promise<void> => {
  const userCredentials = req.body as LoginRequest;
  if (!userCredentials.password || !userCredentials.email) {
    return res.status(400).json({
      success: false,
      error: "Identifiants manquants.",
    });
  }

  console.log(new Date().toLocaleTimeString());
  const result = await checkCredentials(userCredentials);
  console.log(new Date().toLocaleTimeString());
  if (result) {
    console.log(`[LOGIN] Credentials OK for ${userCredentials.email}.`);
    const user = await getUserByEmail(userCredentials.email);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Utilisateur inconnu",
      });
    }

    req.session.user = user;
    await req.session.save();
    console.log(`[LOGIN] Started session for ${userCredentials.email}.`);

    return res.status(200).json({
      success: true,
      data: { user },
    });
  } else {
    return res.status(400).json({
      success: false,
      error: "Connexion échouée",
    });
  }
};

export const loginHandler: NextApiHandler = withSession(handler);
