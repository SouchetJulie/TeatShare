import { NextApiRequest, NextApiResponse } from "next";
import {
  createNewUser,
  getAllUsers,
} from "../../../server/services/test-mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getRoute(req, res);
      break;
    case "POST":
      await postRoute(req, res);
      break;
    default:
      res.status(501).send("Not implemented");
  }
};

const getRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await getAllUsers();
  res.status(200).json({ users });
};

const postRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    res.status(400).json({ error: "Veuillez remplir le formulaire." });
  }

  const result = await createNewUser({ firstName, lastName });
  if (result) res.status(200).json({ result });
  else res.status(400).json({ result });
};
