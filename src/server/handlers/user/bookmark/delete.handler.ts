import { validate } from "@middlewares/sanitization/validate.middleware";
import { getOneByIdValidationChain } from "@middlewares/sanitization/validation-chains";
import { getOneLesson, updateBookmarkCounter } from "@services/lessons.service";
import { removeBookmarkFromUser } from "@services/users.service";
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
      const lesson: ILesson | null = await getOneLesson(new ObjectId(_id));

      if (!lesson) {
        return res.status(404).json({
          success: false,
          error: "Leçon non trouvée",
        });
      }

      if (!user!.bookmarkIds.includes(_id)) {
        return res.status(404).json({
          success: false,
          error: "Cette leçon est absente des marques-pages",
        });
      }

      // Remove the bookmark
      const lessonId = new ObjectId(_id);
      await removeBookmarkFromUser(user!, lessonId.toHexString());
      await updateBookmarkCounter(lessonId, -1);
      // Update session
      const bookmarkIndex: number | undefined =
        req.session.user?.bookmarkIds.findIndex((id: string) => _id === id);
      if (bookmarkIndex !== undefined && bookmarkIndex >= 0) {
        req.session.user?.bookmarkIds.splice(bookmarkIndex, 1);
        await req.session.save();
      }

      console.log(`[LESSON] Removed lesson ${_id} from user's bookmarks`);

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
