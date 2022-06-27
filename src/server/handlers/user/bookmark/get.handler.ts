import { getAllUserBookmark } from "@services/users.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILessonDB } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import { NextApiRequest, NextApiResponse } from "next";

const userGetAllBookmarksHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ lessons: ILessonDB[] }>>
) => {
  try {
    const user: IUserPublic | undefined = req.session.user;

    if (!user) {
      console.log("[USER] Bookmark fetch: no user was logged in.");
      return res.status(404).json({
        success: false,
        error: "Il faut être connecté.",
      });
    }

    const bookmarks: ILessonDB[] = await getAllUserBookmark(user);
    console.log(
      `[USER] ${bookmarks.length} bookmarks found for user ${user.email}`
    );
    res.status(200).json({
      success: true,
      data: { lessons: bookmarks },
    });
  } catch (e) {
    console.error(`[USER] Failed to get the user's bookmarks: ${e}`);
    return res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des signets",
    });
  }
};

export { userGetAllBookmarksHandler };
