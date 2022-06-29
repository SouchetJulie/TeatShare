import { validate } from "@middlewares/sanitization/validate.middleware";
import { updateUser } from "@services/users.service";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserDB, IUserPublic } from "@typing/user.interface";
import { ObjectId } from "bson";
import { body, ValidationChain } from "express-validator";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const currentUser: IUserPublic = req.session.user!;

  try {
    const updateData: Partial<IUserDB> = req.body.sanitized; // TODO sanitization (+formidable for avatar?)

    console.log(updateData); // TODO debug

    const updateSuccess: boolean = await updateUser(
      new ObjectId(currentUser._id),
      updateData
    );

    if (updateSuccess) {
      console.log(`[USER] ${currentUser.email} successfully updated profile`);

      // Update session
      req.session.user = {
        ...currentUser,
        ...updateData,
      };
      await req.session.save();

      // Response
      return res.status(200).json({
        success: true,
      });
    } else {
      console.log(`[USER] ${currentUser.email} failed to update profile`);
      return res.status(400).json({
        success: false,
      });
    }
  } catch (e) {
    console.log(`[USER] ${currentUser?.email} failed to update: ${e}`);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la mise à jour du profil de l'utilisateur",
    });
  }
};

const updateValidationChain: ValidationChain[] = [
  body("firstName").optional({ checkFalsy: true }),
  body("lastName").optional({ checkFalsy: true }),
  body("email")
    .optional({ checkFalsy: true })
    .bail()
    .isEmail()
    .withMessage("Ce doit être un email"),
];

export const userUpdateHandler: NextApiHandler = validate(
  updateValidationChain,
  handler
);
