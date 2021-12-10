import { NextApiRequest, NextApiResponse } from 'next';
import { getAllLessons } from '../../services/lessons.service';

export const lessonGetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lessons = await getAllLessons();
  res.status(200).json({users: lessons});
};