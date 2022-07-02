import { parseForm, RequestFormData } from "@common/parse-form.utils";
import { createNewLesson, getOneLesson } from "@services/lessons.service";
import { ApiResponse } from "@typing/api-response.interface";
import { ILessonCreate, ILessonDB } from "@typing/lesson.interface";
import { IUserPublic } from "@typing/user.interface";
import { File } from "formidable";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * Parses the incoming request to record a new lesson.
 * @param {NextApiRequest} req Incoming request.
 * @param {NextApiResponse} res Whether the recording succeeded, and the reasons why not otherwise.
 */
export const lessonPostHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ lesson: ILessonDB }>>
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
    let formData: RequestFormData;
    try {
      formData = await parseForm(req, /^application\/pdf/);
    } catch (e) {
      console.log(`[LESSON] Parsing the lesson upload failed`, e);
      return res.status(400).json({
        success: false,
        error: (e as Error).message,
      });
    }

    if (!formData?.files) {
      return res.status(400).json({
        success: false,
        error: "Fichier manquant.",
      });
    }
    if (!formData?.fields?.isDraft) {
      return res.status(400).json({
        success: false,
        error: "Choix brouillon/publication manquant.",
      });
    }
    if (!formData?.fields.title) {
      return res.status(400).json({
        success: false,
        error: "Titre manquant.",
      });
    }

    // Get file
    let file: File;
    if (formData?.files?.file instanceof Array) {
      file = formData.files.file[0];
    } else {
      file = formData.files.file;
    }

    // Get isDraft
    let isDraft: string;
    if (formData?.fields.isDraft instanceof Array) {
      isDraft = formData?.fields.isDraft[0];
    } else {
      isDraft = formData?.fields.isDraft;
    }

    const lessonCreate: ILessonCreate = {
      ...formData.fields,
      isDraft: JSON.parse(isDraft), // conversion to boolean
    };

    const { id } = await createNewLesson(currentUser, file, lessonCreate);

    currentUser.lessonIds.push(id.toHexString());
    await req.session.save();

    console.log(`[LESSON] Upload of lesson ${id} successful`);

    // Read what was uploaded
    const uploadedLesson: ILessonDB | null = await getOneLesson(id.toString());

    if (!uploadedLesson) {
      console.log(
        "[LESSON] Upload of lesson failed: uploaded lesson not found"
      );
      return res.status(500).json({
        success: false,
        error: "Uploader la leçon a échoué.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        lesson: uploadedLesson,
      },
    });
  } catch (e) {
    console.log(`[LESSON] Upload of lesson failed:`, e);
    return res.status(500).json({
      success: false,
      error: "Uploader la leçon a échoué.",
    });
  }
};
