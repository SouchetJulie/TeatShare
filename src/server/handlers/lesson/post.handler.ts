import { NextApiRequest, NextApiResponse } from 'next';
import { ILessonFile } from '@typing/lesson-file.interface';
import { createNewLesson } from '@services/lessons.service';

export const lessonPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lesson: ILessonFile = req.body;
  if (!lesson.title) {
    res.status(400).json({error: 'Veuillez remplir le formulaire.'});
  }

  const result = await createNewLesson({}, lesson);
  if (result['id']) {
    res.status(200).json({
      success: true,
      id: result['id']
    });
  } else {
    res.status(400).json({
      success: false,
      error: result['error'] || 'Login failed'
    });
  }
}