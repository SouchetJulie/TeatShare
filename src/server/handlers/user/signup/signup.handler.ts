import { validate } from "@middlewares/sanitization/validate.middleware";
import { withSession } from "@middlewares/session.middleware";
import { createNewUser, getOneUser } from "@services/users.service";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserCreate, IUserPublic } from "@typing/user.interface";
import { body, ValidationChain } from "express-validator";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ user: IUserPublic }>>
) => {
  const userCreate = req.body.sanitized as IUserCreate;

  try {
    const result = await createNewUser(userCreate);
    const user: IUserPublic | null = await getOneUser(
      result.insertedId.toString()
    );
    if (!user) {
      console.log("[SIGNUP] Error while reading newly created user");

      return res.status(400).json({
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
      error:
        "Erreur lors de la création de l'utilisateur : " + (e as Error).message,
    });
  }
};

const signupValidationChain: ValidationChain[] = [
  body("firstName").optional({ checkFalsy: true }),
  body("lastName").optional({ checkFalsy: true }),
  body("email").isEmail().withMessage("Ce doit être un email"),
  body("password")
    .isStrongPassword()
    .withMessage("Le mot de passe n'est pas assez fort"),
];

export const signupHandler: NextApiHandler = withSession(
  validate(signupValidationChain, handler)
);
