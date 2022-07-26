import { readUploadedLesson } from "@handlers/lesson/create.handler";
import { getOneLesson, updateLesson } from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const lessonUpdateHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ lesson: ILesson }>>
) => {
  try {
    // Get author
    const currentUser: IUserPublic | undefined = req.session.user;

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: "Il faut se connecter pour effectuer cette action.",
      });
    }

    // Read form
    const { file, lessonCreate } = await readUploadedLesson(req);

    // Update the lesson
    const { id } = await updateLesson(currentUser, file, lessonCreate);

    // Read the final uploaded lesson
    const uploadedLesson: ILesson | null = await getOneLesson(id);

    if (!uploadedLesson) {
      console.log("[LESSON] Edit of lesson failed: uploaded lesson not found");
      return res.status(500).json({
        success: false,
        error: "Modifier la leçon a échoué.",
      });
    }
    console.log(`[LESSON] Edit of lesson "${uploadedLesson.title}" succeeded`);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(`[LESSON] Edit of lesson failed:`, e);
    return res.status(500).json({
      success: false,
      error: "Modifier la leçon a échoué.",
    });
  }
};
