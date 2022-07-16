import { validate } from "@middlewares/sanitization/validate.middleware";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";
import { deleteLesson } from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const baseLessonDeleteHandler =
  (_id: string) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<{ lesson: ILesson }>>
  ) => {
    const { _id: id } = req.body.sanitized as { _id: string };

    try {
      await deleteLesson(new ObjectId(id), req.session.user?._id);

      console.log(`[LESSON] Lesson ${id} found`);
      return res.status(200).json({
        success: true,
      });
    } catch (e) {
      console.log("[LESSON] Error while deleting lesson:", e);
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la suppression de la leçon",
      });
    }
  };

const lessonDeleteHandler = (_id: string) =>
  validate(getOneByIdValidationChain, baseLessonDeleteHandler(_id));

export { lessonDeleteHandler };
