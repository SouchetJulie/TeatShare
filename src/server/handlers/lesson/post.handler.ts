import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Fields, File, Files, IncomingForm, Part } from "formidable";

import { withSession } from "@middlewares/session.middleware";
import { createNewLesson } from "@services/lessons.service";
import { IUserPublic } from "@typing/user.interface";
import { ILessonCreate } from "@typing/lesson-file.interface";

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
 * Parses the incoming request to record a new Lesson.
 * @param {NextApiRequest} req Incoming request.
 * @param {NextApiResponse} res Whether the recording succeeded, and the reasons why not otherwise.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Get author
    const currentUser: IUserPublic | undefined = req.session.user;

    if (!currentUser) {
      return res
        .status(401)
        .json({ error: "Il faut se connecter pour effectuer cette action." });
    }

    // Read form
    let formData: LessonFormData;
    try {
      formData = await parseForm(req);
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message });
    }

    if (!formData?.files) {
      return res.status(400).json({ error: "Fichier manquant." });
    }
    if (!formData?.fields?.isDraft) {
      return res
        .status(400)
        .json({ error: "Choix brouillon/publication manquant." });
    }
    if (!formData?.fields.title) {
      return res.status(400).json({ error: "Titre manquant." });
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

    const uploadedLesson: ILessonCreate = {
      ...formData.fields,
      isDraft: JSON.parse(isDraft), // conversion to boolean
    };

    const result = await createNewLesson(currentUser, file, uploadedLesson);
    if ("id" in result) {
      const id = result.id;

      currentUser.lessonIds.push(id);
      await req.session.save();

      return res.status(200).json({ success: true, id });
    } else {
      return res.status(400).json({ success: false, error: result["error"] });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, error: (e as Error).message });
  }
};

export const lessonPostHandler: NextApiHandler = withSession(handler);
