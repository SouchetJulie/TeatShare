import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createNewUser, getOneUser } from "@services/users.service";
import { withSession } from "@middlewares/session.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserCreate, IUserPublic } from "@typing/user.interface";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ user: IUserPublic }>>
) => {
  const userCreate = req.body as IUserCreate;
  if (!userCreate.password || !userCreate.email) {
    return res.status(400).json({
      success: false,
      error: "Veuillez remplir le formulaire.",
    });
  }

  const result = await createNewUser(userCreate);

  try {
    const user: IUserPublic | null = await getOneUser(
      result.insertedId.toString()
    );
    if (!user) {
      console.log("[SIGNUP] Error while reading newly created user");

      return res.status(500).json({
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
      error: "Erreur lors de la création de l'utilisateur",
    });
  }
};

export const signupHandler: NextApiHandler = withSession(handler);
