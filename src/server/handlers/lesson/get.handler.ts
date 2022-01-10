import {NextApiRequest, NextApiResponse} from 'next';
import {getAllLessons, getOneLesson} from '../../services/lessons.service';

export const lessonGetAllHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const lessons = await getAllLessons();
    res.status(200).json({users: lessons});
};

export const lessonGetOneHandler = (_id: string) => async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await getOneLesson(_id);

    if ('error' in result) {
        return res.status(404).json({success: false, error: result.error});
    }

    return res.status(200).json({success: true, lesson: result});
};
