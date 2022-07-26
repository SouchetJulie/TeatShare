import { validate } from "@middlewares/sanitization/validate.middleware";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";
import {
  getAllLessons,
  getFiltersFromQuery,
  getOneLesson,
} from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const lessonGetAllHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ lessons: ILesson[] }>>
) => {
  try {
    const user = req.session.user;
    const filters = getFiltersFromQuery(req.query, user);
    console.log("[LESSON] Filters for list GET:", filters);

    // Read lessons from database & send result
    const lessons: ILesson[] = await getAllLessons(filters);
    res.status(200).json({
      success: true,
      data: { lessons },
    });
  } catch (e) {
    const error = `Requête malformée : ${(e as Error).message}`;
    console.log(`[LESSON] Lesson fetch failed: ${error}`);
    res.status(400).json({
      success: false,
      error,
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
      const lesson = await getOneLesson(new ObjectId(id));
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
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la récupération de la leçon",
      });
    }
  };

const lessonGetOneHandler = (_id: string) =>
  validate(getOneByIdValidationChain, baseLessonGetOneHandler(_id));

export { lessonGetAllHandler, lessonGetOneHandler };
