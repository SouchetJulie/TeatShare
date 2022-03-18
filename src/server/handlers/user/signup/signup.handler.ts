import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createNewUser, getOneUser } from "@services/users.service";
import { withSession } from "@middlewares/session.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserCreate, IUserPublic } from "@typing/user.interface";
import { runMiddleware } from "@common/run-middleware.helper";
import { ISanitizedResponse } from "@middlewares/sanitization/sanitized-response.interface";
import { sendError } from "next/dist/server/api-utils";
import { body } from "express-validator";
import { validateMiddleware } from "@middlewares/sanitization/validate.middleware";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ user: IUserPublic }>> &
    ISanitizedResponse<IUserCreate>
) => {
  try {
    await runMiddleware(
      req,
      res,
      body("firstName").optional({ checkFalsy: true })
    );
    await runMiddleware(
      req,
      res,
      body("lastName").optional({ checkFalsy: true })
    );
    await runMiddleware(
      req,
      res,
      body("email").isEmail().withMessage("Ce doit être un email")
    );
    await runMiddleware(
      req,
      res,
      body("password")
        .isStrongPassword()
        .withMessage("Le mot de passe n'est pas assez fort")
    );
    await runMiddleware(req, res, validateMiddleware);
  } catch (e) {
    // If the middlewares threw an error
    return sendError(res, 500, "Le traitement de la requête à échoué");
  }

  const userCreate = res.sanitized;

  const result = await createNewUser(userCreate);

  try {
    const user: IUserPublic | null = await getOneUser(
      result.insertedId.toString()
    );
    if (!user) {
      console.log("[SIGNUP] Error while reading newly created user");

      return res.status(500).json({
        success: false,
        error: "Erreur lors de l'enregistrement",
      });
    }

    req.session.user = user;
    await req.session.save();
    console.log(`[LOGIN] Started session for ${userCreate.email}.`);

    return res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (e) {
    console.log("[SIGNUP] Error while recording newly created user:");
    return res.status(400).json({
      success: false,
      error: "Erreur lors de la création de l'utilisateur",
    });
  }
};

export const signupHandler: NextApiHandler = withSession(
  handler as NextApiHandler
);
