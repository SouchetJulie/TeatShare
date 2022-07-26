import { validate } from "@middlewares/sanitization/validate.middleware";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";
import { getOneLesson, updateBookmarkCounter } from "@services/lessons.service";
import { addBookmarkToUser } from "@services/users.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILesson } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import { ObjectId } from "bson";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler =
  (_id: string) =>
  async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    // If we get here, then the request is authenticated, and the given lesson id is in the valid format
    const user: IUserPublic | undefined = req.session.user;

    try {
      const lessonId = new ObjectId(_id);
      const lesson: ILesson | null = await getOneLesson(lessonId);

      if (!lesson) {
        return res.status(404).json({
          success: false,
          error: "Leçon non trouvée",
        });
      }

      if (user!.bookmarkIds.includes(_id)) {
        console.log(`[LESSON] Lesson ${_id} was already in user's bookmarks`);
        return res.status(400).json({
          success: false,
          error: "Cette leçon est déjà dans les marques-pages",
        });
      }

      // Add the bookmark
      await addBookmarkToUser(user!, lessonId);
      await updateBookmarkCounter(lessonId, 1);
      // Update session
      req.session.user?.bookmarkIds.push(_id);
      await req.session.save();

      console.log(`[LESSON] Added lesson ${_id} to user's bookmarks`);

      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(
        `[LESSON] Failed to add lesson ${_id} to user's bookmarks:`,
        e
      );
      return res.status(500).json({
        success: false,
        error: `Erreur lors de l'ajout du marque-page : ${
          (e as Error).message
        }`,
      });
    }
  };

export const bookmarkAddHandler = (_id: string): NextApiHandler =>
  validate(getOneByIdValidationChain, handler(_id));
