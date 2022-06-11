import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { validate } from "@middlewares/sanitization/validate.middleware";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";
import { getOneLesson, updateBookmarkCounter } from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { IUserPublic } from "@typing/user.interface";
import { ILesson } from "@typing/lesson-file.interface";
import { ObjectId } from "bson";
import { removeBookmarkFromUser } from "@services/users.service";

const handler =
  (_id: string) =>
  async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
    // If we get here, then the request is authenticated, and the given lesson id is in the valid format
    const user: IUserPublic | undefined = req.session.user;

    try {
      const lesson: ILesson | null = await getOneLesson(_id);

      if (!lesson) {
        return res.status(404).json({
          success: false,
          error: "Leçon non trouvée",
        });
      }

      const lessonId = new ObjectId(_id);

      if (user!.bookmarkIds.includes(lessonId)) {
        return res.status(400).json({
          success: false,
          error: "Cette leçon est absente des marques-pages",
        });
      }

      // Add the bookmark
      await removeBookmarkFromUser(user!, lessonId);
      await updateBookmarkCounter(lessonId, -1);

      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: `Erreur lors de la suppression du marque-page : ${
          (e as Error).message
        }`,
      });
    }
  };

export const bookmarkDeleteHandler = (_id: string): NextApiHandler =>
  validate(getOneByIdValidationChain, handler(_id));
