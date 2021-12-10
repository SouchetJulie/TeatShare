import { NextApiResponse } from 'next';
import { ILessonFile } from '@typing/lesson-file.interface';
import { createNewLesson } from '@services/lessons.service';
import { getSession } from '@middlewares/session.middleware';
import { ISessionApiRequest } from '@typing/session-api-request.interface';

export const lessonPostHandler = async (req: ISessionApiRequest, res: NextApiResponse) => {
  // middlewares
  await getSession(req, res);

  // handler
  const lesson: ILessonFile = req.body;
  if (!lesson.title) {
    res.status(400).json({error: 'Veuillez remplir le formulaire.'});
  }

  const result = await createNewLesson(req.session.user, lesson);
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