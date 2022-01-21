import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  checkCredentials,
  getUserByEmail,
  isUser,
} from "@services/users.service";
import { withSession } from "@middlewares/session.middleware";
import { LoginRequest } from "@typing/login-request.interface";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userCredentials = req.body as LoginRequest;
  if (!userCredentials.password || !userCredentials.email) {
    return res.status(400).json({ error: "Identifiants manquants." });
  }

  const result = await checkCredentials(userCredentials);
  if (result) {
    console.log(`[LOGIN] Credentials OK for ${userCredentials.email}.`);
    const user = await getUserByEmail(userCredentials.email);

    if (!isUser(user)) {
      return res.status(400).json({
        success: false,
        error: user["error"] || "Login failed",
      });
    }

    req.session.user = user;
    await req.session.save();
    console.log(`[LOGIN] Started session for ${userCredentials.email}.`);

    return res.status(200).json({
      success: true,
      user,
    });
  } else {
    return res.status(400).json({
      success: false,
      error: result["error"] || "Login failed",
    });
  }
};

export const loginHandler: NextApiHandler = withSession(handler);
