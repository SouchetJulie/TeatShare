import { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers, getOneUser } from "@services/users.service";
import { ApiResponse, UserApiResponse } from "@typing/api-response.interface";
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
  async (req: NextApiRequest, res: NextApiResponse<UserApiResponse>) => {
    try {
      const user = await getOneUser(_id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: `User ${_id} not found`,
        });
      }

      return res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (e) {
      console.warn(`[USER] Failed to get user ${_id}: ${e}`);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération de l'utilisateur",
      });
    }
  };
