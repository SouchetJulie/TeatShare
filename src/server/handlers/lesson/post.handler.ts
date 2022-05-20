import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Fields, File, Files, IncomingForm, Part } from "formidable";
import { createNewLesson, getOneLesson } from "@services/lessons.service";
import { IUserPublic } from "@typing/user.interface";
import { ILesson, ILessonCreate } from "@typing/lesson-file.interface";
import { ApiResponse } from "@typing/api-response.interface";

interface LessonFormData {
  fields?: Fields;
  files?: Files;
}

/**
 * Reads the form's value from the request and puts them into a Formidable object.
 * @param {NextApiRequest} req The incoming request.
 * @return {Promise<LessonFormData>} The form's values.
 * @throws {Error} If the parsing fails.
 */
const parseForm = (req: NextApiRequest): Promise<LessonFormData> =>
  new Promise(
    (
      resolve: (value: { fields: Fields; files: Files }) => void,
      reject: (reason: Error) => void
    ) => {
      const form = new IncomingForm({
        keepExtensions: false,
        hashAlgorithm: "sha256",
        multiples: false,
        filter: ({ mimetype }: Part): boolean =>
          !!mimetype && mimetype.includes("pdf"), // keep only pdf
      });

      form.parse(req, (err, fields: Fields, files: Files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    }
  );

/**
 * Parses the incoming request to record a new lessssssson.
 * @param {NextApiRequest} req Incoming request.
 * @param {NextApiResponse} res Whether the recording succeeded, and the reasons why not otherwise.
 */
export const lessonPostHandler: NextApiHandler = async (
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
    let formData: LessonFormData;
    try {
      formData = await parseForm(req);
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

    currentUser.lessonIds.push(id);
    await req.session.save();

    console.log(`[LESSON] Upload of lesson ${id} successful`);

    // Read what was uploaded
    const uploadedLesson: ILesson | null = await getOneLesson(id.toString());

    if (!uploadedLesson) {
      console.log(
        "[LESSON] Upload of lessssssson failed: uploaded lessssssson not found"
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
