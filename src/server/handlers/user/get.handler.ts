import { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers, getOneUser } from "@services/users.service";
import { ISanitizedResponse } from "@middlewares/sanitization/sanitized-response.interface";
import { runMiddleware } from "@common/run-middleware.helper";
import { query } from "express-validator";
import { validateMiddleware } from "@middlewares/sanitization/validate.middleware";
import { sendError } from "next/dist/server/api-utils";

export const userGetAllHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const users = await getAllUsers();
  res.status(200).json({ users });
};

export const userGetOneHandler =
  (_id: string) =>
  async (req: NextApiRequest, res: ISanitizedResponse<{ _id: string }>) => {
    try {
      await runMiddleware(
        req,
        res,
        query("_id")
          .isHexadecimal()
          .withMessage("L'id doit être en hexadécimal")
          .isLength({ min: 24, max: 24 })
          .withMessage("L'id doit faire 24 caractères")
      );
      await runMiddleware(req, res, validateMiddleware);
    } catch (e) {
      // If the middlewares threw an error
      return sendError(res, 500, "Le traitement de la requête à échoué");
    }

    const { _id: id } = res.sanitized;
    const result = await getOneUser(id);

    if ("error" in result) {
      return res.status(404).json({ success: false, error: result.error });
    }

    return res.status(200).json({ success: true, user: result });
  };
