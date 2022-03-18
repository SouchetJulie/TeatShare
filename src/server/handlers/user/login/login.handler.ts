import { NextApiHandler, NextApiRequest } from "next";
import {
  checkCredentials,
  getUserByEmail,
  isUser,
} from "@services/users.service";
import { withSession } from "@middlewares/session.middleware";
import { runMiddleware } from "@common/run-middleware.helper";
import { body } from "express-validator";
import { validateMiddleware } from "@middlewares/sanitization/validate.middleware";
import { sendError } from "next/dist/server/api-utils";
import { ISanitizedResponse } from "@middlewares/sanitization/sanitized-response.interface";
import { IUserAuth } from "@typing/user.interface";

const handler = async (
  req: NextApiRequest,
  res: ISanitizedResponse<IUserAuth>
) => {
  try {
    await runMiddleware(
      req,
      res,
      body("email").isEmail().withMessage("Ce doit être un email")
    );
    await runMiddleware(
      req,
      res,
      body("password")
        .exists()
        .withMessage("Le mot de passe ne doit pas être vide")
    );
    await runMiddleware(req, res, validateMiddleware);
  } catch (e) {
    // If the middlewares threw an error
    return sendError(res, 500, "Le traitement de la requête à échoué");
  }

  const userCredentials = res.sanitized;

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
