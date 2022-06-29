import { updateUser } from "@services/users.service";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserDB, IUserPublic } from "@typing/user.interface";
import { ObjectId } from "bson";
import { NextApiRequest, NextApiResponse } from "next";

const userUpdateHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const currentUser: IUserPublic | undefined = req.session.user;
  try {
    if (!currentUser?._id) {
      return res.status(401).json({
        success: false,
        error: "Il faut être connecté pour cette opération",
      });
    }

    const updateData: Partial<IUserDB> = req.body; // TODO sanitization (+formidable?)

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
      res.status(200).json({
        success: true,
      });
    } else {
      console.log(`[USER] ${currentUser.email} failed to update profile`);
      res.status(400).json({
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

export { userUpdateHandler };
