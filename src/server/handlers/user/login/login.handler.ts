import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { checkCredentials, getUserByEmail } from "@services/users.service";
import { withSession } from "@middlewares/session.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserAuth, IUserPublic } from "@typing/user.interface";
import { runMiddleware } from "@common/run-middleware.helper";
import { ISanitizedResponse } from "@middlewares/sanitization/sanitized-response.interface";
import { sendError } from "next/dist/server/api-utils";
import { body } from "express-validator";
import { validateMiddleware } from "@middlewares/sanitization/validate.middleware";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ user: IUserPublic }>> &
    ISanitizedResponse<IUserAuth>
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

  const result = await checkCredentials(userCredentials);
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

export const loginHandler: NextApiHandler = withSession(
  handler as NextApiHandler
);
