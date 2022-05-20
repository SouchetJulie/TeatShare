import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { checkCredentials, getUserByEmail } from "@services/users.service";
import { IUserAuth, IUserPublic } from "@typing/user.interface";
import { body, ValidationChain } from "express-validator";
import { validate } from "@middlewares/sanitization/validate.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { withSession } from "@middlewares/session.middleware";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ user: IUserPublic }>>
) => {
  const userCredentials = req.body.sanitized as IUserAuth;

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

const loginValidationChain: ValidationChain[] = [
  body("email").isEmail().withMessage("Ce doit être un email"),
  body("password")
    .exists()
    .withMessage("Le mot de passe ne doit pas être vide"),
];

export const loginHandler: NextApiHandler = withSession(
  validate(loginValidationChain, handler)
);
