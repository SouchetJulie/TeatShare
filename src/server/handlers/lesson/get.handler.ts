import {NextApiRequest, NextApiResponse} from 'next';
import {getAllLessons, getOneLesson} from '@services/lessons.service';
import {ApiResponse} from "@typing/api-response.interface";
import {ILesson} from "@typing/lesson-file.interface";

export const lessonGetAllHandler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<{ lessons: ILesson[] }>>) => {
  const lessons = await getAllLessons();
  console.log(`[LESSON] ${lessons.length} lessons found`);
  res.status(200).json({
    success: true,
    data: {lessons}
  });
};

export const lessonGetOneHandler = (_id: string) => async (req: NextApiRequest, res: NextApiResponse<ApiResponse<{ lesson: ILesson }>>) => {
  try {
    const lesson = await getOneLesson(_id);

    if (!lesson) {
      console.log(`[LESSON] Lesson ${_id} not found`);
      return res.status(404).json({
        success: false,
        error: "Leçon non trouvée"
      });
    }

    console.log(`[LESSON] Lesson ${_id} found`);
    return res.status(200).json({
      success: true,
      data: {lesson}
    });
  } catch (e) {
    console.log("[LESSON] Error while fetching lesson:", e);
    return res.status(200).json({
      success: false,
      error: "Erreur lors de la récupération de la leçon"
    });
  }
};
