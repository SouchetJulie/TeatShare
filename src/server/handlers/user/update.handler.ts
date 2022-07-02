import { parseForm, RequestFormData } from "@common/parse-form.utils";
import { prepareUserUpdate, updateUser } from "@services/users.service";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserDB, IUserPublic } from "@typing/user.interface";
import { ObjectId } from "bson";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const userUpdateHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> => {
  const currentUser: IUserPublic = req.session.user!;

  try {
    const formData: RequestFormData = await parseForm(req, /^image\/.*/);
    const updateData: Partial<IUserDB> = await prepareUserUpdate(formData);

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
