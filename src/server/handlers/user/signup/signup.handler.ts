import {NextApiRequest, NextApiResponse} from "next";
import {createNewUser} from "@services/users.service";

export const signupHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const user = req.body;
  if (!user.password || !user.email) {
    return res.status(400).json({error: "Veuillez remplir le formulaire."});
  }

  // Remove unnecessary and sensitive information
  if (user.passwordConfirm) {
    delete user.passwordConfirm;
  }

  const result = await createNewUser(user);
  if (!("error" in result)) {
    return res.status(200).json({
      success: true,
      result,
    });
  } else {
    return res.status(400).json({
      success: false,
      error: JSON.stringify(result["error"]),
    });
  }
};
