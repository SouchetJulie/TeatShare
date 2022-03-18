import { query } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import { sendError } from "next/dist/server/api-utils";

import { runMiddleware } from "@common/run-middleware.helper";
import { validateMiddleware } from "@middlewares/sanitization/validate.middleware";
import { ISanitizedResponse } from "@middlewares/sanitization/sanitized-response.interface";
import { getAllLessons, getOneLesson } from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson-file.interface";

export const lessonGetAllHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ lessons: ILesson[] }>>
) => {
  const lessons = await getAllLessons();
  console.log(`[LESSON] ${lessons.length} lessons found`);
  res.status(200).json({
    success: true,
    data: { lessons },
  });
};

export const lessonGetOneHandler =
  (_id: string) =>
  async (
    req: NextApiRequest,
    res: ISanitizedResponse<{ _id: string }> &
      NextApiResponse<ApiResponse<{ lesson: ILesson }>>
  ) => {
    try {
      await runMiddleware(
        req,
        res,
        query("_id")
          .isHexadecimal()
          .withMessage("L'id doit être en hexadécimal")
          .isLength({ min: 24, max: 24 })
          .withMessage("L'id doit faire 24 caractères")
      );
      await runMiddleware(req, res, validateMiddleware);
    } catch (e) {
      // If the middlewares threw an error
      return sendError(res, 500, "Le traitement de la requête à échoué");
    }

    const { _id: id } = res.sanitized;

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
