import { NextApiRequest, NextApiResponse } from 'next';
import { createNewUser } from '../../../server/services/users/users.service';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await postRoute(req, res);
  } else {
    res.status(501).send('Not implemented');
  }
};

const postRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.body;
  if (!user.firstName ||
    !user.lastName ||
    !user.password ||
    !user.email) {
    res.status(400).json({error: 'Veuillez remplir le formulaire.'});
  }

  // Remove unnecessary and sensitive information
  if (user.passwordConfirm) {
    delete user.passwordConfirm;
  }

  const result = await createNewUser(user);
  if (!result['error']) {
    res.status(200).json({
      success: true,
      result
    });
  } else {
    res.status(400).json({
      success: false,
      error: JSON.stringify(result['error'])
    });
  }
};
