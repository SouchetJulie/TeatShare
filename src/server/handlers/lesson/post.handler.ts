import { NextApiResponse } from 'next';

import { withSession } from '@middlewares/session.middleware';
import { createNewLesson } from '@services/lessons.service';
import { ISessionApiRequest } from '@typing/session-api-request.interface';
import { ILessonFile } from '@typing/lesson-file.interface';
import { IUserPublic } from '@typing/user.interface';

const handler = async (req: ISessionApiRequest, res: NextApiResponse) => {
  const lesson: ILessonFile = req.body;
  if (!lesson.title) {
    res.status(400).json({ error: 'Veuillez remplir le formulaire.' });
  }

  const currentUser = req.session.get<IUserPublic>('user');
  const result = await createNewLesson(currentUser, lesson);
  if (result['id']) {
    res.status(200).json({ success: true, id: result['id'] });
  } else {
    res.status(400).json({ success: false, error: result['error'] || 'Lesson upload failed' });
  }
};

export const lessonPostHandler = withSession(handler);
