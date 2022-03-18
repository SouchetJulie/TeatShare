import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "@middlewares/sanitization/validate.middleware";
import { getAllLessons, getOneLesson } from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson-file.interface";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";

const lessonGetAllHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ lessons: ILesson[] }>>
) => {
  try {
    const lessons = await getAllLessons();
    console.log(`[LESSON] ${lessons.length} lessons found`);
    res.status(200).json({
      success: true,
      data: { lessons },
    });
  } catch (e) {
    console.error(`[USER] Failed to get all lessons: ${e}`);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération de toutes les leçons",
    });
  }
};

const baseLessonGetOneHandler =
  (_id: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<{ lesson: ILesson }>>
  ) => {
    const { _id: id } = req.body.sanitized as { _id: string };

    try {
      const lesson = await getOneLesson(id);
      if (!lesson) {
        console.log(`[LESSON] Lesson ${id} not found`);
        return res.status(404).json({
          success: false,
          error: "Leçon non trouvée",
        });
      }

      console.log(`[LESSON] Lesson ${id} found`);
      return res.status(200).json({
        success: true,
        data: { lesson },
      });
    } catch (e) {
      console.log("[LESSON] Error while fetching lesson:", e);
      return res.status(200).json({
        success: false,
        error: "Erreur lors de la récupération de la leçon",
      });
    }
  };

const lessonGetOneHandler = (_id: string) =>
  validate(getOneByIdValidationChain, baseLessonGetOneHandler(_id));

export { lessonGetAllHandler, lessonGetOneHandler };
