import { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers, getOneUser } from "@services/users.service";
import { ISanitizedResponse } from "@middlewares/sanitization/sanitized-response.interface";
import { runMiddleware } from "@common/run-middleware.helper";
import { query } from "express-validator";
import { validateMiddleware } from "@middlewares/sanitization/validate.middleware";
import { sendError } from "next/dist/server/api-utils";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";

export const userGetAllHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ users: IUserPublic[] }>>
) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: { users },
    });
  } catch (e) {
    console.warn(`[USER] Failed to get all users: ${e}`);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de tous les utilisateurs",
    });
  }
};

export const userGetOneHandler =
  (_id: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<{ user: IUserPublic }>> &
      ISanitizedResponse<{ _id: string }>
  ) => {
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

    try {
      const user = await getOneUser(id);

      if (!user) {
        console.warn(`[USER] Failed to get user ${id}: not found`);
        return res.status(404).json({
          success: false,
          error: `User ${id} not found`,
        });
      }

      return res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (e) {
      console.error(`[USER] Failed to get user ${id}: ${e}`);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération de l'utilisateur",
      });
    }
  };
