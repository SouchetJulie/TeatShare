import { NextApiRequest } from "next";
import { createNewUser } from "@services/users.service";
import { ISanitizedResponse } from "@middlewares/sanitization/sanitized-response.interface";
import { runMiddleware } from "@common/run-middleware.helper";
import { body } from "express-validator";
import { validateMiddleware } from "@middlewares/sanitization/validate.middleware";
import { sendError } from "next/dist/server/api-utils";
import { IUserCreate } from "@typing/user.interface";

export const signupHandler = async (
  req: NextApiRequest,
  res: ISanitizedResponse<IUserCreate>
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
  const user = res.sanitized;

  const result = await createNewUser(user);
  if (!result["error"]) {
    return res.status(200).json({
      success: true,
      result,
    });
  } else {
    return res.status(400).json({
      success: false,
      error: JSON.stringify(result["error"]),
    });
  }
};
