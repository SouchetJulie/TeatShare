import { validate } from "@middlewares/sanitization/validate.middleware";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";
import { getAllUsers, getOneUser } from "@services/users.service";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import { NextApiRequest, NextApiResponse } from "next";

const userGetAllHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ users: IUserPublic[] }>>
) => {
  try {
    const users = await getAllUsers();
    console.log(`[USER] ${users.length} users found`);
    res.status(200).json({
      success: true,
      data: { users },
    });
  } catch (e) {
    console.error(`[USER] Failed to get all users: ${e}`);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de tous les utilisateurs",
    });
  }
};

const baseUserGetOneHandler =
  (_id: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<{ user: IUserPublic }>>
  ) => {
    const { _id: id } = req.body.sanitized as { _id: string };

    try {
      const user = await getOneUser(id);

      if (!user) {
        console.warn(`[USER] Failed to get user ${id}: not found`);
        return res.status(404).json({
          success: false,
          error: `Utilisateur ${id} non trouvé`,
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

const userGetOneHandler = (_id: string) =>
  validate(getOneByIdValidationChain, baseUserGetOneHandler(_id));

export { userGetAllHandler, userGetOneHandler };
