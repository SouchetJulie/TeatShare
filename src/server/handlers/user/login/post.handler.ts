import { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../../services/users.service';

export const loginPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.body;
  if (!user.password || !user.email) {
    res.status(400).json({error: 'Veuillez remplir le formulaire.'});
  }

  const result = await login(user);
  if (result) {
    res.status(200).json({
      success: true
    });
  }
  else {
    res.status(400).json({
      success: false,
      error: result['error'] || 'Login failed'
    });
  }
};